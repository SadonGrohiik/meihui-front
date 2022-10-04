import type { NextPage } from "next";
import { ProductCard } from "../../components/productCard";
import { Context, gql } from "@apollo/client";
import client from "../../apollo-client";
import { Q_getProduct } from "../../util/queries";
import { sortNumbers, uniq } from "../../util/util";
import { useRouter } from "next/router";
import {
  Group,
  Badge,
  createStyles,
  UnstyledButton,
  Button,
  Title,
  Grid,
  Container,
  useMantineTheme,
  Card,
  Text,
} from "@mantine/core";
import { useMediaQuery, useElementSize } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { IconShoppingCartPlus } from "@tabler/icons";
import Image from "next/image";
import { getImageSize } from "next/dist/server/image-optimizer";
import ProductList from "../product-list/[slug]";
import { HoverCardDropdown } from "@mantine/core/lib/HoverCard/HoverCardDropdown/HoverCardDropdown";

const useStyles = createStyles((theme) => ({
  carousel: {
    direction: "ltr",
    borderRadius: "12px",
    maxWidth: 620,
    minWidth: 300,
  },
  carouselImg: {
    borderRadius: "12px",
  },
  container: {
    maxWidth: 1920,
  },
  detailName: {
    lineHeight: 2.5,
    fontFamily: "Yekan",
    fontSize: 14,
  },
  detail: {
    fontFamily: "Yekan",
    fontSize: 14,
  },
  title: {
    fontFamily: "Yekan",
    fontWeight: 500,
    marginBottom: 10,
  },
  midSection: {
    borderTop: `1px solid ${theme.colors.dark[0]}`,
    borderRadius: 0,
  },
  detailsSection: {
    marginTop: 25,
    borderBottom: `1px solid ${theme.colors.dark[0]}`,
    paddingBottom: 20,
  },
  addToCartCard: {
    width: 300,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
    backgroundColor: `${theme.colors.gray[1]}`,
  },
  cartBtn: {
    fontWeight: 500,
    fontSize: 13,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: 45,
    },
    "&:hover": {
      backgroundColor: theme.colors.red[6],
    },
  },
}));

const ProductPage: NextPage = ({ product }: any) => {
  console.log(process.env.NODE_ENV);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { ref, width, height } = useElementSize();
  let response = " ";
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const carousel = (
    <Carousel
      ref={ref}
      className={classes.carousel}
      mx="auto"
      withControls={false}
      withIndicators
      height={mobile ? window.outerWidth - 70 : width + 20}
      loop
    >
      {product &&
        product.Images.data.map((image: any) => (
          <Carousel.Slide key={image.id}>
            <Image
              alt="Hello"
              layout="fill"
              objectFit="cover"
              quality={100}
              src={"http://localhost:1337" + image.attributes.small}
            />
          </Carousel.Slide>
        ))}
    </Carousel>
  );

  const details = (
    <Card radius="sm" mt="xl" className={classes.midSection}>
      <Card.Section>
        <div className={classes.detailsSection}>
          <Title className={classes.title} order={4}>
            ویژگی‌ها
          </Title>
          {product.Details.map((detail: any) => (
            <div key={detail.id} className={classes.detail}>
              <Text
                span
                color="dark.2"
                className={classes.detailName}
                weight={400}
              >
                {detail.Name} :{" "}
              </Text>
              <Text span inherit weight={600}>
                {detail.Value}
              </Text>
            </div>
          ))}
        </div>
      </Card.Section>
    </Card>
  );
  return (
    <Container className={classes.container}>
      <Grid grow gutter="xl">
        <Grid.Col xs={4}>{carousel}</Grid.Col>
        <Grid.Col xs={7} mr={theme.breakpoints.sm ? 0 : 20}>
          <Title className={classes.title} order={3}>
            {product.Name}
          </Title>
          <Grid grow>
            <Grid.Col xs={4}>{details}</Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.addToCartCard}
                withBorder
                mt="xl"
                radius="md"
              >
                <Card.Section
                  p="md"
                  pr="lg"
                  className={classes.cartCardSection}
                >
                  <Title className={classes.title} order={4}>
                    خرید
                  </Title>
                </Card.Section>
                <Card.Section
                  p="md"
                  pr="lg"
                  className={classes.cartCardSection}
                >
                  <Button
                    fullWidth
                    color="red"
                    className={classes.cartBtn}
                    radius="md"
                    loading={response == "loading"}
                  >
                    {response == "loading" ? " " : " افزودن به سبد"}
                  </Button>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context: Context) {
  const query = await context.query;
  const slug = query.slug;

  const res = await getProductBySlug(slug);
  const data = res.data;
  return {
    props: {
      product: data.products.data[0].attributes,
    },
  };
}

async function getProductBySlug(slug: string) {
  const res: any = await client.query({
    query: gql`
      {${Q_getProduct(slug)}}
    `,
  });

  return res;
}

export default ProductPage;
