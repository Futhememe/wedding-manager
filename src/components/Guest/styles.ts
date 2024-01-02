import { styled } from "@styled-system/jsx";

export const Container = styled('div', {
  base: {
    display: 'flex',
    flexDir: 'column',

    p: '0.5rem 0 1rem 0',

    borderBottom: '1px solid #e9eaef'
  }
})

export const Name = styled('p', {
  base: {
    fontSize: 'lg',
    color: 'neutral.800'
  }
})

export const Pair = styled('p', {
  base: {
    color: 'neutral.600',
    fontWeight: 'normal'
  }
})