import { FC, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ja";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { useGetEvents } from "hooks";

const localizer = momentLocalizer(moment);

const Header = (date: string) => {
  return <div>{date}</div>;
};

export const Top: FC = () => {
  const events = useGetEvents();
  console.debug(localizer);
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div>
      <Calendar
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
            Header(moment(currentDate).format("YYYYMMDD")),
        }}
        onNavigate={(date) => setCurrentDate(date)}
      />
    </div>
  );
};
