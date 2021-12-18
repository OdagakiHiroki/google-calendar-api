import React from 'react'
import { Row, Label } from "./style";

type Props = {
  className?: string;
  eventData?: gapi.client.calendar.Event | null;
}

export const EventDetail: React.VFC<Props> = ({
  eventData,
}) => {
  console.debug(eventData);
  return (
    <>
      <Row>
        <Label>タイトル</Label>
        <div>{eventData?.summary}</div>
      </Row>
      <Row>
        <Label>参加者</Label>
        {eventData?.attendees
          ?.filter(
            (attendee) =>
              !attendee.email.includes("@resource.calendar.google.com")
          )
          .map((attendee, index) => (
            <div key={index}>{attendee.email}</div>
          ))}
      </Row>
      <Row>
        <Label>メモ</Label>
        <div>{eventData?.description}</div>
      </Row>
      <Row>
        <Label>会議室場所</Label>
        <div>{eventData?.location}</div>
      </Row>
      <Row>
        <Label>スケジュールの登録者</Label>
        <div>{eventData?.creator.displayName || eventData?.creator.email}</div>
        <div>{eventData?.created}</div>
      </Row>
    </>
  );
}
