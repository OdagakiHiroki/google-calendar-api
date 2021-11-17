import React, { useState, useEffect, useRef } from 'react'
import FullCalendar, { CalendarApi } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { formatDate } from "utils";
import { Header } from "components/organisms/Header";
import { useGetEvents } from "hooks";

export const Top: React.VFC = () => {
  const events = useGetEvents();

  const calendarRef = useRef<FullCalendar>(null);
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (!calendarRef) {
      return;
    }
    const calendarApi = calendarRef?.current?.getApi();
    setCalendarApi(calendarApi);
    if (!calendarApi) {
      return;
    }
    setCurrentDate(calendarApi?.getDate());
  }, [calendarApi])

  const addEvent = () => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.addEvent({
      title: "event",
      start: "2021-11-10",
      end: "2021-11-11",
    });
  }

  const prevClick = () => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.prev();
    setCurrentDate(calendarApi?.getDate());
  }

  const nextClick = () => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.next();
    setCurrentDate(calendarApi?.getDate());
  }

  return (
    <div>
      <Header
        title={formatDate(currentDate, "yyyy年MM月dd日")}
        // handleClickMenu={menuClick}
        handleClickPrev={prevClick}
        handleClickNext={nextClick}
      />
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
