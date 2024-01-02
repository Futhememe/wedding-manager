import {
  FloatingFocusManager,
  FloatingPortal,
  useMergeRefs,
} from "@floating-ui/react";
import { DialogOverlay, DialogContent as StyledDialogContent } from "./styles";
import { useDialogContext } from "./context/provider";
import { HTMLProps, forwardRef } from "react";

export const DialogContent = forwardRef<
  HTMLDivElement,
  HTMLProps<HTMLDivElement>
>(function DialogContent({ children, ...rest }, propRef) {
  const { context: floatingContext, ...context } = useDialogContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  if (!floatingContext.open) return null;

  return (
    <FloatingPortal>
      <DialogOverlay lockScroll>
        <FloatingFocusManager context={floatingContext}>
          <StyledDialogContent
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            animationTimingFunction="ease-in"
            ref={ref}
            aria-labelledby={context.labelId}
            aria-describedby={context.descriptionId}
            {...context.getFloatingProps(rest)}
          >
            {children}
          </StyledDialogContent>
        </FloatingFocusManager>
      </DialogOverlay>
    </FloatingPortal>
  );
});
