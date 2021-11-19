import { execReq } from "utils/gapi";

const getCalendarList = async () => {
  const signInRes = await window.gapi.auth2.getAuthInstance().signIn();
  if (!signInRes) {
    return;
  }
  const req = window.gapi.client.calendar.calendarList.list();
  return await execReq(req);
};

export { getCalendarList };
