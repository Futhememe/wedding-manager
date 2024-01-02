import { FloatingOverlay } from "@floating-ui/react";
import { styled } from "@styled-system/jsx";
import { motion } from "framer-motion";
import { ComponentProps } from "react";

export const DialogContent = styled(motion["div"], {
  base: {
    display: "flex",
    flexDir: "column",
    overflow: "hidden",

    p: "1rem",
    bgColor: "white",
    h: "100%",
    zIndex: 10,
  },
  variants: {
    variant: {
      default: {},
      bottom: {
        w: "100%",
        borderRadius: "1.25rem 1.25rem 0rem 0rem",
        gap: "1.88rem",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DialogContentProps
  extends ComponentProps<typeof DialogContent> {}

export const DialogOverlay = styled(FloatingOverlay, {
  base: {
    display: "flex",
    flexDir: "column",
    bgColor: "rgba(35, 71, 35, 0.40)",
    zIndex: 3,

    alignItems: "flex-end",
  },
  variants: {
    variant: {
      default: {},
      bottomSheet: {
        alignItems: "flex-end",
      },
      center: {
        alignItems: "center",
        justifyContent: "center",

        p: "1.5rem",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DialogOverlayProps
  extends ComponentProps<typeof DialogOverlay> {}
