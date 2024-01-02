import { styled } from "@styled-system/jsx";

export const Box = styled("div", {
  base: {
    display: "flex",
    h: "fit-content",
    flexDir: "column",

    p: "1.25rem",
    gap: "1rem",
    border: "1px solid #e9eaef",
    borderRadius: "xl",

    fontSize: "sm",
    fontWeight: "medium",
  },
});

export const BoxButton = styled("button", {
  base: {
    all: "unset",

    // w: "100%",

    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

    gap: "0.5rem",
    p: "0.75rem",

    cursor: "pointer",

    borderRadius: "xl",
    fontSize: "sm",
    fontWeight: "medium",
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "gray.200",
      },
      primary: {
        backgroundColor: "#234723",
        color: "white",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
