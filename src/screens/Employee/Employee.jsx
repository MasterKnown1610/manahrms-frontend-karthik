import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import EmployeeList from '../../components/Employee/EmployeeList/EmployeeList';
import ManagersView from '../../components/Employee/ManagersView/ManagersView';
import TeamManagement from '../../components/Employee/TeamManagement/TeamManagement';
import DepartmentView from '../../components/Employee/DepartmentView/DepartmentView';
import './Employee.scss';

const { TabPane } = Tabs;

const Employee = () => {
  const { theme } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key !== 'all') {
      setSearchParams({ tab: key });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="employee">
      <div className="employee__content">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="employee__tabs"
          style={{
            '--ant-tabs-item-active-color': theme.colors.primary,
            '--ant-tabs-ink-bar-color': theme.colors.primary,
          }}
        >
          <TabPane tab="All Employees" key="all">
            <EmployeeList />
          </TabPane>
          <TabPane tab="Managers" key="managers">
            <ManagersView />
          </TabPane>
          <TabPane tab="Team Management" key="teams">
            <TeamManagement />
          </TabPane>
          <TabPane tab="Departments" key="departments">
            <DepartmentView />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Employee;

