import React, { useState, useCallback, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { transformEvents } from "../../utils";
import { datas } from "../../mock/data";

import Event from "../Event";
import Toolbar from "../Toolbar";
import "./style.scss";

const Calendar = () => {
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [events] = useState(transformEvents(datas));

  const renderEventContent = useCallback((args) => {
    const { event } = args;
    return <Event event={event} />;
  }, []);

  useEffect(() => {
    dispatch({
      type: "ADD_CALENDAR_API",
      payload: { calendarRef },
    });
  }, []);

  return (
    <div id="main_page_full_calendar" className="container-wrap calendar">
      <div className="container">
        <div
          id="displayView"
          className="calendar-container calendar-mode-vertical display-vertical"
        >
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
                    headerToolbar={false} // disabled header toolbar
                    initialView="dayGridMonth"
                    events={events}
                    eventContent={renderEventContent}
                  />
                </div>
              </div>
            </div>
            {/* class= "tooltip" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
