import { FC } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import "moment/locale/ja";
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { useGetEvents } from "hooks";

const localizer = momentLocalizer(moment);

export const Top: FC = () => {
  const events = useGetEvents();

  return (
    <>
      <div>top</div>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{height: "600px"}}
        />
      </div>
    </>
  )
}
