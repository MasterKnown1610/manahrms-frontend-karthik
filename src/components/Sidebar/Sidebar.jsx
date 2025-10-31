import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useSidebar } from '../../contexts/SidebarContext';
import {
  MdDashboard,
  MdAssignment,
  MdAssessment,
  MdCalendarToday,
  MdMessage,
  MdPeople,
  MdSettings,
  MdHelpOutline,
  MdLogout,
  MdMenu,
  MdChevronLeft,
} from 'react-icons/md';
import './Sidebar.scss';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
    { id: 'employee', label: 'Employee', icon: MdPeople, path: '/employee' },
    { id: 'task', label: 'Task', icon: MdAssignment, path: '/task' },
    { id: 'report', label: 'Report', icon: MdAssessment, path: '/report' },
    { id: 'calendar', label: 'Calendar', icon: MdCalendarToday, path: '/calendar' },
    { id: 'messages', label: 'Messages', icon: MdMessage, path: '/messages' },
  ];

  const utilityItems = [
    { id: 'setting', label: 'Setting', icon: MdSettings, path: '/setting' },
    { id: 'support', label: 'Support', icon: MdHelpOutline, path: '/support' },
    { id: 'logout', label: 'Logout', icon: MdLogout, path: '/login' },
  ];

  const isActive = (path, itemId) => {
    // Check if path matches exactly (without query params)
    if (location.pathname === path) {
      return true;
    }
    
    // Check if path is a query variant (e.g., /employee?tab=departments)
    if (path.includes('?')) {
      const [basePath] = path.split('?');
      // Only match if the base path matches and query params match
      if (location.pathname === basePath) {
        const urlParams = new URLSearchParams(location.search);
        const pathParams = new URLSearchParams(path.split('?')[1]);
        const tabParam = pathParams.get('tab');
        const urlTab = urlParams.get('tab');
        
        // If the path has a tab param, it must match the URL tab param
        if (tabParam) {
          return tabParam === urlTab;
        }
        // If no tab param in path, match if URL also has no tab or we're on the base path
        return !urlTab || urlTab === null;
      }
      return false;
    }
    
    return false;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}
      style={{ backgroundColor: theme.colors.primary }}
    >
      <div className="sidebar__header">
        <button className="sidebar__toggle" onClick={toggleSidebar}>
          {isCollapsed ? <MdMenu /> : <MdChevronLeft />}
        </button>
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">M</div>
          {!isCollapsed && <span className="sidebar__logo-text">ManaHRMS</span>}
        </div>
      </div>

      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item) => {
            const active = isActive(item.path, item.id);
            
            return (
              <li key={item.id}>
                <button
                  className={`sidebar__menu-item ${active ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    backgroundColor: active ? theme.colors.white : 'transparent',
                    color: active ? theme.colors.primary : theme.colors.white,
                  }}
                >
                  <span className="sidebar__menu-icon">
                    <item.icon />
                  </span>
                  {!isCollapsed && <span className="sidebar__menu-label">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__separator"></div>
        <ul className="sidebar__menu">
          {utilityItems.map((item) => {
            const active = isActive(item.path, item.id);
            return (
              <li key={item.id}>
                <button
                  className={`sidebar__menu-item ${active ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  style={{
                    backgroundColor: active ? theme.colors.white : 'transparent',
                    color: active ? theme.colors.primary : theme.colors.white,
                  }}
                >
                  <span className="sidebar__menu-icon">
                    <item.icon />
                  </span>
                  {!isCollapsed && <span className="sidebar__menu-label">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

