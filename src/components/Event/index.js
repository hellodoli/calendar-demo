import React from "react";

const ContentHeader = ({ eventId = "", header = "" }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        display: "flex",
        alignItems: "center",
        borderRadius: "2px",
        fontSize: "10px",
        lineHeight: "10px",
        backgroundColor: "inherit",
        paddingLeft: "1px",
        whiteSpace: "nowrap",
        zIndex: 1,
        height: "auto",
      }}
    >
      <div
        className={`job_fullcalendar_iconloading_${eventId}`}
        style={{
          margin: "0px 8px 0px 5px",
          display: "none",
        }}
      ></div>
      <div
        className="emoji-content emoji-event"
        style={{ marginRight: "2px" }}
      ></div>
      <div
        style={{
          overflow: "hidden",
          flex: "1 1 0%",
          padding: "1px 0px",
          fontWeight: 400,
        }}
      >
        {header}
      </div>
    </div>
  );
};

const ContentBlock = ({ content = [] }) => {
  return (
    <div
      style={{
        flex: "1 1 0%",
        lineHeight: "1.15", // dynamic ?
        fontSize: "11px", // dynamic ?
        color: "inherit",
        paddingLeft: "1px",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {content.map((textBlock) => {
        return (
          <div style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
            {textBlock}
          </div>
        );
      })}
    </div>
  );
};

const Event = (props) => {
  const { event } = props;
  const eventId = event.id || "";
  const extendedProps = event.extendedProps || {};
  const colors = extendedProps.colors || {};

  console.log({
    ingleEvent: event,
    extendedProps: event?.extendedProps,
    colors,
  });

  return (
    <div
      id={eventId}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "2px",
        maxHeight: "100%",
        height: "50px",
        width: "100%",
        overflow: "hidden",
        boxSizing: "content-box",
        ...(colors.background && { backgroundColor: colors.background }),
        ...(colors.text && { color: colors.text }),
        ...(colors.border && { border: `1px solid ${colors.border}` }),
      }}
    >
      <ContentHeader header={extendedProps.tile?.header} eventId={eventId} />
      <ContentBlock content={extendedProps.tile?.content} />
    </div>
  );
};

export default Event;
