export * from "./timepicker";

export const transformEvents = (inputEvents /* */) => {
  const events = inputEvents.map((event) => {
    const infoEvent = event?.event || {};
    return {
      ...event,
      id: infoEvent.id,
      start: infoEvent.start,
      end: infoEvent.end,
      allDay: event.all_day || false,
      title: event.tile?.header || "",
      // colors
      backgroundColor: event.color?.background || "",
      borderColor: event.color?.border || "",
      textColor: event.color?.text || "",
      // extend
      colors: event?.color || event?.colors || {},
    };
  });
  return events;
};

const get12Hour = (hour /* 0 -> 23 */) => {
  let suffixVN = "sa";
  let suffixEN = "am";
  let hour12 = hour % 12;
  if (hour12 === 0) hour12 = 12;
  if (hour >= 12) {
    suffixVN = "ch";
    suffixEN = "pm";
  }
  return {
    hour: hour12,
    suffixVN,
    suffixEN,
  };
};

export const getChangeTileHeader = (str) => {
  console.log({ str });
  const time = str?.split("T")?.[1] || [];
  if (!time?.length) return str;
  const extractTime = time?.split(":");
  const [hour, minute] = extractTime;
  const { hour: hour12, suffixEN } = get12Hour(parseInt(hour));
  const minuteString = parseInt(minute) === 0 ? "" : `:${minute}`;
  return `${hour12}${minuteString}${suffixEN}`;
};
