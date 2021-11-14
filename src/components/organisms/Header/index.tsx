import { FC } from 'react';
import { Container, Left, Center, Right } from "./style";

type Props = {
  className?: string;
  title: string;
};

export const Header: FC<Props> = ({ title }) => {
  return (
    <Container>
      <Left>🍔</Left>
      <Center>
        <div>＜</div>
        <div>{title}</div>
        <div>＞</div>
      </Center>
      <Right></Right>
    </Container>
  )
}
