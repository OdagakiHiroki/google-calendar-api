import React, { useState, useEffect, useRef } from "react";
import FullCalendar, { CalendarApi, EventDropArg, DayCellContentArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import interactionPlugin, {
  EventDragStartArg,
  EventDragStopArg,
} from "@fullcalendar/interaction";
import { formatDate } from "utils";
import { Header } from "components/organisms/Header";
import { SideBar } from "components/organisms/SideBar";
// import { getCalendarList } from "utils/api/calendar/calendarList";
// import { getEventList } from "utils/api/calendar/events";
import { useGetEvents } from "hooks";

export const Top: React.VFC = () => {
  const events = useGetEvents();
  const headerHeight = "50px";

  const calendarRef = useRef<FullCalendar>(null);
  const [calendarApi, setCalendarApi] = useState<CalendarApi>();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [isShowSideBar, setIsShowSideBar] = useState(false);

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
  }, [calendarApi]);

  // const addEvent = () => {
  //   if (!calendarApi) {
  //     return;
  //   }
  //   calendarApi?.addEvent({
  //     title: "event",
  //     start: "2021-11-10",
  //     end: "2021-11-11",
  //   });
  // };

  const menuClick = () => {
    setIsShowSideBar(!isShowSideBar);
  };

  const prevClick = () => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.prev();
    setCurrentDate(calendarApi?.getDate());
  };

  const nextClick = () => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.next();
    setCurrentDate(calendarApi?.getDate());
  };

  const changeView = (e: React.MouseEvent<HTMLElement>, viewType: string) => {
    if (!calendarApi) {
      return;
    }
    calendarApi?.changeView(viewType);
    setCurrentView(viewType);
    setIsShowSideBar(false);
  };

  const handleDragStartEvent = (info: EventDragStartArg) => {
    console.debug("dragStart: ", info);
  };

  const handleDragStopEvent = (info: EventDragStopArg) => {
    console.debug("dragStop", info);
  };

  const handleEventDrop = (info: EventDropArg) => {
    console.debug("eventDrop: ", info);
  };

  const formatDayCellContent = (content: DayCellContentArg) => {
    // 月表示の際の日付フォーマット
    if (currentView === "dayGridMonth") {
      content.dayNumberText = formatDate(content.date, "d");
    }
  };

  // const handleClickGetCalendarList = async () => {
  //   const { calendarList } = await getCalendarList();
  //   console.debug(calendarList);
  // };

  // const handleClickGetEventList = async ({ calendarId }: { calendarId: string }) => {
  //   const { eventList } = await getEventList({ calendarId });
  //   console.debug(eventList);
  // }

  return (
    <>
      <Header
        title={formatDate(currentDate, "yyyy年MM月dd日")}
        height={headerHeight}
        handleClickMenu={menuClick}
        handleClickPrev={prevClick}
        handleClickNext={nextClick}
      />
      {/* <button onClick={addEvent}>イベント追加</button>
      <button onClick={handleClickGetCalendarList}>カレンダー一覧取得</button>
      <button onClick={() => handleClickGetEventList({ calendarId: "" })}>イベント一覧取得</button> */}
      <FullCalendar
        ref={calendarRef}
        locale="ja"
        droppable
        editable
        headerToolbar={false}
        allDayText="終日"
        dayCellContent={(content) => formatDayCellContent(content)}
        height={`calc(100% - ${headerHeight})`}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView={currentView}
        events={events}
        eventDragStart={(info) => handleDragStartEvent(info)}
        eventDragStop={(info) => handleDragStopEvent(info)}
        eventDrop={(info) => handleEventDrop(info)}
        // drop={(dropEvent) => console.debug("drop: ", dropEvent)}
      />
      {isShowSideBar && (
        <SideBar
          handleScheduleClick={(e) => changeView(e, "listYear")}
          handleDateClick={(e) => changeView(e, "timeGridDay")}
          handleWeekClick={(e) => changeView(e, "timeGridWeek")}
          handleMonthClick={(e) => changeView(e, "dayGridMonth")}
        />
      )}
    </>
  );
};
