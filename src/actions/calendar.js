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

export const TOOLBAR_CHANGE_VIEW = "TOOLBAR_CHANGE_VIEW";
