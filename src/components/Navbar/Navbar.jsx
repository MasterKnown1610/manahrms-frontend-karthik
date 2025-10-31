import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { MdSearch, MdNotifications } from 'react-icons/md';
import './Navbar.scss';

const Navbar = () => {
  const { theme } = useTheme();
  const { isCollapsed } = useSidebar();

  return (
    <nav
      className={`navbar ${isCollapsed ? 'navbar--collapsed' : ''}`}
      style={{ backgroundColor: theme.colors.white }}
    >
      <div className="navbar__left">
        <div className="navbar__greeting">
          <h1 className="navbar__title">Hello Taruk!</h1>
          <p className="navbar__subtitle">Welcome back, Have a Good day.</p>
        </div>
      </div>

      <div className="navbar__right">
        <div className="navbar__search">
          <input
            type="text"
            placeholder="Search..."
            className="navbar__search-input"
          />
          <span className="navbar__search-icon">
            <MdSearch />
          </span>
        </div>

        <div className="navbar__notifications">
          <button className="navbar__notification-btn">
            <MdNotifications className="navbar__notification-icon" />
            <span className="navbar__notification-badge"></span>
          </button>
        </div>

        <div className="navbar__profile">
          <div className="navbar__avatar">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Taruk"
              alt="Profile"
              className="navbar__avatar-img"
            />
          </div>
          <div className="navbar__profile-info">
            <div className="navbar__profile-name">Taruk</div>
            <div className="navbar__profile-role">Admin</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

