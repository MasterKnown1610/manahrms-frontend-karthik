import { Card, Avatar, Tag, Space, Statistic, Row, Col } from 'antd';
import { MdPeople, MdGroup, MdTrendingUp, MdWork } from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import employeesData from '../../../data/employeesData.json';
import './ManagersView.scss';

const ManagersView = () => {
  const { theme } = useTheme();

  // Get managers from data
  const managersData = employeesData.filter((emp) => emp.isManager);
  
  // Calculate stats for each manager
  const managers = managersData.map((manager) => {
    const directReports = employeesData.filter((emp) => emp.managerId === manager.id);
    return {
      ...manager,
      teamSize: directReports.length + 1, // +1 for the manager
      directReports: directReports.map((emp) => emp.name),
      projects: Math.floor(Math.random() * 10) + 5, // Sample project count
    };
  });

  return (
    <div className="managers-view">
      <Row gutter={[16, 16]} className="managers-view__stats">
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Managers"
              value={managers.length}
              prefix={<MdPeople style={{ color: theme.colors.primary }} />}
              valueStyle={{ color: theme.colors.primary }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Total Team Members"
              value={managers.reduce((sum, m) => sum + m.teamSize, 0)}
              prefix={<MdGroup style={{ color: theme.colors.success }} />}
              valueStyle={{ color: theme.colors.success }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Active Projects"
              value={managers.reduce((sum, m) => sum + m.projects, 0)}
              prefix={<MdWork style={{ color: theme.colors.info }} />}
              valueStyle={{ color: theme.colors.info }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="Avg Team Size"
              value={(managers.reduce((sum, m) => sum + m.teamSize, 0) / managers.length).toFixed(1)}
              prefix={<MdTrendingUp style={{ color: theme.colors.warning }} />}
              valueStyle={{ color: theme.colors.warning }}
            />
          </Card>
        </Col>
      </Row>

      <div className="managers-view__list">
        {managers.map((manager) => (
          <Card key={manager.id} className="managers-view__card">
            <div className="managers-view__header">
              <div className="managers-view__manager-info">
                <Avatar src={manager.avatar} size={64} />
                <div className="managers-view__manager-details">
                  <h3 className="managers-view__manager-name">{manager.name}</h3>
                  <Tag color={theme.colors.primary} style={{ marginTop: '4px', borderRadius: '4px' }}>
                    {manager.role}
                  </Tag>
                  <p className="managers-view__manager-email">{manager.email}</p>
                </div>
              </div>
              <div className="managers-view__stats-section">
                <div className="managers-view__stat-item">
                  <span className="managers-view__stat-label">Team Size</span>
                  <span className="managers-view__stat-value">{manager.teamSize}</span>
                </div>
                <div className="managers-view__stat-item">
                  <span className="managers-view__stat-label">Projects</span>
                  <span className="managers-view__stat-value">{manager.projects}</span>
                </div>
              </div>
            </div>

            <div className="managers-view__department">
              <Tag color="blue" style={{ borderRadius: '4px' }}>
                {manager.department}
              </Tag>
            </div>

            <div className="managers-view__team-section">
              <h4 className="managers-view__team-title">Direct Reports ({manager.directReports.length})</h4>
              <div className="managers-view__team-members">
                {manager.directReports.map((member, index) => (
                  <Tag key={index} className="managers-view__team-member">
                    {member}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManagersView;

