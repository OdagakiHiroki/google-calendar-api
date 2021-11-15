import { VFC, MouseEvent } from 'react'
import { View } from "react-big-calendar";
import { Container } from "./style";

type Props = {
  className?: string;
  handleViewTypeClick: (e: MouseEvent<HTMLElement>, view: View) => void;
};

export const SideBar: VFC<Props> = ({ handleViewTypeClick }) => {
  return (
    <Container>
      <div onClick={(e) => handleViewTypeClick(e, "agenda")}>スケジュール</div>
      <div onClick={(e) => handleViewTypeClick(e, "day")}>日</div>
      <div onClick={(e) => handleViewTypeClick(e, "week")}>週</div>
      <div onClick={(e) => handleViewTypeClick(e, "month")}>月</div>
    </Container>
  );
}
