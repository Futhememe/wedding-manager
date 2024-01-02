import { styled } from "@styled-system/jsx";

export const IconButton = styled("button", {
  base: {
    all: "unset",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    padding: "0.5rem",
    borderRadius: "md",

    color: "neutral.700",
    cursor: "pointer",

    _hover: {
      bgColor: "gray.200",
    },

    transition: "0.7s",
  },
});

export const Button = styled("button", {
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
