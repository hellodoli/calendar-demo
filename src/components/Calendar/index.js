import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { CALENDAR_CUSTOM_VIEWS } from "constant";
import { transformEvents, getChangeTileHeader } from "utils";
import { datas_2811 } from "mock/data";
import { addFullCalendarApi } from "actions/calendar";
import { selectIsShowCalendarWeekends } from "selector/calendar";
import { initCalendarView } from "reducers";

import Event from "../Event";
import Toolbar from "../Toolbar";
import Sidebar from "../Sidebar";
import Watcher from "../Watcher";

import "./style.scss";

const Calendar = () => {
  const dispatch = useDispatch();
  const weekends = useSelector(selectIsShowCalendarWeekends);
  const calendarRef = useRef(null);
  const [events, setEvents] = useState(transformEvents(datas_2811));
  const cache = useRef({
    isDrag: false,
    dragEventId: "",
    dragEvent: {},
  });

  const renderEventContent = useCallback((args) => {
    const { event } = args;
    return <Event {...args} event={event} />;
  }, []);

  const eventDragStart = (info) => {
    const { event } = info;
    console.log("Drag start", { event });
    cache.current.dragEventId = event.id;
    cache.current.dragEvent = event;
    cache.current.isDrag = true;
  };

  const eventDragStop = (info) => {
    console.log("Drag stop");
  };

  const eventDrop = (info) => {
    let calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const { event: eventChange } = info;
      const event = calendarApi.getEventById(eventChange.id);
      const oldTile = event.extendedProps.tile;
      const startStr = event.startStr;
      const endStr = event.endStr;

      let titleStart = `${getChangeTileHeader(startStr)}`;
      let titleEnd = `${getChangeTileHeader(endStr)}`;
      const header = `${titleStart}- ${titleEnd}`;
      event.setExtendedProp("tile", { ...oldTile, header });
    }
    cache.current.dragEventId = "";
    cache.current.isDrag = false;
    cache.current.dragEvent = {};
  };

  const handleEvents = (events) => {
    console.log("eventSets: ", { events });
    const { dragEventId } = cache.current;
    const eventChange = events.find((event) => event.id === dragEventId);
    let testFake = false;
    if (testFake /* eventChange */) {
      const editEvents = events.map((event) => {
        if (event.id === eventChange.id) {
          return { ...event };
        }
        return event;
      });
      console.log(editEvents);
      setEvents(editEvents);
      cache.current.dragEventId = "";
      cache.current.isDrag = false;
      cache.current.dragEvent = {};
    }
  };

  useEffect(() => {
    dispatch(addFullCalendarApi({ calendarRef }));
  }, []);

  useEffect(() => {
    const containerEl = document.querySelector("#external-events-work-pool");
    new Draggable(containerEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        const data = eventEl.dataset?.info;
        console.log({ data });
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
        };
      },
    });
  }, []);

  return (
    <div id="main_page_full_calendar" className="container-wrap calendar">
      <div className="container">
        <div
          id="displayView"
          className="calendar-container calendar-mode-vertical display-vertical"
        >
          <Watcher />
          <Toolbar />
          <div id="wrapper_main_calendar" className="wrapper-main-page">
            {/* id= "tooltip-add-job" */}
            {/* id= "tooltip-add-job-bg", class= "modal__overlay bg-fixed" */}
            <div id="view-calendar" className="view-calendar">
              <div id="fullCalendar" className="full-calendar">
                <div
                  id="fullcalendar_wrapper"
                  className="full-calendar__wrapper"
                  style={{ height: "100%" }}
                >
                  <FullCalendar
                    ref={calendarRef}
                    timeZone="UTC"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    weekends={weekends}
                    headerToolbar={false} // disabled header toolbar
                    editable={true}
                    droppable={true}
                    initialView={initCalendarView.type}
                    views={CALENDAR_CUSTOM_VIEWS}
                    events={events}
                    eventContent={renderEventContent}
                    eventDragStart={eventDragStart}
                    eventDragStop={eventDragStop}
                    eventDrop={eventDrop}
                    eventsSet={handleEvents}
                    slotDuration="00:15:00"
                    slotEventOverlap={true}
                    // slotLabelInterval={120}
                  />
                </div>
              </div>
            </div>
            {/* class= "tooltip" */}
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Calendar;
