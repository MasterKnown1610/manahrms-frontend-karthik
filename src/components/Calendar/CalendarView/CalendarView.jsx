import { useState, useMemo } from 'react';
import { Calendar, Badge } from 'antd';
import dayjs from 'dayjs';
import { useTheme } from '../../../contexts/ThemeContext';
import './CalendarView.scss';

const CalendarView = ({ selectedDate, events, holidays, festivals, onDateSelect, onDateClick }) => {
  const { theme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  // Combine all events, holidays, and festivals for the calendar
  const getCalendarData = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayEvents = [];

    // Add events
    events.forEach((event) => {
      if (event.date === dateStr) {
        dayEvents.push({
          ...event,
          type: 'event',
        });
      }
    });

    // Add holidays
    holidays.forEach((holiday) => {
      if (holiday.date === dateStr) {
        dayEvents.push({
          ...holiday,
          type: 'holiday',
          color: '#ff4d4f',
        });
      }
    });

    // Add festivals
    festivals.forEach((festival) => {
      if (festival.date === dateStr) {
        dayEvents.push({
          ...festival,
          type: 'festival',
          color: '#ff9800',
        });
      }
    });

    return dayEvents;
  };

  const dateCellRender = (date) => {
    const listData = getCalendarData(date);
    return (
      <ul className="calendar-view__events">
        {listData.map((item) => (
          <li key={item.id || item.title}>
            <Badge
              status="default"
              style={{ backgroundColor: item.color || theme.colors.primary }}
              text={
                <span
                  className="calendar-view__event-text"
                  style={{ color: item.color || theme.colors.primary }}
                >
                  {item.title}
                </span>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  const onPanelChange = (date) => {
    setCurrentMonth(date);
  };

  const onSelect = (date) => {
    onDateSelect(date);
    // Navigate to single date view when date is clicked
    if (onDateClick) {
      onDateClick(date);
    }
  };

  return (
    <div className="calendar-view">
      <Calendar
        value={selectedDate}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          return (
            <div className="calendar-view__header">
              <div className="calendar-view__header-left">
                <h2 className="calendar-view__month-title">
                  {value.format('MMMM YYYY')}
                </h2>
              </div>
              <div className="calendar-view__header-right">
                <button
                  onClick={() => onChange(value.subtract(1, 'month'))}
                  className="calendar-view__nav-btn"
                >
                  ‹
                </button>
                <button
                  onClick={() => onChange(value.add(1, 'month'))}
                  className="calendar-view__nav-btn"
                >
                  ›
                </button>
                <button
                  onClick={() => onChange(dayjs())}
                  className="calendar-view__today-btn"
                >
                  Today
                </button>
              </div>
            </div>
          );
        }}
        className="calendar-view__ant-calendar"
      />
    </div>
  );
};

export default CalendarView;

