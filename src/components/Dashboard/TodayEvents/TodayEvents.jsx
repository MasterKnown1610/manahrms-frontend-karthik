import { useTheme } from '../../../contexts/ThemeContext';
import { MdArrowForward } from 'react-icons/md';
import './TodayEvents.scss';

const TodayEvents = () => {
  const { theme } = useTheme();

  return (
    <div
      className="today-events card"
      style={{ backgroundColor: theme.colors.text.primary, color: theme.colors.white }}
    >
      <h3 className="today-events__title">TODAY EVENTS</h3>
      <div className="today-events__content">
        <div className="today-events__event">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Anne"
            alt="Anne"
            className="today-events__avatar"
          />
          <span className="today-events__text">Anne's Birthday</span>
        </div>
        <MdArrowForward className="today-events__arrow" />
      </div>
    </div>
  );
};

export default TodayEvents;

