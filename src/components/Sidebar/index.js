import DatePicker from "./DatePicker";
import Work from "./Work";

const Sidebar = () => {
  return (
    <div
      id="calendar_sidebar"
      className="calendar-sidebar is-show-minicalendar"
    >
      <div className="monthly-calendar">
        <DatePicker />
      </div>
      <div className="sidebar-details">
        <div className="switch-maintab tabs accessible-tabs-container">
          <div className="tab-selectors header-action">Header action</div>
          <div className="tab-contents">
            <div
              id="external-events-list"
              className="tab-conts detail-workpool detail-joblist tab-content-active"
            >
              <div className="scrolls flex-column">
                <Work />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
