import { useTheme } from '../../../contexts/ThemeContext';
import { MdFilterList } from 'react-icons/md';
import './PerformanceTable.scss';

const PerformanceTable = () => {
  const { theme } = useTheme();

  const employees = [
    {
      name: 'Peter',
      age: 30,
      department: 'Marketing Department',
      project: 30,
      salary: '1,50,000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter',
    },
    {
      name: 'Anderson',
      age: 28,
      department: 'Finance Department',
      project: 24,
      salary: '80,000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anderson',
    },
    {
      name: 'Lisiya',
      age: 26,
      department: 'Sales Department',
      project: 22,
      salary: '50,000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisiya',
    },
    {
      name: 'John',
      age: 29,
      department: 'Finance Department',
      project: 28,
      salary: '75,000',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
  ];

  return (
    <div className="performance-table card">
      <div className="performance-table__header">
        <h2 className="performance-table__title">Performance Listed</h2>
        <button className="performance-table__filter">
          <MdFilterList /> Filter
        </button>
      </div>

      <div className="performance-table__container">
        <table className="performance-table__table">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Age</th>
              <th>Department</th>
              <th>Project</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.name}>
                <td>
                  <div className="performance-table__employee">
                    <img
                      src={employee.avatar}
                      alt={employee.name}
                      className="performance-table__avatar"
                    />
                    <span>{employee.name}</span>
                  </div>
                </td>
                <td>{employee.age}</td>
                <td>{employee.department}</td>
                <td>{employee.project}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceTable;

