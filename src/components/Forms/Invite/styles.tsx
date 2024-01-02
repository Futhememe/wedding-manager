import { styled } from "@styled-system/jsx";

export const Content = styled("div", {
  base: {
    display: "flex",
    flexDir: "column",
    position: "relative",
    alignItems: "center",

    maxW: ["100%", "400px"],
    w: ["100%", "400px"],
  },
});

export const Form = styled("form", {
  base: {
    display: "flex",
    flexDir: "column",
    w: "100%",

    gap: "1rem",
    p: "1rem 0",
  },
});

export const Header = styled("div", {
  base: {
    display: "flex",
    w: "100%",

    p: "0 0 0.75rem 0",

    alignItems: "center",
    justifyContent: "space-between",

    borderBottom: "1px solid #e9eaef",
  },
});

export const Footer = styled("div", {
  base: {
    display: "flex",
    position: "fixed",
    w: "20%",

    p: "0.5rem",

    bottom: 0,
  },
});

export const Title = styled("h2", {
  base: {
    fontSize: "xl",
    fontWeight: "medium",
    color: "neutral.700",
  },
});

export const Subtitle = styled("h2", {
  base: {
    fontSize: "lg",
    fontWeight: "medium",
    color: "neutral.700",
  },
});

export const CheckboxList = styled("div", {
  base: {
    display: "flex",
    flexDir: "column",
    maxH: ["300px", "500px"],
    overflowY: "scroll",

    p: "0.75rem 0",
    gap: "0.5rem",
  },
});
