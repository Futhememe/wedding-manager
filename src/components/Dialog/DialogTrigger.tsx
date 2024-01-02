import {
  HTMLProps,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement,
} from "react";
import { useDialogContext } from "./context/provider";
import { useMergeRefs } from "@floating-ui/react";

interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export const DialogTrigger = forwardRef<
  HTMLElement,
  HTMLProps<HTMLElement> & DialogTriggerProps
>(function DialogTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useDialogContext();
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...children.props,
        "data-state": context.open ? "open" : "closed",
      })
    );
  }

  return <></>;
});
