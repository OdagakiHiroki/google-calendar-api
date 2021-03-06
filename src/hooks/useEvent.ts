import { useState, useEffect } from "react";
import { getCalendarList } from "utils/api/calendar/calendarList";
import { getEventList } from "utils/api/calendar/events";

type Event = { title: string; start: string; end: string };
type UseGetEvents = () => Event[]

export const useGetCalendarList = () => {
  const [calendarList, setCalendarList] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { calendarList } = await getCalendarList();
      if (mounted) {
        setCalendarList(calendarList);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return calendarList;
}

export const useGetEvents: UseGetEvents = () => {
  const calendarList = useGetCalendarList();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    let mounted = true;
    if (calendarList.length === 0) {
      return;
    }

    (async () => {
      const events = await Promise.all(
        calendarList.map(async (calendar: any) => {
          const { eventList } = await getEventList({ calendarId: calendar.id });
          return eventList.reduce((events, currentEvent) => {
            const { summary, start, end } = currentEvent;
            if (!start || !end) {
              return events;
            }
            events.push({
              title: summary,
              start: start.date ?? start.dateTime,
              end: end.date ?? end.dateTime,
              calendarId: calendar.id,
            });
            return events;
          }, []);
        }, [])
      );
      if (mounted) {
        setEvents(events.flat());
      }
    })();

    return () => {
      mounted = false;
    };
  }, [calendarList]);

  return events;
}

// NOTE: for react-big-calendar
// export const useGetEvents = () => {
//   const now = new Date();
//   return [
//     {
//       id: 0,
//       title: "All Day Event very long title",
//       allDay: true,
//       start: new Date(2021, 10, 1),
//       end: new Date(2021, 10, 2),
//     },
//     {
//       id: 1,
//       title: "Long Event",
//       start: new Date(2021, 10, 7),
//       end: new Date(2021, 10, 10),
//     },

//     {
//       id: 2,
//       title: "DTS STARTS",
//       start: new Date(2022, 1, 13, 0, 0, 0),
//       end: new Date(2022, 1, 20, 0, 0, 0),
//     },

//     {
//       id: 3,
//       title: "DTS ENDS",
//       start: new Date(2022, 2, 6, 0, 0, 0),
//       end: new Date(2022, 2, 13, 0, 0, 0),
//     },

//     {
//       id: 4,
//       title: "Some Event",
//       start: new Date(2021, 10, 9, 0, 0, 0),
//       end: new Date(2021, 10, 10, 0, 0, 0),
//     },
//     {
//       id: 5,
//       title: "Conference",
//       start: new Date(2021, 10, 11),
//       end: new Date(2021, 10, 13),
//       desc: "Big conference for important people",
//     },
//     {
//       id: 6,
//       title: "Meeting",
//       start: new Date(2021, 10, 12, 10, 30, 0, 0),
//       end: new Date(2021, 10, 12, 12, 30, 0, 0),
//       desc: "Pre-meeting meeting, to prepare for the meeting",
//     },
//     {
//       id: 7,
//       title: "Lunch",
//       start: new Date(2021, 10, 12, 12, 0, 0, 0),
//       end: new Date(2021, 10, 12, 13, 0, 0, 0),
//       desc: "Power lunch",
//     },
//     {
//       id: 8,
//       title: "Meeting",
//       start: new Date(2021, 10, 12, 14, 0, 0, 0),
//       end: new Date(2021, 10, 12, 15, 0, 0, 0),
//     },
//     {
//       id: 9,
//       title: "Happy Hour",
//       start: new Date(2021, 10, 12, 17, 0, 0, 0),
//       end: new Date(2021, 10, 12, 17, 30, 0, 0),
//       desc: "Most important meal of the day",
//     },
//     {
//       id: 10,
//       title: "Dinner",
//       start: new Date(2021, 10, 12, 20, 0, 0, 0),
//       end: new Date(2021, 10, 12, 21, 0, 0, 0),
//     },
//     {
//       id: 11,
//       title: "Planning Meeting with Paige",
//       start: new Date(2021, 10, 13, 8, 0, 0),
//       end: new Date(2021, 10, 13, 10, 30, 0),
//     },
//     {
//       id: 11.1,
//       title: "Inconvenient Conference Call",
//       start: new Date(2021, 10, 13, 9, 30, 0),
//       end: new Date(2021, 10, 13, 12, 0, 0),
//     },
//     {
//       id: 11.2,
//       title: "Project Kickoff - Lou's Shoes",
//       start: new Date(2021, 10, 13, 11, 30, 0),
//       end: new Date(2021, 10, 13, 14, 0, 0),
//     },
//     {
//       id: 11.3,
//       title: "Quote Follow-up - Tea by Tina",
//       start: new Date(2021, 10, 13, 15, 30, 0),
//       end: new Date(2021, 10, 13, 16, 0, 0),
//     },
//     {
//       id: 12,
//       title: "Late Night Event",
//       start: new Date(2021, 10, 17, 19, 30, 0),
//       end: new Date(2021, 10, 18, 2, 0, 0),
//     },
//     {
//       id: 12.5,
//       title: "Late Same Night Event",
//       start: new Date(2021, 10, 17, 19, 30, 0),
//       end: new Date(2021, 10, 17, 23, 30, 0),
//     },
//     {
//       id: 13,
//       title: "Multi-day Event",
//       start: new Date(2021, 10, 20, 19, 30, 0),
//       end: new Date(2021, 10, 22, 2, 0, 0),
//     },
//     {
//       id: 14,
//       title: "Today",
//       start: new Date(new Date().setHours(new Date().getHours() - 3)),
//       end: new Date(new Date().setHours(new Date().getHours() + 3)),
//     },
//     {
//       id: 15,
//       title: "Point in Time Event",
//       start: now,
//       end: now,
//     },
//     {
//       id: 16,
//       title: "Video Record",
//       start: new Date(2021, 10, 14, 15, 30, 0),
//       end: new Date(2021, 10, 14, 19, 0, 0),
//     },
//     {
//       id: 17,
//       title: "Dutch Song Producing",
//       start: new Date(2021, 10, 14, 16, 30, 0),
//       end: new Date(2021, 10, 14, 20, 0, 0),
//     },
//     {
//       id: 18,
//       title: "Itaewon Halloween Meeting",
//       start: new Date(2021, 10, 14, 16, 30, 0),
//       end: new Date(2021, 10, 14, 17, 30, 0),
//     },
//     {
//       id: 19,
//       title: "Online Coding Test",
//       start: new Date(2021, 10, 14, 17, 30, 0),
//       end: new Date(2021, 10, 14, 20, 30, 0),
//     },
//     {
//       id: 20,
//       title: "An overlapped Event",
//       start: new Date(2021, 10, 14, 17, 0, 0),
//       end: new Date(2021, 10, 14, 18, 30, 0),
//     },
//     {
//       id: 21,
//       title: "Phone Interview",
//       start: new Date(2021, 10, 14, 17, 0, 0),
//       end: new Date(2021, 10, 14, 18, 30, 0),
//     },
//     {
//       id: 22,
//       title: "Cooking Class",
//       start: new Date(2021, 10, 14, 17, 30, 0),
//       end: new Date(2021, 10, 14, 19, 0, 0),
//     },
//     {
//       id: 23,
//       title: "Go to the gym",
//       start: new Date(2021, 10, 14, 18, 30, 0),
//       end: new Date(2021, 10, 14, 20, 0, 0),
//     },
//   ];
// };
