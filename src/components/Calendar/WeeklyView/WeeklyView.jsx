import { useMemo } from 'react';
import { Card } from 'antd';
import dayjs from 'dayjs';
import { MdAccessTime, MdLocationOn, MdPeople } from 'react-icons/md';
import { useTheme } from '../../../contexts/ThemeContext';
import './WeeklyView.scss';

const WeeklyView = ({ selectedDate, events, holidays, festivals, onEventClick, onDateClick }) => {
  const { theme } = useTheme();

  // Get the week's dates (Sunday to Saturday)
  const weekDates = useMemo(() => {
    const startOfWeek = selectedDate.startOf('week');
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(startOfWeek.add(i, 'day').clone());
    }
    return dates;
  }, [selectedDate]);

  // Get all items for a specific date
  const getDayItems = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
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

  const getEventTypeClass = (item) => {
    if (item.itemType === 'holiday') return 'weekly-view__event--holiday';
    if (item.itemType === 'festival') return 'weekly-view__event--festival';
    if (item.type === 'meeting') return 'weekly-view__event--meeting';
    if (item.type === 'training') return 'weekly-view__event--training';
    if (item.type === 'review') return 'weekly-view__event--review';
    return 'weekly-view__event--default';
  };

  const formatTime = (time) => {
    if (!time) return '';
    return dayjs(time, 'HH:mm').format('h:mm A');
  };

  const isToday = (date) => {
    return date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
  };

  return (
    <div className="weekly-view">
      <div className="weekly-view__header">
        <div className="weekly-view__time-column"></div>
        {weekDates.map((date) => (
          <div
            key={date.format('YYYY-MM-DD')}
            className={`weekly-view__day-header ${isToday(date) ? 'weekly-view__day-header--today' : ''}`}
            onClick={() => onDateClick && onDateClick(date)}
            style={{ cursor: 'pointer' }}
          >
            <div className="weekly-view__day-name">{date.format('ddd')}</div>
            <div className="weekly-view__day-number">{date.format('D')}</div>
          </div>
        ))}
      </div>

      <div className="weekly-view__content">
        <div className="weekly-view__time-labels">
          {Array.from({ length: 16 }, (_, i) => i + 8).map((hour) => (
            <div key={hour} className="weekly-view__time-label">
              {hour}:00
            </div>
          ))}
        </div>

        <div className="weekly-view__days">
          {weekDates.map((date) => {
            const dayItems = getDayItems(date);
            return (
              <div
                key={date.format('YYYY-MM-DD')}
                className={`weekly-view__day-column ${isToday(date) ? 'weekly-view__day-column--today' : ''}`}
              >
                {dayItems.map((item, index) => (
                  <Card
                    key={item.id || index}
                    className={`weekly-view__event ${getEventTypeClass(item)}`}
                    onClick={() => onEventClick && onEventClick(item)}
                    style={{
                      backgroundColor: item.color || theme.colors.primary + '15',
                      borderColor: item.color || theme.colors.primary,
                      cursor: 'pointer',
                    }}
                  >
                    {item.startTime && (
                      <div className="weekly-view__event-time">
                        <MdAccessTime size={12} />
                        {formatTime(item.startTime)} - {formatTime(item.endTime)}
                      </div>
                    )}
                    <div className="weekly-view__event-title">{item.title}</div>
                    {item.description && (
                      <div className="weekly-view__event-description">{item.description}</div>
                    )}
                    {item.location && (
                      <div className="weekly-view__event-location">
                        <MdLocationOn size={12} />
                        {item.location}
                      </div>
                    )}
                    {item.attendees && item.attendees.length > 0 && (
                      <div className="weekly-view__event-attendees">
                        <MdPeople size={12} />
                        {item.attendees.length} {item.attendees.length === 1 ? 'attendee' : 'attendees'}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeeklyView;

