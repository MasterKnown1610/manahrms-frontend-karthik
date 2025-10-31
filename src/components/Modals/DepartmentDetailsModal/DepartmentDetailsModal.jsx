import { Modal, Avatar, Tag, Row, Col, Card, Statistic, Table } from 'antd';
import { MdPeople, MdGroups, MdBusiness, MdEmail, MdPhone } from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import './DepartmentDetailsModal.scss';

const DepartmentDetailsModal = ({ open, onClose, department, employeesData }) => {
  const { theme } = useTheme();

  if (!department) return null;

  // Prepare table columns for employees
  const employeeColumns = [
    {
      title: 'Employee',
      key: 'employee',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar src={record.avatar} size={40} />
          <div>
            <div style={{ fontWeight: 600, color: theme.colors.text.primary }}>
              {record.name}
            </div>
            <div style={{ fontSize: '12px', color: theme.colors.text.secondary }}>
              {record.role}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MdEmail style={{ color: theme.colors.text.secondary }} />
          <span>{email}</span>
        </div>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <MdPhone style={{ color: theme.colors.text.secondary }} />
          <span>{phone}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
      render: (manager) => manager || '-',
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      className="department-details-modal"
      styles={{
        content: {
          backgroundColor: theme.colors.white,
        },
      }}
    >
      <div className="department-details-modal__content">
        <div className="department-details-modal__header">
          <div className="department-details-modal__header-left">
            <div
              className="department-details-modal__icon"
              style={{ backgroundColor: theme.colors.primary + '20' }}
            >
              <MdBusiness style={{ color: theme.colors.primary, fontSize: '32px' }} />
            </div>
            <div>
              <h2 className="department-details-modal__title">{department.name}</h2>
              {department.description && (
                <p className="department-details-modal__description">{department.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="department-details-modal__stats">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Total Employees"
                  value={department.teamSize}
                  prefix={<MdPeople style={{ color: theme.colors.primary }} />}
                  valueStyle={{ color: theme.colors.primary }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Managers"
                  value={department.managers.length}
                  prefix={<MdGroups style={{ color: theme.colors.success }} />}
                  valueStyle={{ color: theme.colors.success }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Team Members"
                  value={department.teamSize - department.managers.length}
                  prefix={<MdPeople style={{ color: theme.colors.info }} />}
                  valueStyle={{ color: theme.colors.info }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Avg Team Size"
                  value={
                    department.managers.length > 0
                      ? ((department.teamSize - department.managers.length) / department.managers.length).toFixed(1)
                      : '0'
                  }
                  prefix={<MdGroups style={{ color: theme.colors.warning }} />}
                  valueStyle={{ color: theme.colors.warning }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {department.managers.length > 0 && (
          <div className="department-details-modal__managers">
            <h3 className="department-details-modal__section-title">Department Managers</h3>
            <Row gutter={[16, 16]}>
              {department.managers.map((manager) => (
                <Col xs={24} sm={12} md={8} key={manager.id}>
                  <Card className="department-details-modal__manager-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Avatar src={manager.avatar} size={48} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '16px', color: theme.colors.text.primary }}>
                          {manager.name}
                        </div>
                        <div style={{ fontSize: '13px', color: theme.colors.text.secondary }}>
                          {manager.role}
                        </div>
                      </div>
                    </div>
                    {manager.directReports > 0 && (
                      <Tag color={theme.colors.primary}>
                        {manager.directReports} direct report{manager.directReports > 1 ? 's' : ''}
                      </Tag>
                    )}
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        <div className="department-details-modal__employees">
          <h3 className="department-details-modal__section-title">
            All Employees ({department.teamSize})
          </h3>
          <Table
            columns={employeeColumns}
            dataSource={department.employees}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} employees`,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default DepartmentDetailsModal;

