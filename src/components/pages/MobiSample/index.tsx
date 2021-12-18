import React, { useState, useCallback } from "react";
import {
  Eventcalendar,
  localeJa,
  CalendarNav,
  CalendarPrev,
  CalendarToday,
  CalendarNext,
  MbscEventcalendarView,
  MbscEventCreateEvent,
  EventcalendarBase,
} from "@mobiscroll/react";
import { useGetEvents } from "hooks";
import { SideBar } from "components/organisms/SideBar";
import { Humburger } from "./style";

type ViewType = {
  CALENDAR: {
    MONTH: MbscEventcalendarView;
  };
  AGENDA: {
    WEEK: MbscEventcalendarView;
  };
  SCHEDULE: {
    WEEK: MbscEventcalendarView;
    DAY: MbscEventcalendarView;
  };
};

export const MobiSample = () => {
  const events = useGetEvents();
  const VIEW: ViewType = {
    CALENDAR: {
      MONTH: { calendar: { type: "month" } },
    },
    AGENDA: {
      WEEK: { agenda: { type: "week" } },
    },
    SCHEDULE: {
      WEEK: { schedule: { type: "week" } },
      DAY: { schedule: { type: "day" } },
    },
  };
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const [view, setView] = useState<MbscEventcalendarView>(VIEW.CALENDAR.MONTH);

  const menuClick = useCallback(() => {
    setIsShowSideBar(!isShowSideBar);
  }, [isShowSideBar]);

  const changeView = (e: React.MouseEvent<HTMLElement>, viewType: MbscEventcalendarView) => {
    setView(viewType);
    setIsShowSideBar(false);
  };

  const handleOnEventCreate = (event: MbscEventCreateEvent, inst: EventcalendarBase) => {
    console.debug("handleOnEventCreate", event, inst);
  }

  const renderCustomHeader = useCallback(() => {
    return (
      <>
        <Humburger onClick={menuClick}>🍔</Humburger>
        <CalendarPrev />
        <CalendarNav />
        <CalendarNext />
        <CalendarToday />
      </>
    );
  }, [menuClick]);

  return (
    <>
      <Eventcalendar
        locale={localeJa}
        view={view}
        data={events}
        clickToCreate={"double"}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        externalDrop={true}
        showEventTooltip={false}
        renderHeader={renderCustomHeader}
        onEventCreate={handleOnEventCreate}
      />
      {isShowSideBar && (
        <SideBar
          handleScheduleClick={(e) => changeView(e, VIEW.AGENDA.WEEK)}
          handleDateClick={(e) => changeView(e, VIEW.SCHEDULE.DAY)}
          handleWeekClick={(e) => changeView(e, VIEW.SCHEDULE.WEEK)}
          handleMonthClick={(e) => changeView(e, VIEW.CALENDAR.MONTH)}
        />
      )}
    </>
  );
};
