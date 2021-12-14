import React, { useState, useCallback } from "react";
import {
  Eventcalendar,
  localeJa,
  MbscCalendarEvent,
  MbscEventcalendarView,
  MbscNewEventData,
} from "@mobiscroll/react";
import {
  MbscCalendarLabel,
  MbscCalendarMarked,
} from "@mobiscroll/react/dist/src/core/shared/calendar-view/calendar-view";
import "@mobiscroll/react/dist/css/mobiscroll.scss";
import { ExternalDragEvent } from "components/pages/Mobi/ExternalDragEvent";
import { CustomEventCalendar } from "components/pages/Mobi/CustomEventCalendar";

export const Mobi = () => {
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
  const [selectedDate, setSelectedDate] = useState(new Date());

  const view: MbscEventcalendarView = {
    calendar: { type: "month" },
    // agenda: { type: "week" },
    // schedule: {
    //   type: 'week',
    // }
  };

  const invalidRange = [
    // {
    //   // specify invalid date ranges using ISO 8601 strings
    //   start: "2021-12-24T18:00",
    //   end: "2021-12-25T23:30",
    //   title: "X'mas",
    // },
    // {
    //   // specify invalid date ranges using Date objects
    //   allDay: true,
    //   start: new Date(2021, 11, 28),
    //   end: new Date(2022, 0, 3),
    //   title: "お正月",
    // },
    {
      // specify invalid time ranges only
      start: "12:00",
      end: "13:00",
      recurring: { repeat: "weekly", weekDays: "MO,TU,WE,TH,FR" },
      title: "Lunch break",
    },
    {
      // disable weekends
      recurring: {
        repeat: "weekly",
        weekDays: "SA,SU",
      },
    },
  ];

  const labels: MbscCalendarLabel[] = [
    {
      start: new Date(2021, 11, 22),
      end: new Date(2021, 11, 23),
      text: "Conference",
      color: "red",
    },
    {
      text: "Christmasttt",
      recurring: { repeat: "yearly", month: 12, day: 24 },
    },
  ];

  const marked: MbscCalendarMarked[] = [
    new Date(2021, 2, 15),
    new Date(2021, 2, 22),
    {
      start: new Date(2021, 11, 23),
      end: new Date(2021, 11, 24),
      color: "red",
    },
    {
      color: "green",
      recurring: { repeat: "yearly", month: 12, day: 24 },
    },
  ];

  // 新規予定作成時のデフォルト値設定
  const newEventData: (args: MbscNewEventData) => MbscCalendarEvent = (
    args
  ) => {
    return {
      color: "orange",
      title: "new create event!",
    };
  };

  // 選択日付を変更した時のイベント
  const onSelectedDateChange = useCallback((event, inst) => {
    console.debug(event, inst);
    setSelectedDate(event.date);
  }, []);

  return (
    <>
      <ExternalDragEvent />
      <Eventcalendar
        locale={localeJa}
        view={view}
        data={myEvents}
        selectedDate={selectedDate}
        invalid={invalidRange}
        clickToCreate={"double"}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        externalDrop={true}
        // labels={labels}
        marked={marked}
        max={new Date(2021, 11, 27)}
        min={new Date(2021, 11, 20)}
        extendDefaultEvent={newEventData}
        onSelectedDateChange={onSelectedDateChange}
      />
      <CustomEventCalendar
        locale={localeJa}
        view={view}
        data={myEvents}
        dragToMove={true}
        dragToResize={true}
      />
    </>
  );
};
