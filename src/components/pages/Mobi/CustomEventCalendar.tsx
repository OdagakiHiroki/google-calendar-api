import React, { useCallback } from 'react'
import { Eventcalendar, MbscEventcalendarOptions, MbscEventcalendarView } from "@mobiscroll/react"

export const CustomEventCalendar: React.VFC<MbscEventcalendarOptions> = (props) => {
  const view: MbscEventcalendarView = {
    calendar: { type: "month" },
    // agenda: { type: "week" },
    schedule: {
      allDay: true
    }
  }

  // NOTE: For the agenda and popover
  const renderCustomEvent = useCallback((data) => {
    return (
      <>
        <div>{data.start}</div>
        <div>{data.end}</div>
        <div>{data.title}</div>
        <div>{data.original.description}</div>
        <div>{data.original.location}</div>
      </>
    );
  }, []);

  // NOTE: For event labels in the calendar and all-day events in the scheduler
  // 月別カレンダーに表示するラベルが変化
  const renderCustomLabel = useCallback((data) => {
    return (
      <>
        <div>{data.id}</div>
        <div>{data.start}</div>
        <div>{data.end}</div>
        <div>{data.isMultiDay ? "true" : "false"}</div>
        <div>{data.original.description}</div>
        <div>{data.original.location}</div>
      </>
    );
  }, []);

  // NOTE: For the scheduler
  const renderCustomScheduleEvent = useCallback((data) => {
    return (
      <>
        <div>{data.id}</div>
        <div>{data.allDay}</div>
        <div>{data.isMultiDay ? "true" : "false"}</div>
        <div>{data.title}</div>
        <div>{data.start}</div>
        <div>{data.end}</div>
        <div>{data.lastDay}</div>
        <div>{data.original.description}</div>
        <div>{data.original.location}</div>
      </>
    );
  }, []);

  // NOTE: Taking over the listing, render custom agenda,
  const renderCustomAgenda = useCallback((data) => {
    console.debug("renderCustomAgendaData: ", data);
    return (
      <div>
        {/* TODO: type definition */}
        {data.map((day: any) => (
          <ul key={day.timestamp}>
            <li>{day.date}</li>
            {/* TODO: type definition */}
            {day.events.map((event: any) => (
              <li key={event.id}>{event.title}</li>
            ))}
          </ul>
        ))}
      </div>
    );
  }, []);

  return (
    <Eventcalendar
      {...props}
      view={view}
      renderEventContent={renderCustomEvent}
      renderLabelContent={renderCustomLabel}
      renderScheduleEventContent={renderCustomScheduleEvent}
      renderAgenda={renderCustomAgenda}
    />
  )
}
