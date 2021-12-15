import React, { useState } from 'react'
import {
  Eventcalendar,
  localeJa,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscCellClickEvent,
  MbscCellHoverEvent,
  EventcalendarBase,
} from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.scss";

export const EventSampleCalendar = () => {
  const [myEvents, setMyEvents] = useState<MbscCalendarEvent[]>([
    {
      start: new Date(),
      title: "Today's event",
      color: "green",
      description: "機能確認中",
      location: "自宅",
    },
    {
      start: new Date(2021, 11, 9, 9, 0),
      end: new Date(2021, 11, 10, 13, 0),
      title: "Multi day event",
      description: "複数日イベント",
      location: "イベント会場",
    },
    {
      start: new Date(2021, 11, 18, 9, 0),
      end: new Date(2021, 11, 18, 17, 0),
      title: "Repeat every 2 days 5 times",
      recurring: {
        repeat: "daily",
        count: 5,
        interval: 1,
      },
      recurringException: ["2021-12-21", "2021-12-19"],
      recurringExceptionRule: {
        repeat: "monthly",
        day: 20,
      },
      description: "繰り返しイベント",
      location: "会社",
    },
  ]);

  const view: MbscEventcalendarView = {
    calendar: { type: "month" },
    // agenda: { type: "week" },
    // schedule: {
    //   type: 'week',
    // }
  };

  const handleOnCellClick = (event: MbscCellClickEvent, inst: EventcalendarBase) => {
    console.debug("handleOnCellClick", event, inst);
  }

  const handleOnCellDoubleClick = (event: MbscCellClickEvent, inst: EventcalendarBase) => {
    console.debug("handleOnCellDoubleClick", event, inst);
  }

  const handleOnCellHover = (event: MbscCellHoverEvent, inst: EventcalendarBase) => {
    console.debug("handleOnCellHover", event, inst);
  }

  const handleOnCellHoverOut = (event: MbscCellHoverEvent, inst: EventcalendarBase) => {
    console.debug("handleOnCellHoverOut", event, inst);
  }

  return (
    <Eventcalendar
      locale={localeJa}
      view={view}
      data={myEvents}
      clickToCreate={"double"}
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      onCellClick={handleOnCellClick}
      onCellDoubleClick={handleOnCellDoubleClick}
      onCellHoverIn={handleOnCellHover}
      onCellHoverOut={handleOnCellHoverOut}
    />
  );
}
