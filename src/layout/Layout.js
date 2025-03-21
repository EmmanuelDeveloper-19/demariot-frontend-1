import { useSidebar } from '../contexts/SidebarContext';  // Importar el hook del contexto
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

const Layout = ({ children }) => {
  const { isCollapsed, toggleSidebar } = useSidebar();  // Obtener el estado y la función

  return (
    <div className="app-layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
        <Toolbar onMenuToggle={toggleSidebar} />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
