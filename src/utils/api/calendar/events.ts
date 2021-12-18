import { thenReq } from "utils/gapi";
import { getIsSignedIn } from "utils/api/auth/auth";

type GetEventList = ({ calendarId }: { calendarId: string }) => Promise<gapi.client.calendar.Events>;

export const getEventList: GetEventList = async ({ calendarId }) => {
  try {
    const isSignedIn = await getIsSignedIn();
    if (!isSignedIn) {
      return { nextSyncToken: null, nextPageToken: null, eventList: [] };
    }
    const req = gapi.client.calendar.events.list({
      calendarId
    })
    const { result } = await thenReq(req);
    return result;
  } catch (error) {
    console.error(error);
  }
};
