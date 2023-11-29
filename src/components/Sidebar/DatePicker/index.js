import { useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";

import { displayPickerTitle, getStartEndSelectRange } from "utils/timepicker";
import { selectViewType } from "selector/toolbar";
import {
  selectCalendarApi,
  selectCalendarWeekends,
  selectCalendarCurrentDate,
  selectRangeStart,
  selectRangeEnd,
} from "selector/calendar";
import { setCurrentDate, changeCalendarRange } from "actions/calendar";
import { setLocalRangeStart, setLocalRangeEnd } from "utils/local";

import PrevIcon from "components/Toolbar/Icons/Prev";
import NextIcon from "components/Toolbar/Icons/Next";

const DatePicker = ({ monthsShown = 1 }) => {
  const dispatch = useDispatch();
  const calendarApi = useSelector(selectCalendarApi);
  const viewType = useSelector(selectViewType);
  const weekends = useSelector(selectCalendarWeekends);
  const curDate = useSelector(selectCalendarCurrentDate);
  const startDate = useSelector(selectRangeStart);
  const endDate = useSelector(selectRangeEnd);

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
        dispatch(
          changeCalendarRange({
            start: range.start,
            end: range.end,
          })
        );
      });
    },
    [calendarApi, goToDate]
  );

  const onChange = useCallback(
    (dates) => {
      const [start, end] = dates;
      selectRangePicker(start, end);
    },
    [selectRangePicker]
  );

  const renderCustomHeader = (props) => {
    if (monthsShown === 2) {
      return renderCustomHeader2Months(props);
    }
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

  const renderCustomHeader2Months = (props) => {
    const {
      monthDate,
      decreaseMonth,
      prevMonthButtonDisabled,
      increaseMonth,
      nextMonthButtonDisabled,
      decreaseYear,
      increaseYear,
      prevYearButtonDisabled,
      nextYearButtonDisabled,
      customHeaderCount,
      /*date,
      changeYear,
      changeMonth,*/
    } = props;

    if (customHeaderCount === 1) {
      return (
        <div className="datepicker-header-custom --just-label">
          <p className="label-month">{displayPickerTitle(monthDate, "MMM")}</p>
        </div>
      );
    }

    return (
      <div className="datepicker-header-custom">
        <div className="datepicker-header-custom__option --month">
          <div
            className="btn-navigation --previous v2-btn-default --icon-sm --transparent"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
          >
            <PrevIcon />
          </div>
          <div className="v2-dropdown datepicker-selected">
            <div className="items">{displayPickerTitle(monthDate, "MMM")}</div>
          </div>
          <div
            className="btn-navigation --next v2-btn-default --icon-sm --transparent"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
          >
            <NextIcon />
          </div>
        </div>
        <div className="datepicker-header-custom__option --year">
          <div
            className="btn-navigation --previous v2-btn-default --icon-sm --transparent"
            onClick={decreaseYear}
            disabled={prevYearButtonDisabled}
          >
            <PrevIcon />
          </div>
          <div className="v2-dropdown datepicker-selected">
            <div className="items">{displayPickerTitle(monthDate, "YYYY")}</div>
          </div>
          <div
            className="btn-navigation --next v2-btn-default --icon-sm --transparent"
            onClick={increaseYear}
            disabled={nextYearButtonDisabled}
          >
            <NextIcon />
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
      monthsShown={monthsShown}
      disabledKeyboardNavigation
      selectsRange
      inline
    />
  );
};

export default memo(DatePicker);
