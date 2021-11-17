import React, { useState, useEffect, useRef } from 'react'
import FullCalendar, { CalendarApi } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetEvents } from "hooks";

export const Top: React.VFC = () => {
  const events = useGetEvents();

  const calendarRef = useRef<FullCalendar>(null);
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();

  useEffect(() => {
    if (!calendarRef) {
      return;
    }
    setCalendarApi(calendarRef?.current?.getApi());
  }, [calendarApi])

  const addEvent = () => {
    calendarApi?.addEvent({
      title: "event",
      start: "2021-11-10",
      end: "2021-11-11",
    });
  }

  return (
    <div>
      <div onClick={addEvent}>header</div>
      <FullCalendar
        ref={calendarRef}
        locale="ja"
        headerToolbar={false}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </div>
  )
}
