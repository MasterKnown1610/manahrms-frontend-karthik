import { useState } from 'react';
import { Card, Row, Col, Statistic, Tag, Avatar, Button, Select } from 'antd';
import { MdPeople, MdGroups, MdBusiness, MdTrendingUp, MdAdd } from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import AddDepartmentModal from '../../Modals/AddDepartmentModal/AddDepartmentModal';
import DepartmentDetailsModal from '../../Modals/DepartmentDetailsModal/DepartmentDetailsModal';
import employeesData from '../../../data/employeesData.json';
import './DepartmentView.scss';

const { Option } = Select;

const DepartmentView = () => {
  const { theme } = useTheme();
  const [selectedDept, setSelectedDept] = useState('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [expandedDepartments, setExpandedDepartments] = useState(new Set());
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  // Calculate department statistics
  const departments = employeesData.reduce((acc, emp) => {
    const dept = emp.department;
    if (!acc[dept]) {
      acc[dept] = {
        name: dept,
        employees: [],
        managers: [],
        teamSize: 0,
      };
    }
    acc[dept].employees.push(emp);
    if (emp.isManager) {
      acc[dept].managers.push(emp);
    }
    return acc;
  }, {});

  // Merge with manually added departments
  departmentsList.forEach((dept) => {
    if (!departments[dept.name]) {
      departments[dept.name] = {
        name: dept.name,
        description: dept.description,
        employees: [],
        managers: [],
        teamSize: 0,
      };
    }
  });

  // Calculate team sizes for each department
  Object.keys(departments).forEach((deptName) => {
    const dept = departments[deptName];
    dept.teamSize = dept.employees.length;
    
    // Calculate direct reports for each manager
    dept.managers.forEach((manager) => {
      manager.directReports = dept.employees.filter(
        (emp) => emp.managerId === manager.id
      ).length;
    });
  });

  const allDepartments = Object.values(departments);
  
  const filteredDepartments = selectedDept === 'all' 
    ? allDepartments 
    : allDepartments.filter((dept) => dept.name === selectedDept);

  const handleAddDepartment = (departmentData) => {
    const newDepartment = {
      ...departmentData,
      id: Date.now().toString(),
    };
    setDepartmentsList([...departmentsList, newDepartment]);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
  };

  const toggleManagersView = (deptName) => {
    setExpandedDepartments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(deptName)) {
        newSet.delete(deptName);
      } else {
        newSet.add(deptName);
      }
      return newSet;
    });
  };

  const handleViewDepartmentDetails = (dept) => {
    setSelectedDepartment(dept);
    setDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="department-view">
      <div className="department-view__header">
        <div className="department-view__title-section">
          <MdBusiness style={{ fontSize: '24px', color: theme.colors.primary, marginRight: '12px' }} />
          <h2 className="department-view__title">Departments Overview</h2>
        </div>
        <div className="department-view__header-actions">
          <Select
            value={selectedDept}
            onChange={setSelectedDept}
            style={{ width: 200 }}
            size="large"
          >
            <Option value="all">All Departments</Option>
            {allDepartments.map((dept) => (
              <Option key={dept.name} value={dept.name}>
                {dept.name}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<MdAdd />}
            size="large"
            onClick={() => setAddModalOpen(true)}
            style={{
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            }}
          >
            Add Department
          </Button>
        </div>
      </div>

      <div className="department-view__stats">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Departments"
                value={allDepartments.length}
                prefix={<MdBusiness style={{ color: theme.colors.primary }} />}
                valueStyle={{ color: theme.colors.primary }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Employees"
                value={employeesData.length}
                prefix={<MdPeople style={{ color: theme.colors.success }} />}
                valueStyle={{ color: theme.colors.success }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Managers"
                value={employeesData.filter((emp) => emp.isManager).length}
                prefix={<MdGroups style={{ color: theme.colors.info }} />}
                valueStyle={{ color: theme.colors.info }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Avg Team Size"
                value={allDepartments.length > 0 ? (employeesData.length / allDepartments.length).toFixed(1) : '0'}
                prefix={<MdTrendingUp style={{ color: theme.colors.warning }} />}
                valueStyle={{ color: theme.colors.warning }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="department-view__departments">
        <Row gutter={[16, 16]}>
          {filteredDepartments.map((dept) => (
            <Col xs={24} sm={12} lg={8} key={dept.name}>
              <Card className="department-view__dept-card">
                <div className="department-view__dept-header">
                  <div className="department-view__dept-icon" style={{ backgroundColor: theme.colors.primary + '20' }}>
                    <MdBusiness style={{ color: theme.colors.primary, fontSize: '32px' }} />
                  </div>
                  <div className="department-view__dept-info">
                    <h3 className="department-view__dept-name">{dept.name}</h3>
                    <Tag color={theme.colors.primary} style={{ borderRadius: '4px' }}>
                      {dept.teamSize} {dept.teamSize === 1 ? 'Employee' : 'Employees'}
                    </Tag>
                  </div>
                </div>

                <div className="department-view__dept-stats">
                  <div className="department-view__dept-stat">
                    <span className="department-view__stat-label">Managers</span>
                    <span className="department-view__stat-value">{dept.managers.length}</span>
                  </div>
                  <div className="department-view__dept-stat">
                    <span className="department-view__stat-label">Team Members</span>
                    <span className="department-view__stat-value">
                      {dept.teamSize - dept.managers.length}
                    </span>
                  </div>
                </div>

                <div className="department-view__dept-actions">
                  <Button
                    type="link"
                    onClick={() => toggleManagersView(dept.name)}
                    style={{
                      color: theme.colors.primary,
                      padding: 0,
                      fontWeight: 500,
                    }}
                  >
                    {expandedDepartments.has(dept.name) ? 'Hide Managers' : 'View Managers'}
                  </Button>
                </div>

                {expandedDepartments.has(dept.name) && (
                  <div className="department-view__dept-managers">
                    <h4 className="department-view__managers-title">Department Managers</h4>
                    <div className="department-view__managers-list">
                      {dept.managers.length > 0 ? (
                        dept.managers.map((manager) => (
                          <div key={manager.id} className="department-view__manager-item">
                            <Avatar src={manager.avatar} size={32} />
                            <div className="department-view__manager-info">
                              <div className="department-view__manager-name">{manager.name}</div>
                              <div className="department-view__manager-role">{manager.role}</div>
                              {manager.directReports > 0 && (
                                <div className="department-view__manager-reports">
                                  {manager.directReports} direct report{manager.directReports > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="department-view__no-managers">No managers assigned</div>
                      )}
                    </div>
                  </div>
                )}

                <Button
                  type="primary"
                  block
                  onClick={() => handleViewDepartmentDetails(dept)}
                  style={{
                    marginTop: '16px',
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }}
                >
                  View Department Details
                </Button>
          </Card>
        </Col>
      ))}
    </Row>
      </div>

      {/* Add Department Modal */}
      <AddDepartmentModal
        open={addModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddDepartment}
      />

      {/* Department Details Modal */}
      <DepartmentDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetailsModal}
        department={selectedDepartment}
        employeesData={employeesData}
      />
    </div>
  );
};

export default DepartmentView;

