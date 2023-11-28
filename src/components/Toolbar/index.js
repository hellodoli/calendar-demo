import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setCurrentDate } from "actions/calendar";

import ChangeView from "./ChangeView";
import Buttons from "./Buttons";

const Toolbar = () => {
  const dispatch = useDispatch();

  const changeCurDate = useCallback((calendarApi) => {
    if (!calendarApi) return;
    const currentData = calendarApi.getDate();
    dispatch(setCurrentDate(currentData));
  }, []);

  return (
    <div className="calendar-header">
      <div className="left-menu flexcenter">
        <ChangeView changeCurDate={changeCurDate} />
      </div>
      <div className="center-menu relative">
        <Buttons changeCurDate={changeCurDate} />
      </div>
      <div className="right-menu relative flexcenter">
        <div className="wrap-action relative">Right</div>
      </div>
    </div>
  );
};

export default Toolbar;
