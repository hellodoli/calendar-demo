import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { CALENDAR_CUSTOM_VIEWS } from "constant";
import { transformEvents, getChangeTileHeader, isEventOverDiv } from "utils";
import { datas_2811 } from "mock/data";
import {
  addFullCalendarApi,
  addWorkItem,
  removeWorkItem,
} from "actions/calendar";
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
    const { event, jsEvent } = info;
    console.log("Drag stop: ", info);
    if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
      let calendarApi = calendarRef.current?.getApi();
      console.log({ calendarApi });
      if (calendarApi) {
        const eventFound = calendarApi.getEventById(event.id);
        if (eventFound) {
          event.remove();
          const {
            _context,
            _def,
            _instance,
            end,
            endStr,
            start,
            startStr,
            title,
            id,
            extendedProps,
            allDay,
            ...rest
          } = event;
          const newEvent = {
            ...rest,
            ...extendedProps,
            color: extendedProps.colors,
          };
          console.log({ newEvent });
          dispatch(addWorkItem(newEvent));
        }
      }
    }
  };

  const eventDrop = (info) => {
    console.log("eventDrop: ", { info });
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
      console.log({ header });
      event.setExtendedProp("tile", { ...oldTile, header });
    }
    cache.current.dragEventId = "";
    cache.current.isDrag = false;
    cache.current.dragEvent = {};
  };

  const drop = (info) => {
    console.log("drop:", { info });
    // remove the element from the "Draggable Events" list
    dispatch(removeWorkItem(info.draggedEl?.dataset?.id));
    /*const parentNode = info.draggedEl?.parentNode;
    if (parentNode) {
      parentNode.removeChild(info.draggedEl);
    }*/
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

  const eventReceive = (info) => {
    console.log("eventReceive: ", { info });
  };

  useEffect(() => {
    dispatch(addFullCalendarApi({ calendarRef }));
  }, []);

  useEffect(() => {}, []);

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
                    dragRevertDuration={0}
                    initialView={initCalendarView.type}
                    views={CALENDAR_CUSTOM_VIEWS}
                    events={events}
                    eventContent={renderEventContent}
                    eventDragStart={eventDragStart}
                    eventDragStop={eventDragStop}
                    eventDrop={eventDrop}
                    drop={drop}
                    eventsSet={handleEvents}
                    slotDuration="00:15:00"
                    slotEventOverlap={true}
                    eventReceive={eventReceive}
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
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
