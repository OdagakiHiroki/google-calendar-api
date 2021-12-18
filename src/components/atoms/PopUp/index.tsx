import React from 'react'
import { Container } from "./style";

type Props = {
  className?: string;
  children?: React.ReactNode;
}

export const PopUp: React.VFC<Props> = ({
  children,
}) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      {children}
    </Container>
  )
}
