import { useState, useMemo } from "react";
import { Button, Space, Dropdown, Select, Pagination } from "antd";
import {
  MdAdd,
  MdFileDownload,
  MdVisibility,
  MdMoreVert,
  MdFilterList,
  MdSort,
  MdAccountCircle,
  MdViewModule,
  MdViewList,
  MdApps,
} from "react-icons/md";
import { useTheme } from "../../contexts/ThemeContext";
import CheckboxTable from "../../components/CheckboxTable/CheckboxTable";
import { CardView, BoxView } from "../../components/TaskViews/TaskViews";
import TaskViewModal from "../../components/Modals/TaskViewModal/TaskViewModal";
import TaskAddModal from "../../components/Modals/TaskAddModal/TaskAddModal";
import tasksData from "../../data/tasksData.json";
import "./Task.scss";

const Task = () => {
  const { theme } = useTheme();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [viewType, setViewType] = useState("table"); // 'table', 'card', 'box'
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [allTaskData, setAllTaskData] = useState(tasksData);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return allTaskData.slice(startIndex, endIndex);
  }, [currentPage, pageSize, allTaskData]);

  // Get disabled row IDs
  const disabledRowIds = allTaskData
    .filter((item) => item.disabled)
    .map((item) => item.id);

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      sorter: true,
      render: (text, record) => (
        <div className="task-table__client-cell">
          <MdAccountCircle
            style={{
              color: theme.colors.primary,
              fontSize: "20px",
              marginRight: "8px",
            }}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Assignee",
      dataIndex: "assignee",
      key: "assignee",
      sorter: true,
    },
    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      render: (text) => (
        <div className="task-table__project-cell">
          <div
            className="task-table__project-icon"
            style={{ backgroundColor: theme.colors.chart.blue }}
          >
            {text.charAt(0)}
          </div>
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      sorter: true,
      render: (text) => {
        const colorMap = {
          High: theme.colors.error,
          Medium: theme.colors.warning,
          Low: theme.colors.success,
        };
        return (
          <span
            style={{ color: colorMap[text] || theme.colors.text.secondary }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        const statusConfig = {
          "In Progress": { color: theme.colors.warning, dot: "●" },
          Pending: { color: theme.colors.text.secondary, dot: "●" },
          "In Review": { color: theme.colors.info, dot: "●" },
          Completed: { color: theme.colors.success, dot: "●" },
        };
        const config = statusConfig[text] || {
          color: theme.colors.text.secondary,
          dot: "●",
        };
        return (
          <div className="task-table__status-cell">
            <span style={{ color: config.color, marginRight: "6px" }}>
              {config.dot}
            </span>
            <span>{text}</span>
          </div>
        );
      },
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags) => (
        <div className="task-table__tags">
          {tags.map((tag, index) => {
            const colors = [
              theme.colors.primary,
              theme.colors.chart.green,
              theme.colors.chart.orange,
              theme.colors.chart.blue,
            ];
            return (
              <span
                key={index}
                className="task-table__tag"
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
      ),
    },
  ];

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setViewModalOpen(true);
  };

  const handleAddTask = (newTask) => {
    const newId = (allTaskData.length + 1).toString();
    const taskToAdd = {
      ...newTask,
      id: newId,
    };
    setAllTaskData([...allTaskData, taskToAdd]);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
    setSelectedTask(null);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
  };

  const headerActions = {
    left: (
      <>
        <Button
          type="primary"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Update
        </Button>
        {selectedKeys.length > 0 && (
          <span className="task__selected-count">
            {selectedKeys.length} Selected
          </span>
        )}
        <Button
          icon={<MdFilterList />}
          style={{ display: "flex", alignItems: "center" }}
        >
          Filter {selectedKeys.length > 0 ? selectedKeys.length : ""}
        </Button>
        <Select
          defaultValue="sort"
          style={{ width: 120 }}
          suffixIcon={<MdSort />}
        >
          <Select.Option value="sort">Sort</Select.Option>
          <Select.Option value="name">Name</Select.Option>
          <Select.Option value="date">Date</Select.Option>
        </Select>
        <span className="task__results-count">
          {allTaskData.length} Results
        </span>
      </>
    ),
    right: (
      <>
        <div className="task__view-toggle">
          <Button
            type={viewType === "table" ? "primary" : "default"}
            icon={<MdViewList />}
            onClick={() => setViewType("table")}
            style={
              viewType === "table"
                ? {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }
                : {}
            }
          />
          <Button
            type={viewType === "card" ? "primary" : "default"}
            icon={<MdViewModule />}
            onClick={() => setViewType("card")}
            style={
              viewType === "card"
                ? {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }
                : {}
            }
          />
          <Button
            type={viewType === "box" ? "primary" : "default"}
            icon={<MdApps />}
            onClick={() => setViewType("box")}
            style={
              viewType === "box"
                ? {
                    backgroundColor: theme.colors.primary,
                    borderColor: theme.colors.primary,
                  }
                : {}
            }
          />
        </div>
        <Button
          type="primary"
          icon={<MdAdd />}
          onClick={() => setAddModalOpen(true)}
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Add New
        </Button>
        <Button icon={<MdFileDownload />}>Import/Export</Button>
        <Button
          icon={<MdVisibility />}
          onClick={() => {
            if (selectedKeys.length === 1) {
              const task = allTaskData.find((t) => t.id === selectedKeys[0]);
              if (task) handleViewTask(task);
            } else if (selectedKeys.length === 0) {
              // If no selection, view first task in current page
              if (paginatedData.length > 0) {
                handleViewTask(paginatedData[0]);
              }
            }
          }}
          disabled={paginatedData.length === 0}
        >
          View
        </Button>
        <Button icon={<MdMoreVert />} />
      </>
    ),
  };

  return (
    <div className="task">
      {viewType === "table" && (
        <CheckboxTable
          columns={columns}
          dataSource={paginatedData}
          onSelectionChange={handleSelectionChange}
          enableDisableRowIds={disabledRowIds}
          rowKey="id"
          headerActions={headerActions}
          showStar={true}
          onRowClick={handleViewTask}
        />
      )}
      {(viewType === "card" || viewType === "box") && (
        <div className="task__header-actions">
          <div className="task__header-actions-left">{headerActions.left}</div>
          <div className="task__header-actions-right">
            {headerActions.right}
          </div>
        </div>
      )}
      {(viewType === "card" || viewType === "box") && (
        <div className="task__view-wrapper">
          {viewType === "card" ? (
            <CardView
              dataSource={paginatedData}
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
              enableDisableRowIds={disabledRowIds}
              rowKey="id"
              showStar={true}
              theme={theme}
              onViewTask={handleViewTask}
            />
          ) : (
            <BoxView
              dataSource={paginatedData}
              selectedKeys={selectedKeys}
              onSelectionChange={handleSelectionChange}
              enableDisableRowIds={disabledRowIds}
              rowKey="id"
              showStar={true}
              theme={theme}
              onViewTask={handleViewTask}
            />
          )}
        </div>
      )}
      <div className="task__pagination">
        <div className="task__pagination-info">
          {currentPage * pageSize - pageSize + 1}-
          {Math.min(currentPage * pageSize, allTaskData.length)} of{" "}
          {allTaskData.length}
        </div>
        <Pagination
          current={currentPage}
          total={allTaskData.length}
          pageSize={pageSize}
          showSizeChanger
          onChange={(page) => setCurrentPage(page)}
          onShowSizeChange={(current, size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
        />
        <div className="task__pagination-size">
          <Select
            value={pageSize}
            onChange={(value) => {
              setPageSize(value);
              setCurrentPage(1);
            }}
            style={{ width: 100 }}
          >
            <Select.Option value={10}>10</Select.Option>
            <Select.Option value={20}>20</Select.Option>
            <Select.Option value={50}>50</Select.Option>
            <Select.Option value={100}>100</Select.Option>
          </Select>
        </div>
      </div>

      {/* Modals */}
      <TaskViewModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        task={selectedTask}
      />
      <TaskAddModal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default Task;
