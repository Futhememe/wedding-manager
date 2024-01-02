import { styled } from "@styled-system/jsx";

export const Input = styled("input", {
  base: {
    display: "flex",

    p: "0.5rem 0.75rem",

    border: "2px solid #F4F5F7",
    borderRadius: "md",

    color: "#3A3D47",

    fontSize: "md",

    _highlighted: {
      border: "3px solid #F4F5F7",
    },
    _selected: {
      border: "3px solid #F4F5F7",
    },
    _focus: {
      border: "3px solid #F4F5F7",
    },
  },
});

export const Label = styled("label", {
  base: {
    fontSize: "sm",
    fontWeight: "medium",

    color: "#3A3D47",
    ml: "4px",
  },
});
