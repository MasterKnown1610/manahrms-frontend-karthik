import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useTheme } from '../../../contexts/ThemeContext';
import './GrowthChart.scss';

const GrowthChart = () => {
  const { theme } = useTheme();

  const data = [
    { month: 'Jan', value: 100, target: 95 },
    { month: 'Feb', value: 105, target: 100 },
    { month: 'Mar', value: 110, target: 105 },
    { month: 'Apr', value: 115, target: 110 },
    { month: 'May', value: 120, target: 115 },
    { month: 'Jun', value: 125, target: 120 },
    { month: 'Jul', value: 130, target: 125 },
  ];

  return (
    <div className="growth-chart card">
      <h2 className="growth-chart__title">Growth Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.chart.green} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={theme.colors.chart.green} stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={theme.colors.chart.blue} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={theme.colors.chart.blue} stopOpacity={0}/>
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="target"
            stroke={theme.colors.chart.blue}
            fillOpacity={1}
            fill="url(#colorTarget)"
            strokeWidth={2}
            name="Target"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={theme.colors.chart.green}
            fillOpacity={1}
            fill="url(#colorValue)"
            strokeWidth={2}
            name="Actual"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="growth-chart__highlight">
        <span className="growth-chart__legend-item">
          <span className="growth-chart__legend-dot" style={{ backgroundColor: theme.colors.chart.green }}></span>
          Actual: {data[data.length - 1].value}%
        </span>
        <span className="growth-chart__legend-item">
          <span className="growth-chart__legend-dot" style={{ backgroundColor: theme.colors.chart.blue }}></span>
          Target: {data[data.length - 1].target}%
        </span>
      </div>
    </div>
  );
};

export default GrowthChart;

