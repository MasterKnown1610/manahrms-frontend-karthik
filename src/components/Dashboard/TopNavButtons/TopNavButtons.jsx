import './TopNavButtons.scss';

const TopNavButtons = () => {
  const buttons = [
    { id: 1, label: 'Button 1', large: true },
    { id: 2, label: 'Button 2', large: true },
    { id: 3, label: 'Button 3', large: false },
    { id: 4, label: 'Button 4', large: false },
    { id: 5, label: 'Button 5', large: false },
  ];

  return (
    <div className="top-nav-buttons">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`top-nav-buttons__button ${button.large ? 'top-nav-buttons__button--large' : ''}`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default TopNavButtons;

