import { thenReq } from "utils/gapi";
import { getIsSignedIn } from "utils/api/auth/auth";

export const getCalendarList = async () => {
  try {
    const isSignedIn = await getIsSignedIn();
    if (!isSignedIn) {
      return { nextSyncToken: null, nextPageToken: null, calendarList: [] };
    }
    const req = window.gapi.client.calendar.calendarList.list();
    const { result, status } = await thenReq(req);
    if (status !== 200) {
      return { nextSyncToken: null, nextPageToken: null, calendarList: [] };
    }
    const { nextSyncToken, nextPageToken, items } = result;
    return { nextSyncToken, nextPageToken, calendarList: items };;
  } catch (error) {
    return { nextSyncToken: null, nextPageToken: null, calendarList: [] };
  }
};
