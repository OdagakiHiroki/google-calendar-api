import React, { useState } from 'react'
import { Eventcalendar, localeJa, MbscCalendarEvent } from "@mobiscroll/react"
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
      }
    }
  ]);

  return (
    <Eventcalendar
      locale={localeJa}
      data={myEvents}
    />
  );
}
