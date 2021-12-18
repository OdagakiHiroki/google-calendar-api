// NOTE: for mobi
import { useState, useEffect } from "react";
import { getCalendarList } from "utils/api/calendar/calendarList";
import { getEventList } from "utils/api/calendar/events";
// TODO: gogole calendarからデータを取得するhooksで特定のライブラリに依存させたくない
import { MbscCalendarEvent } from "@mobiscroll/react";

type UseGetCalendarList = () => gapi.client.calendar.CalendarListEntry[];
type UseGetEvents = (calendarList: gapi.client.calendar.CalendarListEntry[]) => MbscCalendarEvent[];

export const useGetCalendarList: UseGetCalendarList = () => {
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

export const useGetEvents: UseGetEvents = (calendarList) => {
  const [events, setEvents] = useState<MbscCalendarEvent[]>([]);

  useEffect(() => {
    let mounted = true;
    if (calendarList.length === 0) {
      setEvents([]);
      return;
    }

    (async () => {
      const events = await Promise.all(
        calendarList.map(async (calendar) => {
          const { items: eventList } = await getEventList({ calendarId: calendar.id });
          return eventList.reduce((events: MbscCalendarEvent[], currentEvent) => {
            const { summary, start, end } = currentEvent;
            if (!start || !end) {
              return events;
            }
            // TODO: 繰り返し設定に応じて対応が必要
            events.push({
              ...currentEvent,
              title: summary,
              start: start.date ?? start.dateTime,
              end: end.date ?? end.dateTime,
              allDay: Boolean(start.date || end.date)
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
