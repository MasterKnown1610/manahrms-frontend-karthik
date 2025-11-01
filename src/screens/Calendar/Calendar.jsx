import { useState, useMemo, useRef } from "react";
import { Calendar as AntCalendar, Table, Tabs } from "antd";
import dayjs from "dayjs";
import calendarData from "../../data/calendarData.json";
import "./Calendar.scss";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState("month");
  const [events] = useState(calendarData.events);
  const [calendarTypes] = useState(calendarData.calendarTypes);
  const [disciplinaryEvents] = useState(calendarData.disciplinaryEvents || []);
  const tablesRef = useRef(null);

  // Map event types to legend colors (based on image)
  const eventTypeColors = {
    meetings: "#EF4444", // Red
    shifts: "#10B981", // Green
    leaves: "#F59E0B", // Orange
    reminders: "#F59E0B", // Orange (using same as leaves)
    events: "#3B82F6", // Light Blue
    birthdays: "#1E40AF", // Dark Blue
    tasks: "#3B82F6", // Light Blue (using same as events)
  };

  // Legend items based on the image
  const legendItems = [
    { color: "#EF4444", label: "Meetings" },
    { color: "#10B981", label: "Shifts" },
    { color: "#F59E0B", label: "Leaves" },
    { color: "#3B82F6", label: "Events" },
    { color: "#1E40AF", label: "Birthday" },
  ];

  // Get events for a specific date
  const getDateEvents = (date) => {
    const dateStr = date.format("YYYY-MM-DD");
    return events.filter((event) => event.date === dateStr);
  };

  // Get event color based on type
  const getEventColor = (eventType) => {
    if (eventType === "meetings") return eventTypeColors.meetings;
    if (eventType === "birthdays") return eventTypeColors.birthdays;
    if (eventType === "reminders" || eventType === "leaves")
      return eventTypeColors.leaves;
    if (eventType === "tasks") return eventTypeColors.events;
    return eventTypeColors.events;
  };

  // Render event dots in calendar cells
  const dateCellRender = (date) => {
    const dateEvents = getDateEvents(date);

    // Group events by type to show dots
    const eventGroups = {};
    dateEvents.forEach((event) => {
      const color = getEventColor(event.type);
      if (!eventGroups[color]) {
        eventGroups[color] = [];
      }
      eventGroups[color].push(event);
    });

    return (
      <div className="calendar-screen__event-dots">
        {Object.keys(eventGroups).map((color) => (
          <span
            key={color}
            className="calendar-screen__event-dot"
            style={{ backgroundColor: color }}
            title={eventGroups[color].map((e) => e.title).join(", ")}
          />
        ))}
      </div>
    );
  };

  const onSelect = (date) => {
    setSelectedDate(date);
    // Scroll to tables section when date is selected
    setTimeout(() => {
      if (tablesRef.current) {
        tablesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const onPanelChange = (date) => {
    setSelectedDate(date);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    return dayjs(dateStr).format("DD-MM-YYYY");
  };

  // Calculate duration between two times
  const calculateDuration = (startTime, endTime) => {
    const start = dayjs(startTime, "HH:mm");
    const end = dayjs(endTime, "HH:mm");
    const diffHours = end.diff(start, "hour", true);
    const hours = Math.floor(diffHours);
    const minutes = Math.round((diffHours - hours) * 60);
    return `${hours.toString().padStart(2, "0")} Hours`;
  };

  // Format time from HH:mm to 12-hour format
  const formatTime = (time) => {
    return dayjs(time, "HH:mm").format("h:mm A");
  };

  // Get filtered disciplinary events for selected date
  const filteredDisciplinaryEvents = useMemo(() => {
    const dateStr = selectedDate.format("YYYY-MM-DD");
    return disciplinaryEvents.filter(
      (event) => event.infractionDate === dateStr
    );
  }, [selectedDate, disciplinaryEvents]);

  // Get filtered meetings for selected date
  const filteredMeetings = useMemo(() => {
    const dateStr = selectedDate.format("YYYY-MM-DD");
    return events
      .filter((event) => event.type === "meetings" && event.date === dateStr)
      .map((event) => ({
        id: event.id,
        meetingWith: event.attendees?.[0] || event.title,
        reason: event.title,
        duration:
          event.startTime && event.endTime
            ? calculateDuration(event.startTime, event.endTime)
            : "N/A",
        startTime: event.startTime ? formatTime(event.startTime) : "N/A",
        endTime: event.endTime ? formatTime(event.endTime) : "N/A",
      }));
  }, [selectedDate, events]);

  // Disciplinary Events table columns
  const disciplinaryColumns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
    },
    {
      title: "Nature Of Infraction",
      dataIndex: "natureOfInfraction",
      key: "natureOfInfraction",
    },
    {
      title: "Infraction Date",
      dataIndex: "infractionDate",
      key: "infractionDate",
      render: (text) => formatDate(text),
    },
    {
      title: "Warning Type",
      dataIndex: "warningType",
      key: "warningType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      key: "createdOn",
      render: (text) => formatDate(text),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="calendar-screen__table-actions">
          <span className="calendar-screen__action-edit">Edit</span>
          <span className="calendar-screen__action-delete">Delete</span>
        </div>
      ),
    },
  ];

  // Meetings table columns
  const meetingsColumns = [
    {
      title: "Meeting With",
      dataIndex: "meetingWith",
      key: "meetingWith",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="calendar-screen__table-actions">
          <span className="calendar-screen__action-edit">Edit</span>
          <span className="calendar-screen__action-delete">Delete</span>
        </div>
      ),
    },
  ];

  // Custom header render for calendar
  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const monthYear = value.format("MMMM YYYY");
    const prevMonth = value.clone().subtract(1, "month");
    const nextMonth = value.clone().add(1, "month");

    return (
      <div className="calendar-screen__header">
        <div className="calendar-screen__header-left">
          <h2 className="calendar-screen__month-year">{monthYear}</h2>
        </div>
        <div className="calendar-screen__header-right">
          <div className="calendar-screen__nav-controls">
            <button
              onClick={() => onChange(value.clone().subtract(1, "month"))}
              className="calendar-screen__nav-btn"
            >
              &lt; {prevMonth.format("MMMM")}
            </button>
            <span className="calendar-screen__nav-separator">&nbsp;</span>
            <button
              onClick={() => onChange(value.clone().add(1, "month"))}
              className="calendar-screen__nav-btn"
            >
              {nextMonth.format("MMMM")} &gt;
            </button>
          </div>
          <Tabs
            activeKey={viewMode}
            onChange={setViewMode}
            items={[
              { key: "day", label: "Day" },
              { key: "week", label: "Week" },
              { key: "month", label: "Month" },
              { key: "year", label: "Year" },
            ]}
            className="calendar-screen__view-tabs"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-screen">
      <AntCalendar
        value={selectedDate}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        fullscreen={true}
        headerRender={headerRender}
      />

      {/* Legend */}
      <div className="calendar-screen__legend">
        {legendItems.map((item) => (
          <div key={item.label} className="calendar-screen__legend-item">
            <span
              className="calendar-screen__legend-dot"
              style={{ backgroundColor: item.color }}
            />
            <span className="calendar-screen__legend-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Disciplinary Events Table */}
      <div ref={tablesRef} className="calendar-screen__table-section">
        <h2 className="calendar-screen__table-title">Disciplinary Events</h2>
        <Table
          columns={disciplinaryColumns}
          dataSource={filteredDisciplinaryEvents}
          rowKey="id"
          pagination={false}
          className="calendar-screen__table"
        />
      </div>

      {/* Meetings Table */}
      <div className="calendar-screen__table-section">
        <h2 className="calendar-screen__table-title">Meetings</h2>
        <Table
          columns={meetingsColumns}
          dataSource={filteredMeetings}
          rowKey="id"
          pagination={false}
          className="calendar-screen__table"
        />
      </div>
    </div>
  );
};

export default Calendar;
