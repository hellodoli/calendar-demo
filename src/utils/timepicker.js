import dayjs from "dayjs";
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_WEEK,
  CALENDAR_VIEW_2_WEEKS,
  CALENDAR_VIEW_3_WEEKS,
  CALENDAR_VIEW_4_WEEKS,
  CALENDAR_VIEW_3_DAYS,
  CALENDAR_VIEW_4_DAYS,
  CALENDAR_VIEW_MONTH,
} from "constant";

export const isWeekView = (viewType) => {
  return (
    viewType === CALENDAR_VIEW_WEEK.type ||
    viewType === CALENDAR_VIEW_2_WEEKS.type ||
    viewType === CALENDAR_VIEW_3_WEEKS.type ||
    viewType === CALENDAR_VIEW_4_WEEKS.type ||
    viewType === CALENDAR_VIEW_3_DAYS.type ||
    viewType === CALENDAR_VIEW_4_DAYS.type
  );
};

export const displayPickerTitle = (date, format = "MMMM YYYY") => {
  if (!date) return "";
  return dayjs(date)?.format(format) || "";
};

export const getIsSelectRange = (viewType) => {
  if (viewType === CALENDAR_VIEW_DAY.type) return false;
  if (isWeekView(viewType) || viewType === CALENDAR_VIEW_MONTH.type)
    return true;
  return false;
};

export const getStartEndSelectRange = (viewApi) => {
  const viewType = viewApi.type;
  let start = viewApi.activeStart;
  let end = viewApi.activeEnd;

  if (isWeekView(viewType)) {
    const exactEnd = dayjs(viewApi.activeEnd).subtract(1, "day"); // end date by subtract 1 day
    end = new Date(exactEnd);
  } else if (viewType === CALENDAR_VIEW_MONTH.type) {
    start = viewApi.currentStart;
    const exactEnd = dayjs(viewApi.currentEnd).subtract(1, "day"); // end date by subtract 1 day
    end = new Date(exactEnd);
  } else {
    end = start; // start = end
  }
  return {
    start,
    end,
  };
};

export const getDiffDateTime = (date1, date2, unix = "day") => {
  const d1 = dayjs(date1);
  const d2 = dayjs(date2);
  return d1.diff(d2, unix);
};
