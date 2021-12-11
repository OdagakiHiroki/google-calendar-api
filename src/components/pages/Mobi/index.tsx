import React, { useState, useCallback } from 'react'
import { Eventcalendar, localeJa, MbscCalendarEvent, MbscEventcalendarView } from "@mobiscroll/react"
import '@mobiscroll/react/dist/css/mobiscroll.scss';

export const Mobi = () => {
  const [myEvents, setMyEvents] = useState<MbscCalendarEvent[]>([
    { start: new Date(), title: "Today's event" },
    { start: new Date(2021, 11, 9, 9,0), end: new Date(2021,11,9,13,0), title: "Multi day event" },
    {
      start: new Date(2021, 11, 18, 9, 0),
      end: new Date(2021, 11, 18, 17, 0),
      title: 'Repeat every 2 days 5 times',
      recurring: {
          repeat: 'daily',
          count: 5,
          interval: 1
      },
      recurringException: ['2021-12-21', '2021-12-19'],
      recurringExceptionRule: {
        repeat: 'monthly',
        day: 20,
      }
    }
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const view: MbscEventcalendarView = {
    calendar: { type: "month" },
    // agenda: { type: "week" },
    // schedule: {
    //   type: 'week',
    // }
  }

  // 選択日付を変更した時のイベント
  const onSelectedDateChange = useCallback((event, inst) => {
    console.debug(event, inst);
    setSelectedDate(event.date);
  }, []);

  return (
    <Eventcalendar
      locale={localeJa}
      view={view}
      data={myEvents}
      selectedDate={selectedDate}
      onSelectedDateChange={onSelectedDateChange}
    />
  );
}
