import { useTheme } from '../../../contexts/ThemeContext';
import { MdNotifications, MdEvent, MdPersonAdd, MdAssignment, MdCelebration, MdTrendingUp } from 'react-icons/md';
import './HRMSUpdates.scss';

const HRMSUpdates = () => {
  const { theme } = useTheme();

  const updates = [
    {
      id: 1,
      type: 'announcement',
      icon: MdNotifications,
      title: 'Holiday Schedule Updated',
      description: 'New Year holidays added to calendar',
      time: '2 hours ago',
      color: theme.colors.info,
    },
    {
      id: 2,
      type: 'birthday',
      icon: MdCelebration,
      title: 'Employee Birthdays This Week',
      description: '5 employees celebrating birthdays',
      time: 'Today',
      color: theme.colors.chart.orange,
    },
    {
      id: 3,
      type: 'recruitment',
      icon: MdPersonAdd,
      title: 'New Hires This Month',
      description: '12 new employees joined',
      time: '1 day ago',
      color: theme.colors.success,
    },
    {
      id: 4,
      type: 'training',
      icon: MdAssignment,
      title: 'Training Sessions Scheduled',
      description: '3 mandatory trainings this week',
      time: '2 days ago',
      color: theme.colors.primary,
    },
    {
      id: 5,
      type: 'performance',
      icon: MdTrendingUp,
      title: 'Performance Reviews Due',
      description: 'Quarterly reviews starting next week',
      time: '3 days ago',
      color: theme.colors.warning,
    },
  ];

  return (
    <div className="hrms-updates card">
      <div className="hrms-updates__header">
        <h3 className="hrms-updates__title">HRMS Updates & Alerts</h3>
        <span className="hrms-updates__badge">{updates.length}</span>
      </div>

      <div className="hrms-updates__list">
        {updates.map((update) => {
          const IconComponent = update.icon;
          return (
            <div key={update.id} className="hrms-updates__item">
              <div className="hrms-updates__icon" style={{ backgroundColor: update.color + '20' }}>
                <IconComponent style={{ color: update.color, fontSize: '20px' }} />
              </div>
              <div className="hrms-updates__content">
                <div className="hrms-updates__item-header">
                  <h4 className="hrms-updates__item-title">{update.title}</h4>
                  <span className="hrms-updates__time">{update.time}</span>
                </div>
                <p className="hrms-updates__description">{update.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hrms-updates__footer">
        <button className="hrms-updates__view-all" style={{ color: theme.colors.primary }}>
          View All Updates
        </button>
      </div>
    </div>
  );
};

export default HRMSUpdates;

