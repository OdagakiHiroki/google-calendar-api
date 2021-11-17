import React from 'react'
import { Container } from "./style";

type Props = {
  className?: string;
  handleScheduleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleDateClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleWeekClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleMonthClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const SideBar: React.VFC<Props> = ({
  handleScheduleClick,
  handleDateClick,
  handleWeekClick,
  handleMonthClick,
}) => {
  return (
    <Container>
      <div onClick={(e) => handleScheduleClick(e)}>スケジュール</div>
      <div onClick={(e) => handleDateClick(e)}>日</div>
      <div onClick={(e) => handleWeekClick(e)}>週</div>
      <div onClick={(e) => handleMonthClick(e)}>月</div>
    </Container>
  );
};
