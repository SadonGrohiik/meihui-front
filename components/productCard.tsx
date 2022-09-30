import RenderImage from "./render_img";
import { formatNum, calculateDiscount } from "../util/util";
import { api_url } from "../util/environment";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  createStyles,
  Card,
  Text,
  Badge,
  UnstyledButton,
  Group,
  Image as imgContainer,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  ProductCard: {
    width: 240,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: 205,
    },
    "&:hover": {
      boxShadow: "0px 2px 20px -4px #dbd5cb",
    },
  },
}));

export function ProductCard(props: any) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  return (
    <li>
      <Link href={props.link}>
        <Card
          className={classes.ProductCard}
          p="md"
          pb="sm"
          m="md"
          radius="sm"
          withBorder
        >
          <Card.Section>
            <Image
              src={api_url + props.thumbnail}
              alt={props.alt}
              height={250}
              width={250}
              objectFit="cover"
              quality={30}
            />
          </Card.Section>

          <Group position="apart" mt="xs" mb="xs">
            <Text weight={500} size={mobile ? "sm" : "md"}>
              {props.name}
            </Text>
          </Group>

          {props.discount && props.discount > 0 && props.stock > 0 ? ( //Checks ford discount
            <Group position="apart" mt="lg">
              <Badge
                color="pastelBlue.2"
                variant="filled"
                size={mobile ? "sm" : "md"}
              >
                {props.discount + "%"}
              </Badge>
              <Text weight={500} size="xs" color="grey">
                <s>{formatNum(props.price)}</s>
              </Text>
              <Text weight={500} size={mobile ? "sm" : "md"}>
                {calculateDiscount(props.price, props.discount)}
              </Text>
            </Group>
          ) : (
            <Group position="right" mt="lg">
              <Text
                weight={500}
                size={mobile ? "sm" : "md"}
                color={props.stock > 0 ? "dark" : "dark.2"}
              >
                {props.stock > 0 ? formatNum(props.price) : "ناموجود"}
              </Text>
            </Group>
          )}
        </Card>
      </Link>
    </li>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  stock: PropTypes.number,
};
