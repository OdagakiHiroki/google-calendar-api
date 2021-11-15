import { VFC, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { formatDate, getNextDate, getPrevDate } from "utils";
import { useGetEvents } from "hooks";
import { Header } from "components/organisms/Header";

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
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevClick = () => {
    setCurrentDate(getPrevDate(currentDate));
  }

  const nextClick = () => {
    setCurrentDate(getNextDate(currentDate));
  }

  return (
    <div>
      <Header
        title={formatDate(currentDate, "yyyy年MM月dd日")}
        handleClickPrev={prevClick}
        handleClickNext={nextClick}
      />
      <Calendar
        culture="ja"
        localizer={localizer}
        defaultView="day"
        defaultDate={currentDate}
        // date={currentDate}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "600px" }}
        toolbar={false}
        components={{
          timeGutterHeader: () =>
            TimeGutterHeader(formatDate(currentDate, "dd EEEE")),
        }}
        // onNavigate={(date) => console.debug(date)}
      />
    </div>
  );
};
