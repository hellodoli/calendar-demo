import React, { useState, useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";

import {
  selectCalendarCurrentDate,
  selectCalendarApi,
  selectCalendarWeekends,
} from "selector/calendar";
import { selectViewType } from "selector/toolbar";

import PrevIcon from "./Icons/Prev";
import NextIcon from "./Icons/Next";
import SuperPrev from "./Icons/SuperPrev";
import SuperNext from "./Icons/SuperNext";
import DatePicker from "components/Sidebar/DatePicker";

const SUPER_NEXT_PREV_STATE = [
  {
    id: "1_week",
    label: "1 week",
    value: "week",
    number: 1,
  },
  {
    id: "2_weeks",
    label: "2 weeks",
    value: "week",
    number: 2,
  },
  {
    id: "3_weeks",
    label: "3 weeks",
    value: "week",
    number: 3,
  },
  {
    id: "4_weeks",
    label: "4 weeks",
    value: "week",
    number: 4,
  },
  {
    id: "5_weeks",
    label: "5 weeks",
    value: "week",
    number: 5,
  },
  {
    id: "6_weeks",
    label: "6 weeks",
    value: "week",
    number: 6,
  },
  {
    id: "7_weeks",
    label: "7 weeks",
    value: "week",
    number: 7,
  },
  {
    id: "8_weeks",
    label: "8 weeks",
    value: "week",
    number: 8,
  },
  {
    id: "3_months",
    label: "3 months",
    value: "month",
    number: 3,
  },
  {
    id: "6_months",
    label: "6 months",
    value: "month",
    number: 6,
  },
  {
    id: "1_year",
    label: "1 year",
    value: "year",
    number: 1,
  },
];

const CustomInput = forwardRef(({ value, onClick }, ref) => {
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
    <span
      id="title-calendar-time"
      className="action__items time"
      onClick={onClick}
      ref={ref}
    >
      {title}
    </span>
  );
});

const TitleView = () => {
  const calendarApi = useSelector(selectCalendarApi);
  const currentDate = useSelector(selectCalendarCurrentDate);
  const weekends = useSelector(selectCalendarWeekends);
  const viewType = useSelector(selectViewType);
  const [title, setTitle] = useState(() => calendarApi?.view?.title || "");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const title = calendarApi?.view?.title || "";
      setTitle(title);
    });
  }, [calendarApi, currentDate, weekends, viewType]);

  return (
    <>
      <span
        id="title-calendar-time"
        className="action__items time"
        onClick={() => setToggle(true)}
      >
        {title}
      </span>
      {toggle && (
        <div className="modal container-modal wrap-datepicker w open">
          <div
            className="modal__overlay bg-transparent"
            onClick={() => setToggle(false)}
          />
          <div className="modal__container">
            <DatePicker monthsShown={2} />
          </div>
        </div>
      )}
    </>
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

const SuperPrevNext = ({ items = [], type = "prev", changeCurDate }) => {
  const currentDate = useSelector(selectCalendarCurrentDate);
  const calendarApi = useSelector(selectCalendarApi);
  const [isOpen, setIsOpen] = useState(false);

  const onClickItem = ({ value, number }) => {
    setIsOpen(false);
    if (!calendarApi) return;
    const curDate = dayjs(currentDate);
    if (type === "prev") {
      const date = new Date(curDate.subtract(number, value));
      calendarApi.gotoDate(date);
      changeCurDate(calendarApi);
    } else {
      const date = new Date(curDate.add(number, value));
      calendarApi.gotoDate(date);
      changeCurDate(calendarApi);
    }
  };

  return (
    <div className={`v2-dropdown dropdown-jump ${isOpen ? "active" : ""}`}>
      <div className="btn-action tooltip" onClick={() => setIsOpen(!isOpen)}>
        {type === "prev" ? <SuperPrev /> : <SuperNext />}
      </div>
      <div
        id="show_list_jum_prev_datepicker"
        className="v2-dropdown__menu --right scrolls"
      >
        <ul>
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className="items"
                onClick={() => onClickItem(item)}
              >
                <p className="txt-ellipsis">{item.label}</p>
              </li>
            );
          })}
        </ul>
      </div>
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
      {/* Prev */}
      <div
        className="action__items btn-action tooltip"
        onClick={() => onClick("prev")}
      >
        <PrevIcon />
      </div>
      {/* Super prev */}
      <SuperPrevNext
        items={SUPER_NEXT_PREV_STATE}
        type="prev"
        changeCurDate={changeCurDate}
      />
      {/* Today */}
      <Today changeCurDate={changeCurDate} />
      {/* Title view */}
      <TitleView />
      {/* Super next */}
      <SuperPrevNext
        items={SUPER_NEXT_PREV_STATE}
        type="next"
        changeCurDate={changeCurDate}
      />
      {/* Next */}
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
