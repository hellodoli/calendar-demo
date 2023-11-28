import { combineReducers } from "redux";
import {
  CALENDAR_SET_CURRENT_DATE,
  CALENDAR_ADD_FULLCALENDAR_API,
  CALENDAR_TOGGLE_SHOW_WEEKENDS,
  TOOLBAR_CHANGE_VIEW,
} from "actions/calendar";
import { getLocalCurrentDate, getLocalCalendarView } from "utils/local";
import { DEFAULT_CALENDAR_VIEW } from "constant";

const initCalendarView = getLocalCalendarView() || DEFAULT_CALENDAR_VIEW;

const toolbarInitialState = {
  view: initCalendarView,
};

const calendarInitialState = {
  calendarApi: null,
  currentDate: getLocalCurrentDate() || new Date(),
  weekends: true,
};

function toolbar(state = toolbarInitialState, action) {
  switch (action.type) {
    case TOOLBAR_CHANGE_VIEW: {
      return {
        ...state,
        view: action.payload.view,
      };
    }
    default:
      return state;
  }
}

function calendar(state = calendarInitialState, action) {
  switch (action.type) {
    case CALENDAR_ADD_FULLCALENDAR_API: {
      const { calendarRef } = action.payload;
      return {
        ...state,
        calendarApi: calendarRef?.current?.getApi() || null,
      };
    }
    case CALENDAR_SET_CURRENT_DATE: {
      const currentDate = action.payload;
      return {
        ...state,
        currentDate,
      };
    }
    case CALENDAR_TOGGLE_SHOW_WEEKENDS: {
      return {
        ...state,
        weekends: !state.weekends,
      };
    }
    default:
      return state;
  }
}

export { initCalendarView };
export default combineReducers({
  calendar,
  toolbar,
});
