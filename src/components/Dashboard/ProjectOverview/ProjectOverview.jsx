import { useTheme } from '../../../contexts/ThemeContext';
import { MdArrowForward } from 'react-icons/md';
import './ProjectOverview.scss';

const ProjectOverview = () => {
  const { theme } = useTheme();

  const projects = [
    { status: 'Signed', count: 14, color: theme.colors.chart.blue },
    { status: 'Manager Review', count: 20, color: theme.colors.chart.green },
    { status: 'Client Review', count: 18, color: theme.colors.chart.orange },
  ];

  const total = projects.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="project-overview card">
      <div className="project-overview__header">
        <h2 className="project-overview__title">Project Overview</h2>
        <span className="project-overview__count">50 Project</span>
      </div>

      <div className="project-overview__progress">
        <div className="project-overview__progress-bar">
          {projects.map((project, index) => {
            const percentage = (project.count / total) * 100;
            return (
              <div
                key={project.status}
                className="project-overview__progress-segment"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: project.color,
                  borderRadius:
                    index === 0
                      ? `${theme.borderRadius.md} 0 0 ${theme.borderRadius.md}`
                      : index === projects.length - 1
                      ? `0 ${theme.borderRadius.md} ${theme.borderRadius.md} 0`
                      : '0',
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="project-overview__legend">
        {projects.map((project) => (
          <div key={project.status} className="project-overview__legend-item">
            <span
              className="project-overview__legend-dot"
              style={{ backgroundColor: project.color }}
            />
            <span className="project-overview__legend-label">{project.status}</span>
            <span className="project-overview__legend-count">{project.count}</span>
          </div>
        ))}
      </div>

      <button className="project-overview__button">
        View Projects <MdArrowForward />
      </button>
    </div>
  );
};

export default ProjectOverview;

