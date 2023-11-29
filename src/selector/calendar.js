import { createSelector } from "reselect";
import { selectViewType } from "./toolbar";
import { CALENDAR_VIEW_DAY } from "constant";

const calendarSelector = (state) => state.calendar;

export const selectCalendarApi = createSelector(
  calendarSelector,
  (calendar) => calendar.calendarApi
);

export const selectCalendarCurrentDate = createSelector(
  calendarSelector,
  (calendar) => calendar.currentDate
);

export const selectCalendarWeekends = createSelector(
  calendarSelector,
  (calendar) => calendar.weekends
);

export const selectIsShowCalendarWeekends = createSelector(
  selectCalendarWeekends,
  selectViewType,
  (weekends, viewType) => weekends || viewType === CALENDAR_VIEW_DAY.type
);

export const selectRangeStart = createSelector(
  calendarSelector,
  (calendar) => calendar.rangeStart
);

export const selectRangeEnd = createSelector(
  calendarSelector,
  (calendar) => calendar.rangeEnd
);
