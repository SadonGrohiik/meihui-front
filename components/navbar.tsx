import {
  createStyles,
  Menu,
  TextInput,
  Header,
  Container,
  Anchor,
  Group,
  Burger,
  Button,
  Grid,
  MantineProvider,
  useMantineTheme,
  Divider,
  UnstyledButton,
} from "@mantine/core";
import styled from "@emotion/styled";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconUser,
  IconBasket,
  IconSearch,
  IconDoorEnter,
  IconDoorExit,
} from "@tabler/icons";
import useFetch from "../util/useFetch";
import Link from "next/link";
import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
import { ThemeContext } from "styled-components";
import logoImg from "../assets/images/2x/logo.png";
import { c_main } from "../util/styleParams";
import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import { logout } from "./lib/auth";
import axios from "axios";
import Cookies from "js-cookie";

const header_height: number = 80;

const useStyles = createStyles((theme) => ({
  inner: {
    height: header_height,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1920px",
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: `none`,
    },
  },
  links: {
    marginLeft: -theme.spacing.sm,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  mainLink: {
    textTransform: "uppercase",
    fontSize: 15,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    padding: `7px ${theme.spacing.sm}px`,
    fontWeight: 400,
    borderBottom: "2px solid transparent",
    transition: "border-color 100ms ease, color 100ms ease",
    fontFamily: "Yekan",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
      textDecoration: "none",
      borderBottom: `2px solid ${c_main[3]}`,
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
  iconBtn: {
    padding: 6,
    fontFamily: "Yekan",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  searchBar: {
    textAlign: "right",
    flexGrow: 1,
    maxWidth: 520,
    "&:focus": {
      borderColor: theme.colors.pastelColor,
    },
  },
  rightHeader: {},
  leftHeader: {
    flexGrow: 1,
    marginRight: 50,
  },
  logo: {
    marginBottom: 4,
  },
  header: { paddingLeft: 0 },
}));

interface Category {
  id: number;
  attributes: {
    Name: string;
    primary: boolean;
    slug: string;
  };
}

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const theme = useMantineTheme();
  const button_color = theme.colors.pastelBlue;
  const { classes } = useStyles();
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/categories"
  );
  const jwt = Cookies.get("token");
  let user_name = "";
  if (user) {
    axios
      .get("http://localhost:1337/api/users/me", {
        headers: { Authorization: "Bearer " + jwt },
      })
      .then((res) => {
        console.log(res.data.full_name);
      });
  }
  if (loading) return <p>Loadig...</p>;
  if (error) return <p>Error!</p>;
  const categories = data.data;
  const mainLinks = categories.map((category: any) => {
    if (category.attributes.primary) {
      return (
        <li key={category.id}>
          <Link href={`/product-list/${category.attributes.slug}/`}>
            <a className={classes.mainLink}>{category.attributes.Name}</a>
          </Link>
        </li>
      );
    }
  });

  const searchBar = (
    <TextInput
      className={classes.searchBar}
      placeholder="جستجو"
      variant="filled"
      rightSection={<IconSearch color="grey" size="20px" />}
      radius="md"
    />
  );
  const logo = (
    <Link href="/">
      <Image
        className={classes.logo}
        src={logoImg}
        alt={"meihui logo"}
        width={65}
        height={55}
        objectFit="contain"
        quality={30}
      />
    </Link>
  );
  const accountMenu = (
    <Menu width={200}>
      <Menu.Target>
        <Button className={classes.iconBtn} variant="subtle" color="dark">
          <IconUser size="28px" strokeWidth="1.7" />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>حساب</Menu.Label>
        <Menu.Item icon={<IconDoorExit size={14} />}>
          <UnstyledButton
            className={classes.navLink}
            onClick={() => {
              console.log("click");
              logout();
              setUser(null);
            }}
          >
            <Link href="/">خروج</Link>
          </UnstyledButton>
        </Menu.Item>
        <Menu.Item icon={<IconUser size={14} />}>پروفایل</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  const icons = (
    <Group position="right" spacing="xs" p={"xs"}>
      {user ? (
        <>{accountMenu}</>
      ) : (
        <Link href="/login">
          <Button
            className={classes.iconBtn}
            variant="outline"
            color="dark"
            p={6}
            px={10}
            ml="sm"
            radius="md"
          >
            <IconDoorEnter size="28px" strokeWidth="1.7" /> &nbsp;&nbsp;ورود |
            ثبت نام &nbsp;
          </Button>
        </Link>
      )}{" "}
      <Divider size="sm" orientation="vertical" />
      <Button className={classes.iconBtn} variant="subtle" color="dark">
        &nbsp;&nbsp;
        <IconBasket size="28px" strokeWidth="1.6" />
      </Button>
    </Group>
  );
  return (
    <MantineProvider
      theme={{
        colors: {
          pastelBlue: [
            "#d2f7ef",
            "#c1ece4",
            "#a3dbd0",
            "#88d0c3",
            "#7bcbbc",
            "#7bcbbc",
            "#6fb7a9",
            "#62a296",
          ],
        },
      }}
    >
      <Header height={header_height} mb={40} px="xs" className={classes.header}>
        <Container className={classes.inner}>
          <Group position="apart" spacing="md">
            <Group className={classes.rightHeader} position="left" spacing="xl">
              {logo}
              <div className={classes.links}>{mainLinks}</div>
            </Group>
          </Group>

          <Group className={classes.leftHeader} position="left" spacing="lg">
            {searchBar}
            {icons}
          </Group>
        </Container>
      </Header>
    </MantineProvider>
  );
};

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
