import { VFC, MouseEvent, useState } from 'react';
import { Calendar, dateFnsLocalizer, Views, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import {
  formatDate,
  getNextMonth,
  getNextWeek,
  getNextDate,
  getPrevMonth,
  getPrevWeek,
  getPrevDate,
} from "utils";
import { useGetEvents } from "hooks";
import { Header } from "components/organisms/Header";
import { SideBar } from "components/organisms/SideBar";

const locales = { ja };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const TimeGutterHeader = (date: string) => {
  return <div>{date}</div>;
};

export const Top: VFC = () => {
  const events = useGetEvents();
  const [currentView, setCurrentView] = useState<View>("day");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isShowSideBar, setIsShowSideBar] = useState(false);

  const menuClick = () => {
    setIsShowSideBar(!isShowSideBar);
  }

  const prevClick = () => {
    const prevFunc = (() => {
      switch (currentView) {
        case Views.MONTH:
          return getPrevMonth;
        case Views.WEEK:
        case Views.AGENDA:
          return getPrevWeek;
        case Views.DAY:
          return getPrevDate;
        default:
          return getPrevDate;
      }
    })()
    setCurrentDate(prevFunc(currentDate));
  }

  const nextClick = () => {
    const nextFunc = (() => {
      switch (currentView) {
        case Views.MONTH:
          return getNextMonth;
        case Views.WEEK:
        case Views.AGENDA:
          return getNextWeek;
        case Views.DAY:
          return getNextDate;
        default:
          return getNextDate;
      }
    })()
    setCurrentDate(nextFunc(currentDate));
  }

  const changeView = (e : MouseEvent<HTMLElement>, view: View) => {
    setCurrentView(view);
    setIsShowSideBar(false);
  }

  return (
    <div>
      <Header
        title={formatDate(currentDate, "yyyy???MM???dd???")}
        handleClickMenu={menuClick}
        handleClickPrev={prevClick}
        handleClickNext={nextClick}
      />
      <Calendar
        culture="ja"
        localizer={localizer}
        defaultView={currentView}
        defaultDate={currentDate}
        view={currentView}
        date={currentDate}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 50px)" }}
        toolbar={false}
        components={{
          timeGutterHeader: () =>
            TimeGutterHeader(formatDate(currentDate, "dd EEEE")),
        }}
        onView={() => {}}
        onNavigate={() => {}}
      />
      {/* {isShowSideBar && (
        <SideBar handleViewTypeClick={changeView}/>
      )} */}
    </div>
  );
};
