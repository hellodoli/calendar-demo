import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectCalendarCurrentDate,
  selectCalendarApi,
  selectCalendarWeekends,
} from "selector/calendar";
import { selectViewType } from "selector/toolbar";

import PrevIcon from "./Icons/Prev";
import NextIcon from "./Icons/Next";

const TitleView = () => {
  const calendarApi = useSelector(selectCalendarApi);
  const currentDate = useSelector(selectCalendarCurrentDate);
  const weekends = useSelector(selectCalendarWeekends);
  const viewType = useSelector(selectViewType);
  const [title, setTitle] = useState(() => calendarApi?.view?.title || "");

  useEffect(() => {
    setTimeout(() => {
      const title = calendarApi?.view?.title || "";
      setTitle(title);
    });
  }, [calendarApi, currentDate, weekends, viewType]);

  return (
    <span id="title-calendar-time" className="action__items time">
      {title}
    </span>
  );
};

const Today = ({ changeCurDate }) => {
  const calendarApi = useSelector(selectCalendarApi);
  // const currentDate = useSelector(selectCalendarCurrentDate);
  const onClick = () => {
    if (!calendarApi) return;
    calendarApi.today();
    changeCurDate(calendarApi);
  };
  return (
    <div
      className={`action__items v2-btn-default btn-today mr-0`}
      onClick={onClick}
    >
      Today
    </div>
  );
};

const Buttons = ({ changeCurDate }) => {
  const calendarApi = useSelector(selectCalendarApi);

  const onClick = (type) => {
    if (!calendarApi) return;
    if (type === "prev") calendarApi.prev();
    else calendarApi.next();
    changeCurDate(calendarApi);
  };

  return (
    <div className="action">
      <div
        className="action__items btn-action tooltip"
        onClick={() => onClick("prev")}
      >
        <PrevIcon />
      </div>
      <Today changeCurDate={changeCurDate} />
      <TitleView />
      <div
        className="action__items btn-action tooltip"
        onClick={() => onClick("next")}
      >
        <NextIcon />
      </div>
    </div>
  );
};

export default Buttons;
