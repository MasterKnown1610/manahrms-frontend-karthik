import { useTheme } from '../../../contexts/ThemeContext';
import { MdEvent, MdCalendarToday, MdPerson, MdInfo } from 'react-icons/md';
import './LeaveRequests.scss';

const LeaveRequests = () => {
  const { theme } = useTheme();

  // Sample leave requests data - raised today or upcoming
  const leaveRequests = [
    {
      id: 1,
      employeeName: 'John Doe',
      leaveType: 'Sick Leave',
      startDate: '2024-12-20',
      endDate: '2024-12-21',
      days: 2,
      status: 'Pending',
      raisedDate: new Date().toISOString().split('T')[0], // Today
    },
    {
      id: 2,
      employeeName: 'Jane Smith',
      leaveType: 'Annual Leave',
      startDate: '2024-12-22',
      endDate: '2024-12-25',
      days: 4,
      status: 'Approved',
      raisedDate: '2024-12-18',
    },
    {
      id: 3,
      employeeName: 'Mike Johnson',
      leaveType: 'Personal Leave',
      startDate: '2024-12-24',
      endDate: '2024-12-24',
      days: 1,
      status: 'Pending',
      raisedDate: new Date().toISOString().split('T')[0], // Today
    },
    {
      id: 4,
      employeeName: 'Sarah Williams',
      leaveType: 'Annual Leave',
      startDate: '2024-12-28',
      endDate: '2024-12-30',
      days: 3,
      status: 'Pending',
      raisedDate: new Date().toISOString().split('T')[0], // Today
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return theme.colors.success;
      case 'Pending':
        return theme.colors.warning;
      case 'Rejected':
        return theme.colors.error;
      default:
        return theme.colors.text.secondary;
    }
  };

  const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  return (
    <div className="leave-requests card">
      <div className="leave-requests__header">
        <div className="leave-requests__title">
          <MdEvent style={{ fontSize: '20px', color: theme.colors.primary, marginRight: '8px' }} />
          <h3>Leave Requests</h3>
        </div>
        <span className="leave-requests__count">{leaveRequests.length}</span>
      </div>

      <div className="leave-requests__list">
        {leaveRequests.map((request) => (
          <div key={request.id} className="leave-requests__item">
            <div className="leave-requests__item-header">
              <div className="leave-requests__employee">
                <MdPerson style={{ fontSize: '18px', color: theme.colors.text.secondary, marginRight: '6px' }} />
                <span className="leave-requests__employee-name">{request.employeeName}</span>
                {isToday(request.raisedDate) && (
                  <span className="leave-requests__badge" style={{ backgroundColor: theme.colors.primary + '20', color: theme.colors.primary }}>
                    Today
                  </span>
                )}
              </div>
              <span
                className="leave-requests__status"
                style={{ color: getStatusColor(request.status) }}
              >
                {request.status}
              </span>
            </div>

            <div className="leave-requests__item-details">
              <div className="leave-requests__detail-row">
                <MdCalendarToday style={{ fontSize: '16px', color: theme.colors.text.secondary, marginRight: '6px' }} />
                <span className="leave-requests__date">
                  {formatDate(request.startDate)}
                  {request.startDate !== request.endDate && ` - ${formatDate(request.endDate)}`}
                </span>
              </div>
              <div className="leave-requests__detail-row">
                <MdInfo style={{ fontSize: '16px', color: theme.colors.text.secondary, marginRight: '6px' }} />
                <span className="leave-requests__leave-type">{request.leaveType}</span>
                <span className="leave-requests__days">({request.days} day{request.days > 1 ? 's' : ''})</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {leaveRequests.length === 0 && (
        <div className="leave-requests__empty">
          <MdEvent style={{ fontSize: '48px', color: theme.colors.text.secondary, marginBottom: '12px' }} />
          <p>No leave requests</p>
        </div>
      )}
    </div>
  );
};

export default LeaveRequests;

