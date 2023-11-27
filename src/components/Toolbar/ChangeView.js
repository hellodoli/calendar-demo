import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CALENDAR_VIEW } from "../../constant";

import { selectTitleView } from "../../selector/toolbar";
import { selectCalendarApi } from "../../selector/calendar";

const ViewSelectItem = ({ view, onChangeView }) => {
  return (
    <li onClick={() => onChangeView(view)}>
      <div className="items">{view.title}</div>
    </li>
  );
};

const ChangeView = () => {
  const dispatch = useDispatch();
  const titleView = useSelector(selectTitleView);
  const calendarApi = useSelector(selectCalendarApi);
  const [isShow, setIsShow] = useState(false);

  const onChangeView = useCallback(
    (newView) => {
      setIsShow(false);
      if (!calendarApi) return;
      const viewApi = calendarApi.view;
      const currentViewType = viewApi.type;
      if (currentViewType !== newView) {
        // validate change calendar view
        calendarApi.changeView(newView.type);
        dispatch({
          type: "TOOLBAR_CHANGE_VIEW",
          payload: { view: newView },
        });
        // change current date ?
      }
    },
    [calendarApi]
  );

  return (
    <div
      className={`v2-dropdown list-agenda ${isShow ? "active" : ""}`}
      onClick={() => setIsShow(!isShow)}
    >
      <div className="dropbtn btn-agenda v2-btn-default --icon-r mr-0">
        <p className="txt-ellipsis">{titleView}</p>
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
        </ul>
      </div>
    </div>
  );
};

export default ChangeView;
