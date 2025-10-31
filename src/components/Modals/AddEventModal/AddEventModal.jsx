import { useEffect } from 'react';
import { Modal, Form, Input, TimePicker, Select, Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useTheme } from '../../../contexts/ThemeContext';
import './AddEventModal.scss';

const { Option } = Select;
const { TextArea } = Input;

const AddEventModal = ({ open, onClose, onAdd, initialDate = null, editEvent = null }) => {
  const { theme } = useTheme();
  const [form] = Form.useForm();

  // Reset form when modal opens/closes or editEvent changes
  useEffect(() => {
    if (open) {
      if (editEvent) {
        form.setFieldsValue({
          title: editEvent.title,
          type: editEvent.type,
          date: dayjs(editEvent.date),
          startTime: editEvent.startTime ? dayjs(editEvent.startTime, 'HH:mm') : null,
          endTime: editEvent.endTime ? dayjs(editEvent.endTime, 'HH:mm') : null,
          description: editEvent.description,
          location: editEvent.location,
          attendees: editEvent.attendees,
          color: editEvent.color || '#5C2190',
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          date: initialDate || dayjs(),
          type: 'meeting',
          color: '#5C2190',
        });
      }
    }
  }, [open, editEvent, initialDate, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const eventData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm'),
        id: editEvent ? editEvent.id : Date.now(),
      };
      onAdd(eventData);
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
      title={editEvent ? "Edit Event" : "Add New Event"}
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
          {editEvent ? "Update Event" : "Add Event"}
        </Button>,
      ]}
      width={600}
      className="add-event-modal"
    >
      <Form
        form={form}
        layout="vertical"
        className="add-event-modal__form"
      >
        <Form.Item
          name="title"
          label="Event Title"
          rules={[{ required: true, message: 'Please enter event title' }]}
        >
          <Input placeholder="Enter event title" size="large" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Event Type"
          rules={[{ required: true }]}
        >
          <Select size="large">
            <Option value="meeting">Meeting</Option>
            <Option value="training">Training</Option>
            <Option value="review">Review</Option>
            <Option value="presentation">Presentation</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker style={{ width: '100%' }} size="large" />
        </Form.Item>

        <Form.Item
          name="startTime"
          label="Start Time"
          rules={[{ required: true, message: 'Please select start time' }]}
        >
          <TimePicker style={{ width: '100%' }} format="HH:mm" size="large" />
        </Form.Item>

        <Form.Item
          name="endTime"
          label="End Time"
          rules={[{ required: true, message: 'Please select end time' }]}
        >
          <TimePicker style={{ width: '100%' }} format="HH:mm" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea rows={4} placeholder="Enter event description (optional)" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
        >
          <Input placeholder="Enter location (optional)" size="large" />
        </Form.Item>

        <Form.Item
          name="attendees"
          label="Attendees"
        >
          <Select
            mode="tags"
            placeholder="Add attendees (optional)"
            size="large"
            tokenSeparators={[',']}
          />
        </Form.Item>

        <Form.Item
          name="color"
          label="Color"
        >
          <Select size="large" defaultValue="#5C2190">
            <Option value="#5C2190">Purple</Option>
            <Option value="#1890ff">Blue</Option>
            <Option value="#52c41a">Green</Option>
            <Option value="#fa8c16">Orange</Option>
            <Option value="#eb2f96">Pink</Option>
            <Option value="#722ed1">Violet</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventModal;

