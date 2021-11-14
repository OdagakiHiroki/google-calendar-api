import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from "date-fns";
import { ja } from "date-fns/locale";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
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

export const Top: FC = () => {
  const events = useGetEvents();
  console.debug(localizer);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <Header title={"ttttt"}/>
      <Calendar
        culture="ja"
        localizer={localizer}
        defaultView="day"
        defaultDate={currentDate}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "600px" }}
        // toolbar={false}
        components={{
          timeGutterHeader: () =>
            TimeGutterHeader(format(currentDate, "dd EEEE", { locale: ja })),
        }}
        onNavigate={(date) => setCurrentDate(date)}
      />
    </div>
  );
};
