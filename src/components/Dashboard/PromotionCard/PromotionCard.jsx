import { useTheme } from '../../../contexts/ThemeContext';
import { MdCampaign } from 'react-icons/md';
import './PromotionCard.scss';

const PromotionCard = () => {
  const { theme } = useTheme();

  return (
    <div className="promotion-card card">
      <div className="promotion-card__icon">
        <MdCampaign />
      </div>
      <p className="promotion-card__text">
        Check out the latest promotion for society members
      </p>
      <button 
        className="promotion-card__button"
        style={{ backgroundColor: theme.colors.secondary }}
      >
        View Details
      </button>
    </div>
  );
};

export default PromotionCard;

