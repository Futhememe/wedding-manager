import { styled } from "@styled-system/jsx";

export const Row = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
});

export const Column = styled("div", {
  base: {
    display: "flex",
    flexDir: "column",

    gap: "0.25rem",
  },
});

export const Heading = styled("h1", {
  base: {
    fontSize: "1.25rem",
    fontWeight: "medium",
  },
});
