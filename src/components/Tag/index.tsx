import { styled } from "@styled-system/jsx";

export const Tag = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",

    p: "0.5rem",

    fontSize: "sm",
    color: "neutral.600",
    fontWeight: "medium",
    lineHeight: "none",

    borderRadius: "md",
    bgColor: "gray.100",
  },
});
