import { useSelector } from "react-redux";
import { selectCalendarApi } from "../../selector/calendar";

import ChangeView from "./ChangeView";

const Toolbar = () => {
  const calendarApi = useSelector(selectCalendarApi);

  const onClick = () => {
    console.log(calendarApi);
  };

  return (
    <div className="calendar-header">
      <div className="left-menu flexcenter">
        <ChangeView />
      </div>
      <div className="center-menu relative">
        <button onClick={onClick}>Click me to show calendarApi</button>
      </div>
      <div className="right-menu relative flexcenter">
        <div className="wrap-action relative">Right</div>
      </div>
    </div>
  );
};

export default Toolbar;
