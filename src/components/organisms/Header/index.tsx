import { VFC, MouseEvent } from 'react';
import { Container, Left, Center, Right } from "./style";

type Props = {
  className?: string;
  title: string;
  handleClickPrev?: (e: MouseEvent<HTMLElement>) => void;
  handleClickNext?: (e: MouseEvent<HTMLElement>) => void;
};

export const Header: VFC<Props> = ({ title, handleClickPrev, handleClickNext }) => {
  return (
    <Container>
      <Left>🍔</Left>
      <Center>
        <div onClick={handleClickPrev}>＜</div>
        <div>{title}</div>
        <div onClick={handleClickNext}>＞</div>
      </Center>
      <Right></Right>
    </Container>
  )
}
