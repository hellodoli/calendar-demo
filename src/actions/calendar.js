export const CALENDAR_SET_CURRENT_DATE = "CALENDAR_SET_CURRENT_DATE";
export const setCurrentDate = (payload) => ({
  type: CALENDAR_SET_CURRENT_DATE,
  payload,
});

export const CALENDAR_ADD_FULLCALENDAR_API = "CALENDAR_ADD_FULLCALENDAR_API";
export const addFullCalendarApi = (payload) => ({
  type: CALENDAR_ADD_FULLCALENDAR_API,
  payload,
});

export const CALENDAR_TOGGLE_SHOW_WEEKENDS = "CALENDAR_TOGGLE_SHOW_WEEKENDS";
export const toggleShowWeekends = () => ({
  type: CALENDAR_TOGGLE_SHOW_WEEKENDS,
});

export const CHANGE_CALENDAR_RANGE = "CHANGE_CALENDAR_RANGE";
export const changeCalendarRange = (payload) => ({
  type: CHANGE_CALENDAR_RANGE,
  payload,
});

export const CALENDAR_ADD_WORK_ITEM = "CALENDAR_ADD_WORK_ITEM";
export const addWorkItem = (payload) => ({
  type: CALENDAR_ADD_WORK_ITEM,
  payload,
});

export const CALENDAR_REMOVE_WORK_ITEM = "CALENDAR_REMOVE_WORK_ITEM";
export const removeWorkItem = (payload) => ({
  type: CALENDAR_REMOVE_WORK_ITEM,
  payload,
});

export const TOOLBAR_CHANGE_VIEW = "TOOLBAR_CHANGE_VIEW";
