import { createSelector } from "reselect";

const calendarSelector = (state) => state.calendar;

export const selectCalendarApi = createSelector(
  calendarSelector,
  (calendar) => calendar.calendarApi
);
