import { useTheme } from '../../../contexts/ThemeContext';
import './SummaryCard.scss';

const SummaryCard = ({ title, value, icon: Icon }) => {
  const { theme } = useTheme();

  return (
    <div
      className="summary-card"
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="summary-card__icon">
        <Icon />
      </div>
      <div className="summary-card__content">
        <h3 className="summary-card__title">{title}</h3>
        <p className="summary-card__value">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;

