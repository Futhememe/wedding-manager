import { Tabs } from "@ark-ui/react";
import { styled } from "@styled-system/jsx";

export const TabList = styled(Tabs.List, {
  base: {
    display: "flex",

    p: "0 0 0.5rem 0",
    gap: "1rem",

    borderBottomWidth: "1px",
    borderBottomColor: "#e9eaef",
  },
});

export const Trigger = styled(Tabs.Trigger, {
  base: {
    color: "gray.600",

    cursor: "pointer",

    _selected: {
      color: "black",
    },

    "&:disabled": {
      color: "gray.300",
      cursor: "not-allowed",
    },
  },
});

export const Content = styled(Tabs.Content, {
  base: {
    display: "none",
    flexDir: "column",
    p: "1rem 0",

    gap: "1rem",

    _selected: {
      display: "flex",
    },
  },
});
