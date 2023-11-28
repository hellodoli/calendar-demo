import { useEffect } from "react";
import { useSelector } from "react-redux";

import { selectCalendarCurrentDate } from "selector/calendar";
import { selectViewType } from "selector/toolbar";
import { setLocalCurrentDate, setLocalCalendarView } from "utils/local";

const Watcher = () => {
  const curDate = useSelector(selectCalendarCurrentDate);
  const viewType = useSelector(selectViewType);

  useEffect(() => {
    setLocalCurrentDate(curDate);
  }, [curDate]);

  useEffect(() => {
    setLocalCalendarView(viewType);
  }, [viewType]);

  return null;
};

export default Watcher;
