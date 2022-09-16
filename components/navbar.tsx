import {
  createStyles,
  Menu,
  Text,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import styled from "@emotion/styled";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import useFetch from "../util/useFetch";
import Link from "next/link";
import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
import { ThemeContext } from "styled-components";

const header_height: number = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: header_height,
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: `none`,
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: `none`,
    },
  },

  link: {
    display: `block`,
    lineHeight: 1,
    padding: `8px 12px`,
    borderRadius: theme.radius.sm,
    textDecoration: `none`,
    color:
      theme.colorScheme === `dark`
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === `dark`
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
    color: theme.colors.dark[2],
    fontWeight: 400,
    fontSize: theme.fontSizes.md,

    "&:hover": {
      color: theme.colors.dark[6],
    },
  },
}));

interface Category {
  id: number;
  attributes: {
    Name: string;
    primary: boolean;
    slug: string;
  };
}

function Navbar() {
  const { classes } = useStyles();
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/categories"
  );

  if (loading) return <p>Loadig...</p>;
  if (error) return <p>Error!</p>;

  const categories = data.data;
  return (
    <Menu>
      <ol>
        {categories.map((category: any) => {
          if (category.attributes.primary) {
            return (
              <li key={category.id}>
                <Link href={`/product-list/${category.attributes.slug}`}>
                  <a className={classes.linkLabel}>
                    {category.attributes.Name}
                  </a>
                </Link>
              </li>
            );
          }
        })}
      </ol>
    </Menu>
  );
}

function checkPrimary(category: Category) {
  if (category.attributes.primary)
    return (
      <li key={category.id}>
        <Link href={`/product-list/${category.attributes.slug}`}>
          {category.attributes.Name}
        </Link>
      </li>
    );
}

export default Navbar;
