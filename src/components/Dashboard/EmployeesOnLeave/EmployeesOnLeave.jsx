import { useTheme } from '../../../contexts/ThemeContext';
import './EmployeesOnLeave.scss';

const EmployeesOnLeave = () => {
  const { theme } = useTheme();

  const employees = [
    {
      name: 'Ahamed',
      reason: "Health isn't good",
      duration: 'Only today',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahamed',
    },
    {
      name: 'Jenifa',
      reason: 'Going to trip with family',
      duration: '20-25',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenifa',
    },
  ];

  return (
    <div className="employees-on-leave card">
      <h2 className="employees-on-leave__title">Employees on Leave</h2>
      <div className="employees-on-leave__list">
        {employees.map((employee) => (
          <div key={employee.name} className="employees-on-leave__item">
            <img
              src={employee.avatar}
              alt={employee.name}
              className="employees-on-leave__avatar"
            />
            <div className="employees-on-leave__info">
              <div className="employees-on-leave__name">{employee.name}</div>
              <div className="employees-on-leave__reason">{employee.reason}</div>
              <div
                className="employees-on-leave__duration"
                style={{ color: theme.colors.error }}
              >
                {employee.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesOnLeave;

