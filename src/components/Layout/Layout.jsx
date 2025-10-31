import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import './Layout.scss';

const Layout = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="layout">
      <Sidebar />
      <Navbar />
      <main className={`layout__main ${isCollapsed ? 'layout__main--collapsed' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

