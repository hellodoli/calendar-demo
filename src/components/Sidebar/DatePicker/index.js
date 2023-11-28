import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";

import { displayPickerTitle, getStartEndSelectRange } from "utils/timepicker";
import { selectViewType } from "selector/toolbar";
import {
  selectCalendarApi,
  selectCalendarWeekends,
  selectCalendarCurrentDate,
} from "selector/calendar";
import { setCurrentDate } from "actions/calendar";
import {
  setLocalRangeStart,
  setLocalRangeEnd,
  getLocalRangeStart,
  getLocalRangeEnd,
} from "utils/local";
import {
  CALENDAR_VIEW_DAY,
  CALENDAR_VIEW_MONTH,
  CALENDAR_VIEW_WEEK,
} from "constant";

import PrevIcon from "components/Toolbar/Icons/Prev";
import NextIcon from "components/Toolbar/Icons/Next";

const DatePicker = () => {
  const dispatch = useDispatch();
  const calendarApi = useSelector(selectCalendarApi);
  const viewType = useSelector(selectViewType);
  const weekends = useSelector(selectCalendarWeekends);
  const curDate = useSelector(selectCalendarCurrentDate);
  const [startDate, setStartDate] = useState(
    () => getLocalRangeStart() || null
  );
  const [endDate, setEndDate] = useState(() => getLocalRangeEnd() || null);

  const goToDate = useCallback(
    (date, cb) => {
      if (!calendarApi) return;
      calendarApi.gotoDate(date);
      dispatch(setCurrentDate(date));
      if (cb) cb(calendarApi.view);
    },
    [calendarApi]
  );

  const selectRangePicker = useCallback(
    (start, end) => {
      if (!calendarApi) return;
      const curDate = start;
      goToDate(curDate, (viewApi) => {
        const range = getStartEndSelectRange(viewApi);
        setStartDate(range.start);
        setEndDate(range.end);
      });
    },
    [calendarApi, goToDate]
  );

  const onChange = useCallback(
    (dates) => {
      const [start, end] = dates;
      switch (viewType) {
        case CALENDAR_VIEW_DAY.type: {
          // maybe do something extra
          selectRangePicker(start, end);
          break;
        }
        case CALENDAR_VIEW_WEEK.type:
        case CALENDAR_VIEW_MONTH.type: {
          selectRangePicker(start, end);
          break;
        }
        default:
          break;
      }
    },
    [selectRangePicker, viewType]
  );

  const renderCustomHeader = (props) => {
    const {
      monthDate,
      decreaseMonth,
      prevMonthButtonDisabled,
      increaseMonth,
      nextMonthButtonDisabled,
      /*date,
      changeYear,
      changeMonth,*/
    } = props;
    return (
      <div className="react-datepicker">
        <div className="react-datepicker__month-container p-0">
          <div className="react-datepicker__header">
            <div className="datepicker-header-custom border-none mx-0">
              <div
                className="btn-navigation --previous v2-btn-default has-bg-grey --icon-lg"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <PrevIcon />
              </div>
              <p>{displayPickerTitle(monthDate)}</p>
              <div
                className="btn-navigation --next v2-btn-default has-bg-grey --icon-lg"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <NextIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLocalRangeStart(startDate);
  }, [startDate]);

  useEffect(() => {
    setLocalRangeEnd(endDate);
  }, [endDate]);

  useEffect(() => {
    if (curDate) selectRangePicker(curDate);
  }, [weekends, selectRangePicker, curDate, viewType]);

  return (
    <ReactDatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      renderCustomHeader={renderCustomHeader}
      disabledKeyboardNavigation
      selectsRange
      inline
    />
  );
};

export default DatePicker;
