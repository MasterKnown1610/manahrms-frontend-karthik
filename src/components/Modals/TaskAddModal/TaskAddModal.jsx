import { Modal, Form, Input, Select, DatePicker, Button } from 'antd';
import { useTheme } from '../../../contexts/ThemeContext';
import './TaskAddModal.scss';

const { Option } = Select;

const TaskAddModal = ({ open, onClose, onAdd }) => {
  const { theme } = useTheme();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('MM/DD/YYYY') : '',
        favorite: false,
        tags: values.tags || [],
      };
      onAdd(formData);
      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Add New Task"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Add Task
        </Button>,
      ]}
      width={600}
      className="task-add-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="task-add-modal__form"
      >
        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[{ required: true, message: 'Please enter task name' }]}
        >
          <Input placeholder="Enter task name" size="large" />
        </Form.Item>

        <Form.Item
          name="assignee"
          label="Assignee"
          rules={[{ required: true, message: 'Please select assignee' }]}
        >
          <Input placeholder="Enter assignee name" size="large" />
        </Form.Item>

        <Form.Item
          name="project"
          label="Project"
          rules={[{ required: true, message: 'Please enter project name' }]}
        >
          <Input placeholder="Enter project name" size="large" />
        </Form.Item>

        <div className="task-add-modal__row">
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
            className="task-add-modal__half"
          >
            <Select placeholder="Select priority" size="large">
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
            className="task-add-modal__half"
          >
            <Select placeholder="Select status" size="large">
              <Option value="Pending">Pending</Option>
              <Option value="In Progress">In Progress</Option>
              <Option value="In Review">In Review</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: 'Please select due date' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            size="large"
            format="MM/DD/YYYY"
          />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
          tooltip="Enter tags separated by commas"
        >
          <Select
            mode="tags"
            placeholder="Add tags (press Enter to add)"
            size="large"
            tokenSeparators={[',']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskAddModal;

