import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Tree, Select, Button, Space, Avatar, Tag, Empty, Row, Col, Statistic } from 'antd';
import { MdPeople, MdGroup, MdPerson, MdArrowForward, MdAccountTree } from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import employeesData from '../../../data/employeesData.json';
import './TeamManagement.scss';

const { Option } = Select;

const TeamManagement = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Build hierarchy from employee data
  const buildHierarchy = useMemo(() => {
    const employeesMap = new Map(employeesData.map((emp) => [emp.id, emp]));
    const root = employeesData.find((emp) => !emp.managerId);

    const buildNode = (employee) => {
      const children = employeesData.filter((emp) => emp.managerId === employee.id);
      const node = {
        title: (
          <div className="team-management__tree-node">
            <Avatar size={employee.isManager ? 28 : 24} src={employee.avatar}>
              {employee.name.split(' ').map((n) => n[0]).join('')}
            </Avatar>
            <div className="team-management__node-info">
              <span className="team-management__node-name">{employee.name}</span>
              <Tag 
                color={
                  employee.isManager 
                    ? employee.department === 'Engineering' ? 'blue' 
                      : employee.department === 'Product' ? 'green'
                      : 'orange'
                    : 'default'
                }
                style={{ marginLeft: '8px' }}
              >
                {employee.role}
              </Tag>
            </div>
          </div>
        ),
        key: employee.id.toString(),
        children: children.length > 0 ? children.map(buildNode) : undefined,
      };
      return node;
    };

    return root ? [buildNode(root)] : [];
  }, []);

  // Calculate team statistics
  const teamStats = useMemo(() => {
    const managers = employeesData.filter((emp) => emp.isManager);
    const totalMembers = employeesData.length;
    const totalManagers = managers.length;
    const departments = [...new Set(employeesData.map((emp) => emp.department))];

    return {
      totalTeams: departments.length,
      managers: totalManagers,
      teamMembers: totalMembers - totalManagers,
      avgTeamSize: (totalMembers / departments.length).toFixed(1),
    };
  }, []);

  // Get department teams
  const departmentTeams = useMemo(() => {
    const departments = [...new Set(employeesData.map((emp) => emp.department))];
    return departments.map((dept) => {
      const deptEmployees = employeesData.filter((emp) => emp.department === dept);
      const managers = deptEmployees.filter((emp) => emp.isManager);
      const manager = managers[0] || deptEmployees[0];

      return {
        department: dept,
        manager: manager,
        teamSize: deptEmployees.length,
        employees: deptEmployees,
      };
    });
  }, []);

  const filteredTeams = selectedDepartment === 'all' 
    ? departmentTeams 
    : departmentTeams.filter((team) => team.department === selectedDepartment);

  const departments = [...new Set(employeesData.map((emp) => emp.department))];

  return (
    <div className="team-management">
      <div className="team-management__header">
        <div className="team-management__filters">
          <Select
            value={selectedDepartment}
            onChange={setSelectedDepartment}
            style={{ width: 200 }}
            size="large"
          >
            <Option value="all">All Departments</Option>
            {departments.map((dept) => (
              <Option key={dept} value={dept}>
                {dept}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            }}
          >
            Manage Teams
          </Button>
        </div>
      </div>

      <div className="team-management__stats">
        <Card className="team-management__stat-card">
          <div className="team-management__stat-content">
            <div className="team-management__stat-icon" style={{ backgroundColor: theme.colors.primary + '20' }}>
              <MdGroup style={{ color: theme.colors.primary, fontSize: '24px' }} />
            </div>
            <div className="team-management__stat-info">
              <div className="team-management__stat-value" style={{ color: theme.colors.primary }}>
                {teamStats.totalTeams}
              </div>
              <div className="team-management__stat-label">Total Teams</div>
            </div>
          </div>
        </Card>
        <Card className="team-management__stat-card">
          <div className="team-management__stat-content">
            <div className="team-management__stat-icon" style={{ backgroundColor: theme.colors.success + '20' }}>
              <MdPeople style={{ color: theme.colors.success, fontSize: '24px' }} />
            </div>
            <div className="team-management__stat-info">
              <div className="team-management__stat-value" style={{ color: theme.colors.success }}>
                {teamStats.managers}
              </div>
              <div className="team-management__stat-label">Managers</div>
            </div>
          </div>
        </Card>
        <Card className="team-management__stat-card">
          <div className="team-management__stat-content">
            <div className="team-management__stat-icon" style={{ backgroundColor: theme.colors.info + '20' }}>
              <MdPerson style={{ color: theme.colors.info, fontSize: '24px' }} />
            </div>
            <div className="team-management__stat-info">
              <div className="team-management__stat-value" style={{ color: theme.colors.info }}>
                {teamStats.teamMembers}
              </div>
              <div className="team-management__stat-label">Team Members</div>
            </div>
          </div>
        </Card>
        <Card className="team-management__stat-card">
          <div className="team-management__stat-content">
            <div className="team-management__stat-icon" style={{ backgroundColor: theme.colors.warning + '20' }}>
              <MdAccountTree style={{ color: theme.colors.warning, fontSize: '24px' }} />
            </div>
            <div className="team-management__stat-info">
              <div className="team-management__stat-value" style={{ color: theme.colors.warning }}>
                {teamStats.avgTeamSize}
              </div>
              <div className="team-management__stat-label">Avg Team Size</div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="team-management__hierarchy">
        <div className="team-management__hierarchy-header">
          <h3 className="team-management__hierarchy-title">Organizational Hierarchy</h3>
          <Button 
            type="text" 
            icon={<MdArrowForward />}
            onClick={() => navigate('/organization-chart')}
          >
            View Full Chart
          </Button>
        </div>
        <div className="team-management__tree-container">
          <Tree
            showLine
            defaultExpandAll
            treeData={buildHierarchy}
            className="team-management__tree"
          />
        </div>
      </Card>

      <div className="team-management__team-details">
        <Row gutter={[16, 16]}>
          {filteredTeams.map((team) => (
            <Col xs={24} md={12} lg={8} key={team.department}>
              <Card title={team.department} className="team-management__team-card">
                <div className="team-management__team-info">
                  <div className="team-management__team-lead">
                    <Avatar src={team.manager.avatar} size={40} />
                    <div>
                      <div className="team-management__team-lead-name">{team.manager.name}</div>
                      <div className="team-management__team-lead-role">{team.manager.role}</div>
                    </div>
                  </div>
                  <div className="team-management__team-members-count">
                    <MdPeople style={{ marginRight: '4px' }} />
                    {team.teamSize} {team.teamSize === 1 ? 'Member' : 'Members'}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TeamManagement;
