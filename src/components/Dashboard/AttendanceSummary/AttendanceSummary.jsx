import { useTheme } from '../../../contexts/ThemeContext';
import { MdDownload } from 'react-icons/md';
import './AttendanceSummary.scss';

const AttendanceSummary = () => {
  const { theme } = useTheme();

  const attendance = [
    { label: 'Present', value: 650 },
    { label: 'Late', value: 35 },
    { label: 'Absent', value: 20 },
  ];

  return (
    <div className="attendance-summary card">
      <div className="attendance-summary__header">
        <select className="attendance-summary__select">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
        <button className="attendance-summary__download">
          <MdDownload />
        </button>
      </div>

      <div className="attendance-summary__stats">
        {attendance.map((stat) => (
          <div key={stat.label} className="attendance-summary__stat">
            <div className="attendance-summary__stat-value">{stat.value}</div>
            <div className="attendance-summary__stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummary;

