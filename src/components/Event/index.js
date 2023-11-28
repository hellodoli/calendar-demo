import React from "react";

const defaultOb = {};
const defaultArr = [];

const ContentHeader = ({
  eventId = "",
  isDraging = false,
  timeText = "",
  header = "",
  emoji = defaultArr,
}) => {
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
      <div className="emoji-content emoji-event" style={{ marginRight: "2px" }}>
        {emoji.join("")}
      </div>
      <div
        style={{
          overflow: "hidden",
          flex: "1 1 0%",
          padding: "1px 0px",
          fontWeight: 400,
        }}
      >
        {isDraging ? timeText : header}
      </div>
    </div>
  );
};

const ContentBlock = ({ content = [] }) => {
  return (
    <div
      style={{
        flex: "1 1 0%",
        lineHeight: "1.15",
        fontSize: "11px",
        color: "inherit",
        paddingLeft: "1px",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {content.map((textBlock, index) => {
        return (
          <div
            key={index}
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
          >
            {textBlock}
          </div>
        );
      })}
    </div>
  );
};

const Event = (props) => {
  const { event, isDragging, timeText } = props;
  const eventId = event.id || "";
  const extendedProps = event.extendedProps || defaultOb;
  const colors = extendedProps.colors || defaultOb;

  if (event.id === "535143") {
    console.log({ props });
  }

  return (
    <div
      id={eventId}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "2px",
        width: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        boxSizing: "content-box",
        /*height:
          !content?.length || (content?.length === 1 && !content[0])
            ? "100%"
            : 50,*/
        ...(colors.background && { backgroundColor: colors.background }),
        ...(colors.text && { color: colors.text }),
        ...(colors.border && { border: `1px solid ${colors.border}` }),
      }}
    >
      <ContentHeader
        eventId={eventId}
        header={extendedProps.tile?.header}
        emoji={extendedProps.job?.emoji}
        isDraging={isDragging}
        timeText={timeText}
      />
      <ContentBlock content={extendedProps.tile?.content} />
    </div>
  );
};

export default Event;
