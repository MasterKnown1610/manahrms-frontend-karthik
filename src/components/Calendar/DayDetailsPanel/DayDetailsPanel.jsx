import { Card, Tag, Button, Empty, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MdAccessTime, MdLocationOn, MdPeople, MdEvent, MdAdd } from 'react-icons/md';
import dayjs from 'dayjs';
import { useTheme } from '../../../contexts/ThemeContext';
import './DayDetailsPanel.scss';

const DayDetailsPanel = ({ selectedDate, events, holidays, festivals, onAddEvent, onEventClick }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const dateStr = selectedDate.format('YYYY-MM-DD');
  const isToday = dateStr === dayjs().format('YYYY-MM-DD');

  // Get all items for the selected date
  const getDayItems = () => {
    const items = [];

    // Add events
    events.forEach((event) => {
      if (event.date === dateStr) {
        items.push({ ...event, itemType: 'event' });
      }
    });

    // Add holidays
    holidays.forEach((holiday) => {
      if (holiday.date === dateStr) {
        items.push({ ...holiday, itemType: 'holiday' });
      }
    });

    // Add festivals
    festivals.forEach((festival) => {
      if (festival.date === dateStr) {
        items.push({ ...festival, itemType: 'festival' });
      }
    });

    return items.sort((a, b) => {
      if (a.startTime && b.startTime) {
        return a.startTime.localeCompare(b.startTime);
      }
      return 0;
    });
  };

  const dayItems = getDayItems();

  const formatTime = (time) => {
    if (!time) return '';
    return dayjs(time, 'HH:mm').format('h:mm A');
  };

  const getEventTypeColor = (item) => {
    if (item.itemType === 'holiday') return '#ff4d4f';
    if (item.itemType === 'festival') return '#ff9800';
    return item.color || theme.colors.primary;
  };

  const getEventTypeLabel = (item) => {
    if (item.itemType === 'holiday') return 'Holiday';
    if (item.itemType === 'festival') return 'Festival';
    if (item.type === 'meeting') return 'Meeting';
    if (item.type === 'training') return 'Training';
    if (item.type === 'review') return 'Review';
    if (item.type === 'presentation') return 'Presentation';
    return 'Event';
  };

  return (
    <div className="day-details-panel">
      <div className="day-details-panel__header">
        <h3
          className="day-details-panel__date"
          onClick={() => navigate(`/calendar/date?date=${dateStr}`)}
          style={{ cursor: 'pointer' }}
        >
          {selectedDate.format('MMMM D, YYYY')}
          {isToday && <Tag color={theme.colors.primary}>Today</Tag>}
        </h3>
        <Button
          type="primary"
          icon={<MdAdd />}
          onClick={onAddEvent}
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Add Event
        </Button>
      </div>

      <Divider />

      {dayItems.length === 0 ? (
        <Empty
          description="No events scheduled"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          style={{ marginTop: '40px' }}
        />
      ) : (
        <div className="day-details-panel__events">
          {dayItems.map((item, index) => (
            <Card
              key={item.id || index}
              className="day-details-panel__event-card"
              onClick={() => onEventClick && onEventClick(item)}
              style={{
                borderLeft: `4px solid ${getEventTypeColor(item)}`,
                cursor: 'pointer',
                marginBottom: '12px',
              }}
            >
              <div className="day-details-panel__event-header">
                <Tag color={getEventTypeColor(item)}>{getEventTypeLabel(item)}</Tag>
                {item.startTime && (
                  <span className="day-details-panel__event-time">
                    <MdAccessTime size={14} />
                    {formatTime(item.startTime)}
                    {item.endTime && ` - ${formatTime(item.endTime)}`}
                  </span>
                )}
              </div>
              <h4 className="day-details-panel__event-title">{item.title}</h4>
              {item.description && (
                <p className="day-details-panel__event-description">{item.description}</p>
              )}
              {item.location && (
                <div className="day-details-panel__event-info">
                  <MdLocationOn size={14} />
                  <span>{item.location}</span>
                </div>
              )}
              {item.attendees && item.attendees.length > 0 && (
                <div className="day-details-panel__event-info">
                  <MdPeople size={14} />
                  <span>{item.attendees.join(', ')}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DayDetailsPanel;

