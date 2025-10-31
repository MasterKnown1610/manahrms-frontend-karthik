import { useState } from 'react';
import { Calendar as AntCalendar, Badge } from 'antd';
import dayjs from 'dayjs';
import calendarData from '../../data/calendarData.json';
import './Calendar.scss';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [events] = useState(calendarData.events);
  const [calendarTypes] = useState(calendarData.calendarTypes);

  // Get events for a specific date
  const getDateEvents = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    return events.filter((event) => event.date === dateStr);
  };

  const dateCellRender = (date) => {
    const dateEvents = getDateEvents(date);
    const maxVisibleEvents = 3;
    const visibleEvents = dateEvents.slice(0, maxVisibleEvents);
    const remainingCount = dateEvents.length - maxVisibleEvents;
    
    return (
      <ul className="calendar-screen__events-list">
        {visibleEvents.map((event) => {
          const calendarType = calendarTypes.find((type) => type.id === event.calendarType);
          const color = calendarType?.color || event.color;
          
          // Determine event type for styling
          let eventType = 'default';
          if (event.type === 'birthdays') eventType = 'success';
          if (event.type === 'reminders') eventType = 'warning';
          if (event.type === 'tasks') eventType = 'error';
          
          return (
            <li key={event.id} className="calendar-screen__event-item">
              <Badge
                status={eventType}
                text={
                  <span className="calendar-screen__event-text" style={{ color }}>
                    {event.title}
                  </span>
                }
              />
            </li>
          );
        })}
        {remainingCount > 0 && (
          <li className="calendar-screen__more-events">
            <span className="calendar-screen__more-text">+{remainingCount}</span>
          </li>
        )}
      </ul>
    );
  };

  const onSelect = (date) => {
    setSelectedDate(date);
  };

  const onPanelChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-screen">
      <AntCalendar
        value={selectedDate}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        fullscreen={true}
      />
    </div>
  );
};

export default Calendar;
