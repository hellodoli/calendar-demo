export const CALENDAR_VIEW_WEEK = {
  type: "timeGridWeek",
  title: "Week",
  label: "week",
};

export const CALENDAR_VIEW_DAY = {
  type: "timeGridDay",
  title: "Day",
  label: "day",
};

export const CALENDAR_VIEW_MONTH = {
  type: "dayGridMonth",
  title: "Month",
  label: "month",
};

export const CALENDAR_VIEW = [
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_WEEK,
  CALENDAR_VIEW_MONTH,
];

export const DEFAULT_CALENDAR_VIEW = CALENDAR_VIEW_WEEK;
