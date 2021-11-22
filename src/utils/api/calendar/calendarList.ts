import { execReq } from "utils/gapi";
import { getIsSignedIn } from "utils/api/auth/auth";

const getCalendarList = async () => {
  const isSignedIn = await getIsSignedIn();
  if (!isSignedIn) {
    return;
  }
  const req = window.gapi.client.calendar.calendarList.list();
  return await execReq(req);
};

export { getCalendarList };
