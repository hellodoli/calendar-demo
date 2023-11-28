import {
  CALENDAR_SET_CURRENT_DATE,
  TOOLBAR_CHANGE_VIEW,
} from "actions/calendar";
import { CALENDAR_VIEW } from "constant";

const setLocalTimestamp = (date, key) => {
  if (!date) return;
  const unixTime = date.getTime();
  localStorage.setItem(key, JSON.stringify(unixTime));
};

const getLocalTimestamp = (key) => {
  const timestamp = localStorage.getItem(key);
  const unixTime = parseInt(timestamp);
  return !isNaN(unixTime) ? new Date(unixTime) : "";
};

export const setLocalCurrentDate = (currentDate) => {
  setLocalTimestamp(currentDate, CALENDAR_SET_CURRENT_DATE);
};
export const getLocalCurrentDate = () => {
  return getLocalTimestamp(CALENDAR_SET_CURRENT_DATE);
};

export const getLocalCalendarView = () => {
  const viewType = localStorage.getItem(TOOLBAR_CHANGE_VIEW) || "";
  return CALENDAR_VIEW.find((view) => view.type === viewType) || "";
};
export const setLocalCalendarView = (viewType) => {
  localStorage.setItem(TOOLBAR_CHANGE_VIEW, viewType);
};

const CALENDAR_RANGE_START = "CALENDAR_RANGE_START";
export const getLocalRangeStart = () => {
  return getLocalTimestamp(CALENDAR_RANGE_START);
};
export const setLocalRangeStart = (dateStart) => {
  setLocalTimestamp(dateStart, CALENDAR_RANGE_START);
};

const CALENDAR_RANGE_END = "CALENDAR_RANGE_END";
export const getLocalRangeEnd = () => {
  return getLocalTimestamp(CALENDAR_RANGE_END);
};
export const setLocalRangeEnd = (dateEnd) => {
  setLocalTimestamp(dateEnd, CALENDAR_RANGE_END);
};
