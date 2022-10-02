import Link from "next/link";
import { createStyles, UnstyledButton } from "@mantine/core";
import { generateSortUrl } from "../util/util";
import { css } from "@emotion/react";

const useStyles = createStyles((theme) => ({
  _link: {
    color: theme.colors.dark[2],
    fontSize: 13,
    fontFamily: "Yekan",
    "&:focus": {
      color: theme.colors.pastelBlue[4],
    },
  },
  active_link: {
    color: theme.colors.pastelBlue[4],
    fontSize: 13,
    fontFamily: "Yekan",
  },
}));

export default function SortLink(props: any) {
  const { classes } = useStyles();

  return (
    <Link
      href={generateSortUrl(
        props.route.includes("?") ? props.filter : "?" + props.filter,
        props.route
      )}
    >
      <UnstyledButton
        className={
          props.route.includes(props.filter)
            ? classes.active_link
            : classes._link
        }
      >
        {props.label}
      </UnstyledButton>
    </Link>
  );
}
