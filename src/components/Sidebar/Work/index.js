import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { Draggable } from "@fullcalendar/interaction";
// import dragula from "react-dragula";
import { selectWorks } from "selector/calendar";

import WorkItem from "./WorkItem";

const Work = () => {
  const works = useSelector(selectWorks);

  /*useEffect(() => {
    const containerEl = document.querySelector("#external-events-work-pool");
    new Draggable(containerEl, {
      itemSelector: ".fc-event",
      mirrorSelector: ".gu-transit",
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
    });
  }, []);*/

  useEffect(() => {
    /*workPoolContainerEl,*/
    /*const workPoolContainerEl = document.querySelector(
      "#external-events-work-pool"
    );
    const calendarContainerEl = document.querySelector("#fullcalendar_wrapper");
    let drake = dragula({
      containers: [calendarContainerEl],
      copy: false,
      removeOnSpill: true,
      moves: function (el, container, handle) {
        console.log({ class: handle.className });
        return handle.classList.contains("dragableItem");
      },
    });*/
  }, []);

  return (
    <div
      id="external-events-work-pool"
      className="external-events-list-job list-workpool details-jobslist"
    >
      {/*<div
          id="work_pool_job_move"
          class="fc-event jobslist active-joblist completed has-drag"
          style={{ display: "none" }}></div>*/}
      {/* */}
      {works.map((work) => {
        return <WorkItem key={work.event?.id} work={work} />;
      })}
    </div>
  );
};

export default Work;
