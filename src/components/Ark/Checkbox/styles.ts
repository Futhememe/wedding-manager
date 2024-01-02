import { Checkbox } from "@ark-ui/react";
import { styled } from "@styled-system/jsx";

export const Root = styled(Checkbox.Root, {
  base: {
    display: 'flex',
    gap: '0.5rem',
    ml: '0.5rem',

    cursor: 'pointer'
  }
})

export const Control = styled(Checkbox.Control, {
  base: {
    display: 'flex',
    w: '1.25rem',
    h: '1.25rem',

    alignItems: 'center',
    justifyContent: 'center',

    border: '1px solid',
    borderColor: 'neutral.200',
    borderRadius: 'md',

    _checked: {
      backgroundColor: '#234723',
      border: 'none'
    },

    transition: '0.3s'
  }
})

export const Label = styled(Checkbox.Label, {
  base: {
    fontSize: "sm",
    fontWeight: "medium",

    color: "#3A3D47",
  },
})