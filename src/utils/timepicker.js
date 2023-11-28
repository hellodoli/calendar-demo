import dayjs from "dayjs";
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_WEEK,
  CALENDAR_VIEW_MONTH,
} from "constant";

export const displayPickerTitle = (date, format = "MMMM YYYY") => {
  if (!date) return "";
  return dayjs(date)?.format(format) || "";
};

export const getIsSelectRange = (viewType) => {
  if (viewType === CALENDAR_VIEW_DAY.type) return false;
  if (
    viewType === CALENDAR_VIEW_WEEK.type ||
    viewType === CALENDAR_VIEW_MONTH.type
  )
    return true;
  return false;
};

export const getStartEndSelectRange = (viewApi) => {
  const viewType = viewApi.type;
  let start = viewApi.activeStart;
  let end = viewApi.activeEnd;

  if (viewType === CALENDAR_VIEW_WEEK.type) {
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
