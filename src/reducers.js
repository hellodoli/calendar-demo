import { combineReducers } from "redux";

const toolbarInitialState = {
  view: {
    type: "timeGridWeek",
    title: "Week",
    label: "week",
  },
};

const calendarInitialState = {};

function toolbar(state = toolbarInitialState, action) {
  switch (action.type) {
    case "TOOLBAR_CHANGE_VIEW": {
      console.log(action);
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
    case "ADD_CALENDAR_API": {
      const { calendarRef } = action.payload;
      return {
        ...state,
        calendarApi: calendarRef?.current?.getApi(),
      };
    }
    default:
      return state;
  }
}

export default combineReducers({
  calendar,
  toolbar,
});
