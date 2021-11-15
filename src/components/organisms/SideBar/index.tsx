import { VFC } from 'react'
import { Container } from "./style";

type Props = {
  className?: string;
};

export const SideBar: VFC<Props> = () => {
  return (
    <Container>
      <div>スケジュール</div>
      <div>日</div>
      <div>週</div>
      <div>月</div>
    </Container>
  )
}
