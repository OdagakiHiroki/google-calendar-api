import { VFC, MouseEvent } from 'react';
import { Container, Left, Center, Right } from "./style";

type Props = {
  className?: string;
  title: string;
  height?: string;
  handleClickPrev?: (e: MouseEvent<HTMLElement>) => void;
  handleClickNext?: (e: MouseEvent<HTMLElement>) => void;
  handleClickMenu?: (e: MouseEvent<HTMLElement>) => void;
};

export const Header: VFC<Props> = ({
  title,
  height,
  handleClickMenu,
  handleClickPrev,
  handleClickNext,
}) => {
  return (
    <Container height={height}>
      <Left onClick={handleClickMenu}>🍔</Left>
      <Center>
        <div onClick={handleClickPrev}>＜</div>
        <div>{title}</div>
        <div onClick={handleClickNext}>＞</div>
      </Center>
      <Right></Right>
    </Container>
  );
};
