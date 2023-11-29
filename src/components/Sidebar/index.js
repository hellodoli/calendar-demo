import { datas_works } from "mock/data";
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
                <div
                  id="external-events-work-pool"
                  className="external-events-list-job list-workpool details-jobslist"
                >
                  {/*<div
                    id="work_pool_job_move"
                    class="fc-event jobslist active-joblist completed has-drag"
                    style={{ display: "none" }}
                  ></div>*/}
                  {/* */}
                  {datas_works.map((work) => {
                    return <Work key={work.event?.id} work={work} />;
                  })}
                  <div className="fc-event jobslist active-joblist">Dmm</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
