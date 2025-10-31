import { Modal } from "antd";
import {
  MdAccountCircle,
  MdCalendarToday,
  MdPerson,
  MdWork,
  MdFlag,
  MdLabel,
} from "react-icons/md";
import { useTheme } from "../../../contexts/ThemeContext";
import "./TaskViewModal.scss";

const TaskViewModal = ({ open, onClose, task }) => {
  const { theme } = useTheme();

  if (!task) return null;

  const statusConfig = {
    "In Progress": { color: theme.colors.warning, dot: "●" },
    Pending: { color: theme.colors.text.secondary, dot: "●" },
    "In Review": { color: theme.colors.info, dot: "●" },
    Completed: { color: theme.colors.success, dot: "●" },
  };

  const priorityConfig = {
    High: { color: theme.colors.error },
    Medium: { color: theme.colors.warning },
    Low: { color: theme.colors.success },
  };

  const config = statusConfig[task.status] || {
    color: theme.colors.text.secondary,
    dot: "●",
  };

  return (
    <Modal
      title="Task Details"
      open={open}
      onCancel={onClose}
      footer={null}
      width={700}
      className="task-view-modal"
    >
      <div className="task-view-modal__content">
        <div className="task-view-modal__header">
          <div className="task-view-modal__title-section">
            <MdAccountCircle
              style={{
                color: theme.colors.primary,
                fontSize: "32px",
                marginRight: "12px",
              }}
            />
            <h2 className="task-view-modal__title">{task.taskName}</h2>
          </div>
        </div>

        <div className="task-view-modal__details">
          <div className="task-view-modal__detail-row">
            <div className="task-view-modal__detail-item">
              <div className="task-view-modal__detail-label">
                <MdPerson style={{ marginRight: "8px" }} />
                Assignee
              </div>
              <div className="task-view-modal__detail-value">
                {task.assignee}
              </div>
            </div>

            <div className="task-view-modal__detail-item">
              <div className="task-view-modal__detail-label">
                <MdWork style={{ marginRight: "8px" }} />
                Project
              </div>
              <div className="task-view-modal__detail-value">
                <div className="task-view-modal__project">
                  <div
                    className="task-view-modal__project-icon"
                    style={{ backgroundColor: theme.colors.chart.blue }}
                  >
                    {task.project.charAt(0)}
                  </div>
                  <span>{task.project}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="task-view-modal__detail-row">
            <div className="task-view-modal__detail-item">
              <div className="task-view-modal__detail-label">
                <MdFlag style={{ marginRight: "8px" }} />
                Priority
              </div>
              <div
                className="task-view-modal__detail-value"
                style={{
                  color:
                    priorityConfig[task.priority]?.color ||
                    theme.colors.text.secondary,
                }}
              >
                {task.priority}
              </div>
            </div>

            <div className="task-view-modal__detail-item">
              <div className="task-view-modal__detail-label">
                <span style={{ color: config.color, marginRight: "8px" }}>
                  {config.dot}
                </span>
                Status
              </div>
              <div className="task-view-modal__detail-value">{task.status}</div>
            </div>
          </div>

          <div className="task-view-modal__detail-row">
            <div className="task-view-modal__detail-item">
              <div className="task-view-modal__detail-label">
                <MdCalendarToday style={{ marginRight: "8px" }} />
                Due Date
              </div>
              <div className="task-view-modal__detail-value">
                {task.dueDate}
              </div>
            </div>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-view-modal__detail-row">
              <div className="task-view-modal__detail-item task-view-modal__detail-item--full">
                <div className="task-view-modal__detail-label">
                  <MdLabel style={{ marginRight: "8px" }} />
                  Tags
                </div>
                <div className="task-view-modal__tags">
                  {task.tags.map((tag, index) => {
                    const colors = [
                      theme.colors.primary,
                      theme.colors.chart.green,
                      theme.colors.chart.orange,
                      theme.colors.chart.blue,
                    ];
                    return (
                      <span
                        key={index}
                        className="task-view-modal__tag"
                        style={{
                          backgroundColor: colors[index % colors.length] + "20",
                          color: colors[index % colors.length],
                        }}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskViewModal;
