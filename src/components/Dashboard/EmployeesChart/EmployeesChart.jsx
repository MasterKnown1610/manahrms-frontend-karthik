import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import './EmployeesChart.scss';

const EmployeesChart = () => {
  const { theme } = useTheme();

  const data = [
    { name: 'Full-Time', value: 400, color: theme.colors.chart.blue },
    { name: 'Part-Time', value: 200, color: theme.colors.chart.green },
    { name: 'Internship', value: 100, color: theme.colors.chart.orange },
  ];

  const COLORS = data.map((item) => item.color);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight={600}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="employees-chart card">
      <h2 className="employees-chart__title">Employees</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.secondary}`,
              borderRadius: theme.borderRadius.md,
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => `${entry.payload.value} ${value}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeesChart;

