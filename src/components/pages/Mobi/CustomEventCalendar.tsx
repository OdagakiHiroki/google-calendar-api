import React, { useCallback } from 'react'
import { Eventcalendar, MbscEventcalendarOptions, MbscEventcalendarView } from "@mobiscroll/react"

export const CustomEventCalendar: React.VFC<MbscEventcalendarOptions> = (props) => {
  const view: MbscEventcalendarView = {
    calendar: { type: "month" },
    agenda: { type: "week" },
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

  return (
    <Eventcalendar
      {...props}
      view={view}
      renderEvent={renderCustomEvent}
    />
  )
}
