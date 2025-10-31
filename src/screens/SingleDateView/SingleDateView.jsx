import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, Button, Tag, Empty, Divider, Row, Col, Statistic } from 'antd';
import dayjs from 'dayjs';
import { MdArrowBack, MdAccessTime, MdLocationOn, MdPeople, MdEvent, MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { useTheme } from '../../contexts/ThemeContext';
import AddEventModal from '../../components/Modals/AddEventModal/AddEventModal';
import calendarData from '../../data/calendarData.json';
import './SingleDateView.scss';

const SingleDateView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { theme } = useTheme();
  const [events, setEvents] = useState(calendarData.events);
  const [holidays] = useState(calendarData.holidays);
  const [festivals] = useState(calendarData.festivals);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get date from URL params or use today
  const selectedDate = useMemo(() => {
    const dateParam = searchParams.get('date');
    return dateParam ? dayjs(dateParam) : dayjs();
  }, [searchParams]);

  const dateStr = selectedDate.format('YYYY-MM-DD');
  const isToday = dateStr === dayjs().format('YYYY-MM-DD');

  // Get all items for the selected date
  const dayItems = useMemo(() => {
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
      if (a.startTime) return -1;
      if (b.startTime) return 1;
      return 0;
    });
  }, [events, holidays, festivals, dateStr]);

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

  const handleAddEvent = (eventData) => {
    if (selectedEvent && selectedEvent.id) {
      // Update existing event
      setEvents(events.map((event) => (event.id === selectedEvent.id ? eventData : event)));
    } else {
      // Add new event
      const newEvent = {
        ...eventData,
        id: Date.now(),
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setAddEventModalOpen(true);
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const eventCount = dayItems.filter((item) => item.itemType === 'event').length;
    const holidayCount = dayItems.filter((item) => item.itemType === 'holiday').length;
    const festivalCount = dayItems.filter((item) => item.itemType === 'festival').length;
    return { eventCount, holidayCount, festivalCount };
  }, [dayItems]);

  return (
    <div className="single-date-view">
      <div className="single-date-view__header">
        <div className="single-date-view__header-left">
          <Button
            icon={<MdArrowBack />}
            onClick={() => navigate('/calendar')}
            size="large"
            style={{
              marginRight: '16px',
              backgroundColor: theme.colors.white,
              borderColor: theme.colors.secondary,
            }}
          >
            Back to Calendar
          </Button>
          <div>
            <h1 className="single-date-view__title">
              {selectedDate.format('MMMM D, YYYY')}
              {isToday && <Tag color={theme.colors.primary} style={{ marginLeft: '12px' }}>Today</Tag>}
            </h1>
            <p className="single-date-view__subtitle">
              {selectedDate.format('dddd')} • {stats.eventCount} Events, {stats.holidayCount} Holidays, {stats.festivalCount} Festivals
            </p>
          </div>
        </div>
        <Button
          type="primary"
          icon={<MdAdd />}
          size="large"
          onClick={() => {
            setSelectedEvent(null);
            setAddEventModalOpen(true);
          }}
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.primary,
          }}
        >
          Add Event
        </Button>
      </div>

      <div className="single-date-view__stats">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Events"
                value={stats.eventCount}
                prefix={<MdEvent style={{ color: theme.colors.primary }} />}
                valueStyle={{ color: theme.colors.primary }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Holidays"
                value={stats.holidayCount}
                prefix={<MdEvent style={{ color: '#ff4d4f' }} />}
                valueStyle={{ color: '#ff4d4f' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="Festivals"
                value={stats.festivalCount}
                prefix={<MdEvent style={{ color: '#ff9800' }} />}
                valueStyle={{ color: '#ff9800' }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <div className="single-date-view__content">
        {dayItems.length === 0 ? (
          <Card>
            <Empty
              description="No events scheduled for this date"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              style={{ padding: '40px 0' }}
            >
              <Button
                type="primary"
                icon={<MdAdd />}
                onClick={() => {
                  setSelectedEvent(null);
                  setAddEventModalOpen(true);
                }}
                style={{
                  backgroundColor: theme.colors.primary,
                  borderColor: theme.colors.primary,
                }}
              >
                Add Your First Event
              </Button>
            </Empty>
          </Card>
        ) : (
          <Row gutter={[16, 16]}>
            {dayItems.map((item, index) => (
              <Col xs={24} md={12} lg={8} key={item.id || index}>
                <Card
                  className="single-date-view__event-card"
                  style={{
                    borderLeft: `4px solid ${getEventTypeColor(item)}`,
                    height: '100%',
                  }}
                  actions={
                    item.itemType === 'event'
                      ? [
                          <Button
                            key="edit"
                            type="text"
                            icon={<MdEdit />}
                            onClick={() => handleEditEvent(item)}
                          >
                            Edit
                          </Button>,
                          <Button
                            key="delete"
                            type="text"
                            danger
                            icon={<MdDelete />}
                            onClick={() => handleDeleteEvent(item.id)}
                          >
                            Delete
                          </Button>,
                        ]
                      : null
                  }
                >
                  <div className="single-date-view__event-header">
                    <Tag color={getEventTypeColor(item)}>{getEventTypeLabel(item)}</Tag>
                    {item.startTime && (
                      <span className="single-date-view__event-time">
                        <MdAccessTime size={14} />
                        {formatTime(item.startTime)}
                        {item.endTime && ` - ${formatTime(item.endTime)}`}
                      </span>
                    )}
                  </div>
                  <h3 className="single-date-view__event-title">{item.title}</h3>
                  {item.description && (
                    <p className="single-date-view__event-description">{item.description}</p>
                  )}
                  {item.location && (
                    <div className="single-date-view__event-info">
                      <MdLocationOn size={16} />
                      <span>{item.location}</span>
                    </div>
                  )}
                  {item.attendees && item.attendees.length > 0 && (
                    <div className="single-date-view__event-info">
                      <MdPeople size={16} />
                      <span>{Array.isArray(item.attendees) ? item.attendees.join(', ') : item.attendees}</span>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <AddEventModal
        open={addEventModalOpen}
        onClose={() => {
          setAddEventModalOpen(false);
          setSelectedEvent(null);
        }}
        onAdd={handleAddEvent}
        initialDate={selectedDate}
        editEvent={selectedEvent}
      />
    </div>
  );
};

export default SingleDateView;

