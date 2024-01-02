import { Checkbox as ArkCheckbox, CheckboxProps } from "@ark-ui/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Control, Label, Root } from "./styles";
import { Check } from "@phosphor-icons/react";

interface ICheckbox
  extends Omit<
    ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLLabelElement>>,
    "$$typeof"
  > {
  label?: string;
}

export const Checkbox = ({ ...rest }: ICheckbox) => {
  return (
    <Root {...rest}>
      <Control>
        <ArkCheckbox.Indicator>
          <Check size={14} weight="bold" color="white" />
        </ArkCheckbox.Indicator>
      </Control>
      <Label>{rest.label}</Label>
    </Root>
  );
};
