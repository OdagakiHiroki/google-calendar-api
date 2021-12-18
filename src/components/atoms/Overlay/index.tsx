import React from "react";
import { Container } from "./style";

type Props = {
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

export const Overlay: React.VFC<Props> = ({
  className,
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <Container
      className={className}
      isActive={isActive}
      onClick={onClick}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </Container>
  );
};
