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
  MbscEventUpdatedEvent,
  MbscEventDeleteEvent,
  EventcalendarBase,
  MbscEventClickEvent,
} from "@mobiscroll/react";
import { useGetCalendarList, useGetEvents } from "hooks";
import { Overlay } from "components/atoms/Overlay";
import { SideBar } from "components/organisms/SideBar";
import { EventDetail } from "components/organisms/EventDetail";
import { PopUp } from "components/atoms/PopUp";
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
  const calendarList = useGetCalendarList();
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
  const [isShowCalendarDetail, setIsShowCalendarDetail] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<gapi.client.calendar.Event | null>(null);
  const [view, setView] = useState<MbscEventcalendarView>(VIEW.CALENDAR.MONTH);
  const [selectedCalendarList, setSelectedCalendarList] = useState<gapi.client.calendar.CalendarListEntry[]>([]);
  console.debug(selectedCalendarList);
  const events = useGetEvents(selectedCalendarList);
  console.debug(calendarList, events);

  const menuClick = useCallback(() => {
    setIsShowSideBar(!isShowSideBar);
  }, [isShowSideBar]);

  const changeView = (e: React.MouseEvent<HTMLElement>, viewType: MbscEventcalendarView) => {
    setView(viewType);
    setIsShowSideBar(false);
  };

  const changeSelectedCalendar = (e: React.ChangeEvent<HTMLElement>, calendar: gapi.client.calendar.CalendarListEntry) => {
    e.stopPropagation();
    const isSelected = selectedCalendarList.some(selectedCalendar => selectedCalendar.id === calendar.id);
    console.debug(isSelected);
    if (isSelected) {
      setSelectedCalendarList(prevCalendars => {
        return prevCalendars.filter(prevCalendar => prevCalendar.id !== calendar.id);
      });
      return;
    }
    setSelectedCalendarList(prev => {
      return [...prev, calendar]
    });
  }

  const handleOnEventClick = (event: MbscEventClickEvent, inst: EventcalendarBase) => {
    setSelectedEvent(event.event as gapi.client.calendar.Event);
    setIsShowCalendarDetail(true);
  }

  const handleOnEventCreate = (event: MbscEventCreateEvent, inst: EventcalendarBase) => {
    console.debug("handleOnEventCreate", event, inst);
  }

  const handleOnEventCreated = (event: MbscEventCreateEvent, inst: EventcalendarBase) => {
    console.debug("handleOnEventCreated", event, inst);
  }

  const handleOnEVentUpdated = (event: MbscEventUpdatedEvent, inst: EventcalendarBase) => {
    console.debug("handleOnEVentUpdated", event, inst);
  }

  const handleOnEventDelte = (event: MbscEventDeleteEvent, inst: EventcalendarBase) => {
    console.debug("handleOnEventDelte", event, inst);
    // prevent delete
    return false;
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
        themeVariant="light"
        locale={localeJa}
        view={view}
        data={events}
        // clickToCreate={"double"}
        // dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        externalDrop={true}
        showEventTooltip={false}
        renderHeader={renderCustomHeader}
        onEventClick={handleOnEventClick}
        onEventCreate={handleOnEventCreate}
        onEventCreated={handleOnEventCreated}
        onEventUpdated={handleOnEVentUpdated}
        onEventDelete={handleOnEventDelte}
      />
      {isShowSideBar && (
        <Overlay isActive={isShowSideBar} onClick={() => setIsShowSideBar(false)}>
          <SideBar
            calendarList={calendarList}
            selectedCalendarList={selectedCalendarList}
            handleSelectedCalendarChange={changeSelectedCalendar}
            handleScheduleClick={(e) => changeView(e, VIEW.AGENDA.WEEK)}
            handleDateClick={(e) => changeView(e, VIEW.SCHEDULE.DAY)}
            handleWeekClick={(e) => changeView(e, VIEW.SCHEDULE.WEEK)}
            handleMonthClick={(e) => changeView(e, VIEW.CALENDAR.MONTH)}
          />
        </Overlay>
      )}
      {isShowCalendarDetail && (
        <Overlay isActive={isShowCalendarDetail} onClick={() => setIsShowCalendarDetail(false)}>
          <PopUp>
            <EventDetail eventData={selectedEvent} />
          </PopUp>
      </Overlay>
      )}
    </>
  );
};
