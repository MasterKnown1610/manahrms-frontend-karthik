import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Avatar, Tabs, Button, Input, Card, Tag, Timeline, Space } from 'antd';
import {
  MdArrowBack,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdWork,
  MdAttachFile,
  MdDownload,
  MdDelete,
  MdAdd,
  MdEdit,
} from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import employeesData from '../../data/employeesData.json';
import './EmployeeProfile.scss';

const { TabPane } = Tabs;
const { TextArea } = Input;

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('experiences');
  const [noteText, setNoteText] = useState('');

  const employee = useMemo(() => {
    return employeesData.find((emp) => emp.id === parseInt(id));
  }, [id]);

  if (!employee) {
    return (
      <div className="employee-profile">
        <div className="employee-profile__not-found">
          <h2>Employee not found</h2>
          <Button onClick={() => navigate('/employee')}>Back to Employee List</Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const calculateYears = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    }
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
  };

  const pastExperiences = employee.experiences?.filter((exp) => exp.isCurrent === false) || [];
  const currentExperience = employee.experiences?.find((exp) => exp.isCurrent === true);

  return (
    <div className="employee-profile">
      <Button
        type="text"
        icon={<MdArrowBack />}
        onClick={() => navigate('/employee')}
        className="employee-profile__back-btn"
      >
        Back
      </Button>

      <div className="employee-profile__container">
        {/* Left Column - Main Content */}
        <div className="employee-profile__main">
          {/* Profile Overview Card */}
          <Card className="employee-profile__overview-card">
            <div className="employee-profile__header">
              <Avatar src={employee.avatar} size={120} className="employee-profile__avatar" />
              <div className="employee-profile__header-info">
                <h1 className="employee-profile__name">{employee.name}</h1>
                <p className="employee-profile__email">{employee.email}</p>
                <div className="employee-profile__summary">
                  <div className="employee-profile__summary-item">
                    <span className="employee-profile__summary-label">Past</span>
                    <span className="employee-profile__summary-value">
                      {pastExperiences.length} Companies
                    </span>
                  </div>
                  <div className="employee-profile__summary-item">
                    <span className="employee-profile__summary-label">Current</span>
                    <span className="employee-profile__summary-value">
                      {currentExperience ? '1 Company' : 'N/A'}
                    </span>
                  </div>
                </div>
                <Button
                  type="primary"
                  className="employee-profile__message-btn"
                  style={{
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </Card>

          {/* Personal Information Card */}
          <Card className="employee-profile__info-card">
            <h3 className="employee-profile__card-title">Personal Information</h3>
            <div className="employee-profile__info-grid">
              <div className="employee-profile__info-column">
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Gender</span>
                  <span className="employee-profile__info-value">
                    {employee.gender || 'N/A'}
                  </span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Street Address</span>
                  <span className="employee-profile__info-value">
                    {employee.address?.street || 'N/A'}
                  </span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Member Status</span>
                  <Tag
                    color={employee.status === 'Active' ? theme.colors.success : theme.colors.error}
                  >
                    {employee.status}
                  </Tag>
                </div>
              </div>
              <div className="employee-profile__info-column">
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Birthday</span>
                  <span className="employee-profile__info-value">
                    {formatDate(employee.birthday)}
                  </span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Phone Number</span>
                  <span className="employee-profile__info-value">{employee.phone || 'N/A'}</span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">City</span>
                  <span className="employee-profile__info-value">
                    {employee.address?.city || 'N/A'}
                  </span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">ZIP Code</span>
                  <span className="employee-profile__info-value">
                    {employee.address?.zipCode || 'N/A'}
                  </span>
                </div>
                <div className="employee-profile__info-item">
                  <span className="employee-profile__info-label">Registered Date</span>
                  <span className="employee-profile__info-value">{formatDate(employee.joinDate)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Experiences/Payroll/Payslips Card */}
          <Card className="employee-profile__content-card">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              className="employee-profile__tabs"
            >
              <TabPane tab="Previous Experiences" key="experiences">
                {currentExperience && (
                  <div className="employee-profile__current-experience">
                    <div className="employee-profile__experience-header">
                      <h4 className="employee-profile__experience-title">
                        {currentExperience.jobTitle || employee.role}
                      </h4>
                      <Button
                        type="text"
                        icon={<MdEdit />}
                        className="employee-profile__show-previous-btn"
                      >
                        Show Previous Experience
                      </Button>
                    </div>
                  </div>
                )}

                <Timeline
                  items={
                    employee.experiences
                      ?.sort((a, b) => {
                        const dateA = new Date(a.startDate);
                        const dateB = new Date(b.startDate);
                        return dateB - dateA;
                      })
                      .map((exp, index) => ({
                        color: exp.isCurrent ? '#52c41a' : '#1890ff',
                        children: (
                          <div className="employee-profile__timeline-item">
                            <div className="employee-profile__timeline-date">
                              {formatDate(exp.startDate)} -{' '}
                              {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                            </div>
                            <div className="employee-profile__timeline-time">
                              {calculateYears(exp.startDate, exp.endDate)}
                            </div>
                            <div className="employee-profile__timeline-title">
                              {exp.jobTitle || employee.role}
                            </div>
                            <div className="employee-profile__timeline-company">
                              {exp.companyName}
                            </div>
                            <div className="employee-profile__timeline-manager">
                              Manager: {exp.manager || 'N/A'}
                            </div>
                            {exp.description && (
                              <div className="employee-profile__timeline-description">
                                {exp.description}
                              </div>
                            )}
                          </div>
                        ),
                      })) || []
                  }
                />
              </TabPane>

              <TabPane tab="Payroll" key="payroll">
                <div className="employee-profile__payroll-section">
                  {employee.payroll?.map((pay, index) => (
                    <Card key={index} className="employee-profile__payroll-card">
                      <div className="employee-profile__payroll-header">
                        <h4>{pay.companyName}</h4>
                        <Tag color={pay.isCurrent ? theme.colors.success : 'default'}>
                          {pay.isCurrent ? 'Current' : 'Previous'}
                        </Tag>
                      </div>
                      <div className="employee-profile__payroll-info">
                        <div className="employee-profile__payroll-item">
                          <span className="employee-profile__payroll-label">Basic Salary</span>
                          <span className="employee-profile__payroll-value">
                            ${pay.basicSalary?.toLocaleString() || 'N/A'}
                          </span>
                        </div>
                        <div className="employee-profile__payroll-item">
                          <span className="employee-profile__payroll-label">Allowances</span>
                          <span className="employee-profile__payroll-value">
                            ${pay.allowances?.toLocaleString() || 'N/A'}
                          </span>
                        </div>
                        <div className="employee-profile__payroll-item">
                          <span className="employee-profile__payroll-label">Deductions</span>
                          <span className="employee-profile__payroll-value">
                            ${pay.deductions?.toLocaleString() || 'N/A'}
                          </span>
                        </div>
                        <div className="employee-profile__payroll-item">
                          <span className="employee-profile__payroll-label">Net Salary</span>
                          <span className="employee-profile__payroll-value employee-profile__payroll-value--net">
                            ${pay.netSalary?.toLocaleString() || 'N/A'}
                          </span>
                        </div>
                        <div className="employee-profile__payroll-item">
                          <span className="employee-profile__payroll-label">Payment Date</span>
                          <span className="employee-profile__payroll-value">
                            {pay.paymentDate || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  )) || (
                    <div className="employee-profile__empty-state">No payroll information available</div>
                  )}
                </div>
              </TabPane>

              <TabPane tab="Payslips" key="payslips">
                <div className="employee-profile__payslips-section">
                  {employee.payslips?.map((payslip, index) => (
                    <Card key={index} className="employee-profile__payslip-card">
                      <div className="employee-profile__payslip-header">
                        <div className="employee-profile__payslip-info">
                          <MdAttachFile className="employee-profile__payslip-icon" />
                          <div>
                            <div className="employee-profile__payslip-name">{payslip.name}</div>
                            <div className="employee-profile__payslip-size">{payslip.size}</div>
                          </div>
                        </div>
                        <Space>
                          <Button
                            type="text"
                            icon={<MdDownload />}
                            onClick={() => console.log('Download', payslip.name)}
                          >
                            Download
                          </Button>
                          <Button
                            type="text"
                            danger
                            icon={<MdDelete />}
                            onClick={() => console.log('Delete', payslip.name)}
                          />
                        </Space>
                      </div>
                    </Card>
                  )) || (
                    <div className="employee-profile__empty-state">No payslips available</div>
                  )}
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="employee-profile__sidebar">
          {/* Notes Card */}
          <Card className="employee-profile__notes-card">
            <div className="employee-profile__card-header">
              <h3 className="employee-profile__card-title">Notes</h3>
              <Button type="link" className="employee-profile__see-all-link">
                See all
              </Button>
            </div>
            <TextArea
              rows={6}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a note about this employee..."
              className="employee-profile__note-input"
            />
            <Button
              type="primary"
              className="employee-profile__save-note-btn"
              style={{
                backgroundColor: theme.colors.primary,
                borderColor: theme.colors.primary,
              }}
            >
              Save Note
            </Button>

            {employee.notes?.length > 0 && (
              <div className="employee-profile__previous-notes">
                {employee.notes.slice(0, 1).map((note, index) => (
                  <div key={index} className="employee-profile__note-item">
                    <div className="employee-profile__note-text">{note.text}</div>
                    <div className="employee-profile__note-footer">
                      <span className="employee-profile__note-author">
                        & {note.author}
                      </span>
                      <span className="employee-profile__note-date">{note.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Files/Documents Card */}
          <Card className="employee-profile__files-card">
            <div className="employee-profile__card-header">
              <h3 className="employee-profile__card-title">Files/Documents</h3>
              <Button
                type="primary"
                icon={<MdAdd />}
                size="small"
                style={{
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.primary,
                }}
              >
                Add Files
              </Button>
            </div>
            <div className="employee-profile__files-list">
              {employee.documents?.map((doc, index) => (
                <div key={index} className="employee-profile__file-item">
                  <MdAttachFile className="employee-profile__file-icon" />
                  <div className="employee-profile__file-info">
                    <div className="employee-profile__file-name">{doc.name}</div>
                    <div className="employee-profile__file-size">{doc.size}</div>
                  </div>
                  <Space className="employee-profile__file-actions">
                    <Button
                      type="text"
                      icon={<MdDownload />}
                      size="small"
                      onClick={() => console.log('Download', doc.name)}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<MdDelete />}
                      size="small"
                      onClick={() => console.log('Delete', doc.name)}
                    />
                  </Space>
                </div>
              )) || (
                <div className="employee-profile__empty-state">No documents available</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;

