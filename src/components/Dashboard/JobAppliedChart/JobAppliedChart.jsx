import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import './JobAppliedChart.scss';

const JobAppliedChart = () => {
  const { theme } = useTheme();

  const data = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 60 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 65 },
    { month: 'Jul', value: 58 },
  ];

  return (
    <div className="job-applied-chart card">
      <h2 className="job-applied-chart__title">Job Applied</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondary} />
          <XAxis
            dataKey="month"
            tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.colors.secondary }}
          />
          <YAxis
            tick={{ fill: theme.colors.text.secondary, fontSize: 12 }}
            axisLine={{ stroke: theme.colors.secondary }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: theme.colors.white,
              border: `1px solid ${theme.colors.secondary}`,
              borderRadius: theme.borderRadius.md,
            }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.month === 'May' ? theme.colors.chart.green : theme.colors.secondary}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="job-applied-chart__highlight">
        {data.find((d) => d.month === 'May')?.value}% - May
      </div>
    </div>
  );
};

export default JobAppliedChart;

