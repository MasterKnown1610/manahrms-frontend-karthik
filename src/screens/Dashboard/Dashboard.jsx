import TopNavButtons from "../../components/Dashboard/TopNavButtons/TopNavButtons";
import PromotionCard from "../../components/Dashboard/PromotionCard/PromotionCard";
import SummaryCard from "../../components/Dashboard/SummaryCard/SummaryCard";
import JobAppliedChart from "../../components/Dashboard/JobAppliedChart/JobAppliedChart";
import ProjectOverview from "../../components/Dashboard/ProjectOverview/ProjectOverview";
import PerformanceTable from "../../components/Dashboard/PerformanceTable/PerformanceTable";
import EmployeesChart from "../../components/Dashboard/EmployeesChart/EmployeesChart";
import GrowthChart from "../../components/Dashboard/GrowthChart/GrowthChart";
import AttendanceSummary from "../../components/Dashboard/AttendanceSummary/AttendanceSummary";
import LeaveRequests from "../../components/Dashboard/LeaveRequests/LeaveRequests";
import HRMSUpdates from "../../components/Dashboard/HRMSUpdates/HRMSUpdates";
import { MdPeople, MdCake, MdExitToApp, MdWork } from "react-icons/md";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__content">
        {/* Four Data Cards Row - At Top */}
        <div className="dashboard__row dashboard__row--data-cards">
          <SummaryCard title="Total Employee" value="400" icon={MdPeople} />
          <SummaryCard title="New Joined" value="150" icon={MdCake} />
          <SummaryCard title="Resigned" value="30" icon={MdExitToApp} />
          <SummaryCard title="Active Projects" value="50" icon={MdWork} />
        </div>

        {/* Main Content Row */}
        <div className="dashboard__row dashboard__row--quicklinks">
          <div className="dashboard__left-section">
            {/* Two Graphs Row */}
            <div className="dashboard__row dashboard__row--graphs">
              <div className="dashboard__graph-card">
                <JobAppliedChart />
              </div>
              <div className="dashboard__graph-card">
                <GrowthChart />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="dashboard__bottom-section card">
              <PerformanceTable />
            </div>

            {/* Top Navigation Buttons - Under Performance Table */}
            <TopNavButtons />

            {/* HRMS Updates & Alerts */}
            <HRMSUpdates />
          </div>

          {/* Right Sidebar / Main Content */}
          <div className="dashboard__right-section">
            <LeaveRequests />
            <div className="dashboard__right-content card">
              <ProjectOverview />
              <EmployeesChart />
              <AttendanceSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
