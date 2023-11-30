import { memo, useRef, useEffect } from "react";
import { Draggable } from "@fullcalendar/interaction";
import Icon from "./Icon";

const WorkItem = ({ work }) => {
  const {
    color: { border = "", text = "", background = "" },
    tile,
    customer,
    location,
  } = work;
  const elRef = useRef(null);

  useEffect(() => {
    let draggable = new Draggable(elRef.current, {
      itemSelector: ".fc-event",
      //mirrorSelector: ".gu-transit",
      eventData: function (eventEl) {
        const data = eventEl.dataset?.info;
        if (!data) return {};
        const event = JSON.parse(data);
        const infoEvent = event.event;
        const colors = event.color;

        return {
          ...event,
          id: infoEvent.id,
          //start: infoEvent.start,
          //end: infoEvent.end,
          //allDay: event.all_day || false,
          title: event.tile?.header || "",
          // colors
          backgroundColor: colors?.background || "",
          borderColor: colors?.border || "",
          textColor: colors?.text || "",
          // extend
          colors: event?.color || event?.colors || {},
          tile: event.tile,
          isDragItem: true,
        };
      },
      zIndex: 999,
      revert: true, // will cause the event to go back to its
      revertDuration: 0, //  original position after the drag
    });

    // a cleanup function
    return () => draggable.destroy();
  });

  return (
    <div
      class="fc-event jobslist active-joblist"
      style={{
        backgroundColor: background,
        borderLeft: `4px solid ${border}`,
      }}
      title={tile?.header}
      data-info={JSON.stringify(work)}
      data-id={work.event.id}
      ref={elRef}
    >
      <div class="name" style={{ color: text }}>
        <div class="icon">
          <Icon />
        </div>
        <span class="word-break">{tile?.header}</span>
      </div>
      <div class="info" style={{ color: text }}>
        {customer?.first_name}
      </div>
      <div class="info" style={{ color: text }}>
        {location?.name}{" "}
      </div>
      <div class="info" style={{ color: text }}>
        {tile?.content?.length ? tile?.content[tile.content.length - 1] : ""}
      </div>
    </div>
  );
};

export default memo(WorkItem);
