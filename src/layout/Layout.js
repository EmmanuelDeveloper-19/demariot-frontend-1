import { useSidebar } from "../components/SidebarContext";
import Sidebar from "../components/Sidebar";
import Toolbar from "../components/Toolbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <div className="app-layout">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? 'expanded' : ''}`}>
        <Toolbar />
        <main>
            <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default Layout;
