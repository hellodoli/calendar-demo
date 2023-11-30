import { combineReducers } from "redux";
import {
  CALENDAR_SET_CURRENT_DATE,
  CALENDAR_ADD_FULLCALENDAR_API,
  CALENDAR_TOGGLE_SHOW_WEEKENDS,
  TOOLBAR_CHANGE_VIEW,
  CHANGE_CALENDAR_RANGE,
  CALENDAR_ADD_WORK_ITEM,
  CALENDAR_REMOVE_WORK_ITEM,
} from "actions/calendar";
import {
  getLocalCurrentDate,
  getLocalCalendarView,
  getLocalRangeStart,
  getLocalRangeEnd,
} from "utils/local";
import { DEFAULT_CALENDAR_VIEW } from "constant";
import { datas_works } from "mock/data";

const initCalendarView = getLocalCalendarView() || DEFAULT_CALENDAR_VIEW;

const toolbarInitialState = {
  view: initCalendarView,
};

const calendarInitialState = {
  calendarApi: null,
  currentDate: getLocalCurrentDate() || new Date(),
  weekends: true,
  rangeStart: getLocalRangeStart() || null,
  rangeEnd: getLocalRangeEnd() || null,
  works: datas_works,
  dragItem: null,
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
    case CHANGE_CALENDAR_RANGE: {
      const { start, end } = action.payload;
      return {
        ...state,
        rangeStart: start,
        rangeEnd: end,
      };
    }

    case CALENDAR_REMOVE_WORK_ITEM: {
      const eventId = action.payload;
      const works = state.works.filter((work) => work.event.id !== eventId);
      return {
        ...state,
        works,
      };
    }
    case CALENDAR_ADD_WORK_ITEM: {
      return {
        ...state,
        works: [...state.works, action.payload],
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
