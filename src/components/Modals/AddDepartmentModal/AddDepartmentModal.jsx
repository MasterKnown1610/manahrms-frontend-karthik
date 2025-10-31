import { Modal, Form, Input, Button } from 'antd';
import { useTheme } from '../../../contexts/ThemeContext';
import './AddDepartmentModal.scss';

const AddDepartmentModal = ({ open, onClose, onAdd }) => {
  const { theme } = useTheme();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onAdd(values);
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
      title="Add New Department"
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
          Add Department
        </Button>,
      ]}
      width={500}
      className="add-department-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="add-department-modal__form"
      >
        <Form.Item
          name="name"
          label="Department Name"
          rules={[{ required: true, message: 'Please enter department name' }]}
        >
          <Input placeholder="Enter department name" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: false }]}
        >
          <Input.TextArea
            placeholder="Enter department description (optional)"
            rows={4}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDepartmentModal;

