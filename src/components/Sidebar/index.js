import DatePicker from "./DatePicker";

const Sidebar = () => {
  return (
    <div
      id="calendar_sidebar"
      className="calendar-sidebar is-show-minicalendar"
    >
      <div className="monthly-calendar">
        <DatePicker />
      </div>
    </div>
  );
};

export default Sidebar;
