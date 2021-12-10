import React from 'react'
import { Eventcalendar, localeJa } from "@mobiscroll/react"
import '@mobiscroll/react/dist/css/mobiscroll.scss';

export const Mobi = () => {
  return (
    <Eventcalendar
      locale={localeJa}
      data={[
        {
          start: new Date(),
          title: "Today's event",
        },
        {
          start: new Date(2021, 11, 9, 9,0),
          end: new Date(2021,11,9,13,0),
          title: "Multi day event",
        },
      ]}
    />
  );
}
