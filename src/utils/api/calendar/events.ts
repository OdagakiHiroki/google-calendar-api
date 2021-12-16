import { thenReq } from "utils/gapi";
import { getIsSignedIn } from "utils/api/auth/auth";

type GetEventList = ({ calendarId }: { calendarId: string }) => Promise<{
  nextSyncToken: string;
  nextPageToken: string;
  eventList: any[];
}>;

export const getEventList: GetEventList = async ({ calendarId }) => {
  try {
    const isSignedIn = await getIsSignedIn();
    if (!isSignedIn) {
      return { nextSyncToken: null, nextPageToken: null, eventList: [] };
    }
    const req = window.gapi.client.calendar.events.list({
      calendarId
    });
    const { result, status } = await thenReq(req);
    if (status !== 200) {
      return { nextSyncToken: null, nextPageToken: null, eventList: [] };
    }
    const { nextSyncToken, nextPageToken, items } = result;
    return { nextSyncToken, nextPageToken, eventList: items };;
  } catch (error) {
    return { nextSyncToken: null, nextPageToken: null, eventList: [] };
  }
};
