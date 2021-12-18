import React from 'react'
import { Container, Row } from "./style";

type Props = {
  className?: string;
  calendarList?: gapi.client.calendar.CalendarListEntry[];
  selectedCalendarList?: gapi.client.calendar.CalendarListEntry[];
  handleSelectedCalendarChange?: (e: React.ChangeEvent<HTMLElement>, calendar: gapi.client.calendar.CalendarListEntry) => void;
  handleScheduleClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleDateClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleWeekClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleMonthClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const SideBar: React.VFC<Props> = ({
  calendarList = [],
  selectedCalendarList = [],
  handleSelectedCalendarChange = () => {},
  handleScheduleClick,
  handleDateClick,
  handleWeekClick,
  handleMonthClick,
}) => {
  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <Row onClick={(e) => handleScheduleClick(e)}>スケジュール</Row>
      <Row onClick={(e) => handleDateClick(e)}>日</Row>
      <Row onClick={(e) => handleWeekClick(e)}>週</Row>
      <Row onClick={(e) => handleMonthClick(e)}>月</Row>
      {calendarList.map((calendar) => (
        <Row key={calendar.id}>
          <input
            type="checkbox"
            checked={selectedCalendarList.some(
              (selectedCalendar) => selectedCalendar.id === calendar.id
            )}
            onChange={(e) => handleSelectedCalendarChange(e, calendar)}
          />
          {calendar.summaryOverride || calendar.summary}
        </Row>
      ))}
    </Container>
  );
};
