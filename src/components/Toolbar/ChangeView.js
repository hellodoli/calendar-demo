import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CALENDAR_VIEW } from "constant";
import { selectTitleView } from "selector/toolbar";
import { selectCalendarApi, selectCalendarWeekends } from "selector/calendar";
import { toggleShowWeekends } from "actions/calendar";

const ViewSelectItem = ({ view, onChangeView }) => {
  return (
    <li onClick={() => onChangeView(view)}>
      <div className="items">{view.title}</div>
    </li>
  );
};

const TitleView = () => {
  const titleView = useSelector(selectTitleView);
  return <p className="txt-ellipsis">{titleView}</p>;
};

const ToggleWeekends = () => {
  const dispatch = useDispatch();
  const weekends = useSelector(selectCalendarWeekends);
  const onChange = () => {
    dispatch(toggleShowWeekends());
  };
  return (
    <div className="has-toggle">
      <div className="items">
        <div className="switch large mr-2">
          <input
            id="toggle_show_weekends"
            className="toggle toggle-round"
            type="checkbox"
            checked={weekends}
            onChange={onChange}
          />
          <label htmlFor="toggle_show_weekends">
            <span className="label">Show weekends</span>
          </label>
        </div>
      </div>
    </div>
  );
};

const ChangeView = ({ changeCurDate }) => {
  const dispatch = useDispatch();
  const calendarApi = useSelector(selectCalendarApi);
  const [isShow, setIsShow] = useState(false);

  const onChangeView = useCallback(
    (newView) => {
      setIsShow(false);
      if (!calendarApi) return;
      const viewApi = calendarApi.view;
      const currentViewType = viewApi.type;
      if (currentViewType !== newView.type) {
        // validate change calendar view
        calendarApi.changeView(newView.type);
        dispatch({
          type: "TOOLBAR_CHANGE_VIEW",
          payload: { view: newView },
        });
        // change current date
        changeCurDate(calendarApi);
      }
    },
    [calendarApi, changeCurDate]
  );

  return (
    <div
      className={`v2-dropdown list-agenda ${isShow ? "active" : ""}`}
      onClick={() => setIsShow(!isShow)}
    >
      <div className="dropbtn btn-agenda v2-btn-default --icon-r mr-0">
        <TitleView />
        <span className="arrow"></span>
      </div>
      <div id="show_list_mode_agenda" className="v2-dropdown__menu">
        <ul>
          {CALENDAR_VIEW.map((view) => {
            return (
              <ViewSelectItem
                key={view.type}
                view={view}
                onChangeView={onChangeView}
              />
            );
          })}
          <ToggleWeekends />
        </ul>
      </div>
    </div>
  );
};

export default ChangeView;
