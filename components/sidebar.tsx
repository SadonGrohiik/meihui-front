import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import {
  Group,
  Badge,
  createStyles,
  UnstyledButton,
  Box,
  NavLink,
  Slider,
  RangeSlider,
  MultiSelect,
} from "@mantine/core";

function Sidebar(props: any) {
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    props.min,
    props.max,
  ]);

  return (
    <Box sx={{ width: 350, height: "100%" }}>
      <MultiSelect
        data={props.filterData}
        label={props.filterName}
        placeholder={`فیلتر بر اساس ${props.filterName}`}
      />
    </Box>
  );
}

export default Sidebar;
