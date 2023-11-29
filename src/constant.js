export const CALENDAR_VIEW_WEEK = {
  type: "timeGridWeek",
  title: "Week",
  label: "week",
};

export const CALENDAR_VIEW_2_WEEKS = {
  type: "timeGridTwoWeek",
  title: "2 Weeks",
  label: "2 week",
  isCustom: true,
  views: {
    type: "timeGrid",
    duration: { weeks: 2 },
  },
};

export const CALENDAR_VIEW_3_WEEKS = {
  type: "timeGridThreeWeek",
  title: "3 Weeks",
  label: "3 week",
  isCustom: true,
  views: {
    type: "timeGrid",
    duration: { weeks: 3 },
  },
};

export const CALENDAR_VIEW_4_WEEKS = {
  type: "timeGridFourWeek",
  title: "4 Weeks",
  label: "4 week",
  isCustom: true,
  views: {
    type: "timeGrid",
    duration: { weeks: 4 },
  },
};

export const CALENDAR_VIEW_3_DAYS = {
  type: "timeGrid3Days",
  title: "3 Days Rolling",
  label: "3 day",
  isCustom: true,
  views: {
    type: "timeGrid",
    duration: { days: 3 },
  },
};

export const CALENDAR_VIEW_4_DAYS = {
  type: "timeGrid4Days",
  title: "4 Days Rolling",
  label: "4 day",
  isCustom: true,
  views: {
    type: "timeGrid",
    duration: { days: 4 },
  },
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
  CALENDAR_VIEW_2_WEEKS,
  CALENDAR_VIEW_3_WEEKS,
  CALENDAR_VIEW_4_WEEKS,
  CALENDAR_VIEW_3_DAYS,
  CALENDAR_VIEW_4_DAYS,
  CALENDAR_VIEW_MONTH,
];

export const DEFAULT_CALENDAR_VIEW = CALENDAR_VIEW_WEEK;
export const CALENDAR_CUSTOM_VIEWS = {
  [CALENDAR_VIEW_2_WEEKS.type]: { ...CALENDAR_VIEW_2_WEEKS.views },
  [CALENDAR_VIEW_3_WEEKS.type]: { ...CALENDAR_VIEW_3_WEEKS.views },
  [CALENDAR_VIEW_4_WEEKS.type]: { ...CALENDAR_VIEW_4_WEEKS.views },
  [CALENDAR_VIEW_3_DAYS.type]: { ...CALENDAR_VIEW_3_DAYS.views },
  [CALENDAR_VIEW_4_DAYS.type]: { ...CALENDAR_VIEW_4_DAYS.views },
};
