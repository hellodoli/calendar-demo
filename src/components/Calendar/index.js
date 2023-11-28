import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import { transformEvents } from "utils";
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

  const renderEventContent = useCallback((args) => {
    const { event } = args;
    return <Event {...args} event={event} />;
  }, []);

  const eventDrop = (info) => {
    console.log("eventDrop", { info });
    // setEvents();
  };

  const handleEvents = (events) => {
    console.log("eventSets: ", { events });
    setEvents(events);
  };

  useEffect(() => {
    dispatch(addFullCalendarApi({ calendarRef }));
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
                    dayMaxEvents={true}
                    initialView={initCalendarView.type}
                    events={events}
                    eventContent={renderEventContent}
                    eventDrop={eventDrop}
                    // eventsSet={handleEvents}
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
