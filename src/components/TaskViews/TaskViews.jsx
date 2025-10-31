import { Card } from 'antd';
import { MdAccountCircle, MdStar, MdStarBorder } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import './TaskViews.scss';

export const TableView = ({ columns, dataSource, rowSelection, rowKey, showStar, theme }) => {
  // This will be handled by CheckboxTable component
  return null;
};

export const CardView = ({ dataSource, selectedKeys, onSelectionChange, showStar, theme, enableDisableRowIds = [], rowKey = 'id', onViewTask }) => {
  const toggleSelection = (id) => {
    if (enableDisableRowIds.includes(id)) return; // Don't allow selection if disabled
    const newSelection = selectedKeys.includes(id)
      ? selectedKeys.filter((key) => key !== id)
      : [...selectedKeys, id];
    onSelectionChange(newSelection);
  };

  return (
    <div className="task-views__card-container">
      {dataSource.map((item) => (
        <Card
          key={item[rowKey]}
          className={`task-views__card ${selectedKeys.includes(item[rowKey]) ? 'task-views__card--selected' : ''}`}
          onClick={(e) => {
            // Don't trigger view if clicking on checkbox or star
            if (e.target.closest('.task-views__card-checkbox') || e.target.closest('.task-views__star-btn')) {
              return;
            }
            if (onViewTask) {
              onViewTask(item);
            }
          }}
          style={{ cursor: onViewTask ? 'pointer' : 'default' }}
        >
          <div className="task-views__card-header">
            <div className="task-views__card-checkbox">
              <input
                type="checkbox"
                checked={selectedKeys.includes(item[rowKey])}
                onChange={() => toggleSelection(item[rowKey])}
                disabled={enableDisableRowIds.includes(item[rowKey]) || item.disabled}
              />
            </div>
            {showStar && (
              <button className="task-views__star-btn">
                {item.favorite ? (
                  <MdStar className="task-views__star task-views__star--filled" />
                ) : (
                  <MdStarBorder className="task-views__star" />
                )}
              </button>
            )}
          </div>
          <div className="task-views__card-content">
            <div className="task-views__card-title">
              <MdAccountCircle
                style={{ color: theme.colors.primary, fontSize: '24px', marginRight: '8px' }}
              />
              <h3>{item.taskName}</h3>
            </div>
            <div className="task-views__card-details">
              <div className="task-views__card-item">
                <span className="task-views__label">Assignee:</span>
                <span>{item.assignee}</span>
              </div>
              <div className="task-views__card-item">
                <span className="task-views__label">Project:</span>
                <div className="task-views__project">
                  <div
                    className="task-views__project-icon"
                    style={{ backgroundColor: theme.colors.chart.blue }}
                  >
                    {item.project.charAt(0)}
                  </div>
                  <span>{item.project}</span>
                </div>
              </div>
              <div className="task-views__card-item">
                <span className="task-views__label">Priority:</span>
                <span
                  style={{
                    color:
                      item.priority === 'High'
                        ? theme.colors.error
                        : item.priority === 'Medium'
                        ? theme.colors.warning
                        : theme.colors.success,
                  }}
                >
                  {item.priority}
                </span>
              </div>
              <div className="task-views__card-item">
                <span className="task-views__label">Status:</span>
                <div className="task-views__status">
                  <span
                    style={{
                      color:
                        item.status === 'In Progress'
                          ? theme.colors.warning
                          : item.status === 'Completed'
                          ? theme.colors.success
                          : item.status === 'In Review'
                          ? theme.colors.info
                          : theme.colors.text.secondary,
                    }}
                  >
                    ●
                  </span>
                  <span>{item.status}</span>
                </div>
              </div>
              <div className="task-views__card-item">
                <span className="task-views__label">Due Date:</span>
                <span>{item.dueDate}</span>
              </div>
            </div>
            <div className="task-views__tags">
              {item.tags.map((tag, index) => {
                const colors = [
                  theme.colors.primary,
                  theme.colors.chart.green,
                  theme.colors.chart.orange,
                  theme.colors.chart.blue,
                ];
                return (
                  <span
                    key={index}
                    className="task-views__tag"
                    style={{
                      backgroundColor: colors[index % colors.length] + '20',
                      color: colors[index % colors.length],
                    }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export const BoxView = ({ dataSource, selectedKeys, onSelectionChange, showStar, theme, enableDisableRowIds = [], rowKey = 'id', onViewTask }) => {
  const toggleSelection = (id) => {
    if (enableDisableRowIds.includes(id)) return; // Don't allow selection if disabled
    const newSelection = selectedKeys.includes(id)
      ? selectedKeys.filter((key) => key !== id)
      : [...selectedKeys, id];
    onSelectionChange(newSelection);
  };

  return (
    <div className="task-views__box-container">
      {dataSource.map((item) => (
        <div
          key={item[rowKey]}
          className={`task-views__box ${selectedKeys.includes(item[rowKey]) ? 'task-views__box--selected' : ''}`}
          onClick={(e) => {
            // Don't trigger view if clicking on checkbox or star
            if (e.target.closest('.task-views__box-header') && (e.target.type === 'checkbox' || e.target.closest('.task-views__star-btn'))) {
              return;
            }
            if (onViewTask) {
              onViewTask(item);
            }
          }}
          style={{ cursor: onViewTask ? 'pointer' : 'default' }}
        >
          <div className="task-views__box-header">
            <input
              type="checkbox"
              checked={selectedKeys.includes(item[rowKey])}
              onChange={() => toggleSelection(item[rowKey])}
              disabled={enableDisableRowIds.includes(item[rowKey]) || item.disabled}
            />
            {showStar && (
              <button className="task-views__star-btn">
                {item.favorite ? (
                  <MdStar className="task-views__star task-views__star--filled" />
                ) : (
                  <MdStarBorder className="task-views__star" />
                )}
              </button>
            )}
          </div>
          <div className="task-views__box-content">
            <div className="task-views__box-icon">
              <MdAccountCircle style={{ color: theme.colors.primary, fontSize: '32px' }} />
            </div>
            <h4 className="task-views__box-title">{item.taskName}</h4>
            <div className="task-views__box-meta">
              <span>{item.assignee}</span>
              <span>•</span>
              <span>{item.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

