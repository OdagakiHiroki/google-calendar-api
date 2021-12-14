import React, { useCallback } from "react";
import {
  Eventcalendar,
  MbscEventcalendarOptions,
  MbscEventcalendarView,
  CalendarPrev,
  CalendarNext,
  CalendarToday,
  CalendarNav,
} from "@mobiscroll/react";

export const CustomEventCalendar: React.VFC<MbscEventcalendarOptions> = (
  props
) => {
  const view: MbscEventcalendarView = {
    // calendar: { type: "month" },
    // agenda: { type: "week" },
    // schedule: {
    //   type: "week"
    // },
    timeline: {
      type: "week",
    },
  };

  const renderCustomHeader = useCallback(() => {
    return (
      <>
        <CalendarNav />
        <p>customカレンダーヘッダー</p>
        <CalendarPrev />
        <CalendarToday />
        <CalendarNext />
      </>
    );
  }, []);

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

  // custom calendar day
  const renderCustomDay = useCallback((day) => {
    const days = "日月火水木金土".split("");
    const date = day.date;
    return (
      <>
        <div>
          {date.getDate()}({days[date.getDay()]})
        </div>
      </>
    );
  }, []);

  // custom resource
  const renderCustomResource = useCallback((resource) => {
    return (
      <>
        <div>{resource.name}</div>
        <p>{resource.description}</p>
        <img src={resource.img} alt="" />
      </>
    );
  }, []);

  // TODO: find out where to displayed.
  const renderCustomResourceHeader = useCallback(() => {
    return (
      <>
        <div>Resources</div>
      </>
    );
  }, []);

  // custom slot for timeline(slot must be set)
  const renderCustomSlot = useCallback(() => {
    return (
      <>
        <div>custom slot</div>
      </>
    );
  }, []);

  return (
    <Eventcalendar
      {...props}
      theme="material"
      themeVariant="light"
      view={view}
      renderHeader={renderCustomHeader}
      renderEventContent={renderCustomEvent}
      renderLabelContent={renderCustomLabel}
      renderScheduleEventContent={renderCustomScheduleEvent}
      renderAgenda={renderCustomAgenda}
      renderDay={renderCustomDay}
      renderResource={renderCustomResource}
      renderResourceHeader={renderCustomResourceHeader}
      renderSlot={renderCustomSlot}
      slots={[
        {
          id: 1,
          name: "Morning shift",
        },
        {
          id: 2,
          name: "Afternoon shift",
        },
      ]}
    />
  );
};
