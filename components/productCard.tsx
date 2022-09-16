import RenderImage from "./render_img";
import { formatNum, calculateDiscount } from "../util/util";
import PropTypes from "prop-types";
import {
  createStyles,
  Card,
  Text,
  Badge,
  Button,
  Group,
  Image as imgContainer,
  SimpleGrid,
} from "@mantine/core";
import { IconShoppingCartPlus } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  ProductCard: {
    width: 240,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {},
    "&:hover": {
      borderColor: theme.colors.red,
    },
  },
}));

export function ProductCard(props: any) {
  const { classes } = useStyles();

  return (
    <li>
      <Card className={classes.ProductCard} p="lg" radius="sm" withBorder>
        <Card.Section>
          <RenderImage src={props.thumbnail} alt={props.name + " thumbnail"} />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500} size="md">
            {props.name}
          </Text>
        </Group>

        {props.discount && props.discount > 0 ? ( //Checks ford discount
          <Group position="apart" mt="sm" mb="xs">
            <Badge color="red" variant="filled" mt="sm" size="md">
              {props.discount + "%"}
            </Badge>
            <SimpleGrid cols={1} spacing="xs" mt="sm">
              <Text weight={500} size="md">
                {calculateDiscount(props.price, props.discount)}
              </Text>
              <Text weight={500} size="xs" color="grey">
                <s>{formatNum(props.price)}</s>
              </Text>
            </SimpleGrid>
          </Group>
        ) : (
          <Group position="right" mt="md" mb="xs">
            <SimpleGrid cols={1} spacing="xs" mt="sm">
              <Text weight={500} size="md" mt="sm">
                {formatNum(props.price)}
              </Text>
              <Text weight={500} size="xs" color="grey"></Text>
            </SimpleGrid>
          </Group>
        )}
      </Card>
    </li>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
};
