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
