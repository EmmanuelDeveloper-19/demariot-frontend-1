import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import nouserimage from "../../src/assets/no_user_image.png";
import logo from "../assets/logoar.-02.png";
import { useSidebar } from "./SidebarContext";

const Sidebar = () => {
  const { isCollapsed, toggleSidebar} = useSidebar();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("");

  // Detectar ruta activa para resaltarla en el menú
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Menú de navegación agrupado por categorías
  const navigationItems = [
    {
      category: "Principal",
      items: [
        {
          path: "/dashboard/home",
          icon: "fas fa-home",
          label: "Inicio",
          roles: ["admin", "user"]
        }
      ]
    },
    {
      category: "Administración",
      items: [
        {
          path: "/dashboard/users",
          icon: "fas fa-users",
          label: "Usuarios",
          roles: ["admin"]
        }
      ]
    },
    {
      category: "Sistema",
      items: [
        {
          path: "/dashboard/prototype",
          icon: "fas fa-cogs",
          label: "Prototipo",
          roles: ["admin", "user"]
        },
        {
          path: "/historicData",
          icon: "fas fa-history",
          label: "Datos históricos",
          roles: ["admin", "user"]
        },
        {
          path: "/recopileData",
          icon: "fas fa-database",
          label: "Datos recopilados",
          roles: ["admin", "user"]
        }
      ]
    }
  ];

  const footerItems = [
    {
      path: "/dashboard/settings",
      icon: "fas fa-cog",
      label: "Configuración",
      roles: ["admin", "user"]
    },
    {
      path: "/logout",
      icon: "fas fa-sign-out-alt",
      label: "Cerrar Sesión",
      onClick: handleLogout,
      roles: ["admin", "user"]
    }
  ];

  // Función para verificar si un ítem debe mostrarse según el rol del usuario
  const hasPermission = (roles) => {
    if (!roles || roles.length === 0) return true;
    return roles.includes(currentUser?.role || "user");
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Link to="/dashboard/home" className="logo-container">
          <img 
            src={logo} 
            alt="DEMAR-IOT Logo" 
            className="logo-image"
          />
          {!isCollapsed && <span className="logo-text">DEMAR-IOT</span>}
        </Link>
        
        <button className="collapse-toggle" onClick={toggleSidebar}>
          <i className={`fas fa-${isCollapsed ? 'angle-right' : 'angle-left'}`}></i>
        </button>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          {navigationItems.map((group, groupIndex) => (
            <div key={groupIndex} className="nav-group">
              {!isCollapsed && (
                <h3 className="nav-category">{group.category}</h3>
              )}
              
              <ul className="nav-list">
                {group.items
                  .filter(item => hasPermission(item.roles))
                  .map((item, itemIndex) => (
                    <li 
                      key={itemIndex} 
                      className={activeRoute === item.path ? "active" : ""}
                    >
                      <Link 
                        to={item.path} 
                        onClick={item.onClick}
                        title={isCollapsed ? item.label : ""}
                      >
                        <i className={item.icon}></i>
                        {!isCollapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <ul className="footer-nav">
          {footerItems
            .filter(item => hasPermission(item.roles))
            .map((item, index) => (
              <li 
                key={index} 
                className={activeRoute === item.path ? "active" : ""}
              >
                {item.onClick ? (
                  <button 
                    onClick={item.onClick}
                    className="nav-button"
                    title={isCollapsed ? item.label : ""}
                  >
                    <i className={item.icon}></i>
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                ) : (
                  <Link 
                    to={item.path}
                    title={isCollapsed ? item.label : ""}
                  >
                    <i className={item.icon}></i>
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
        </ul>
        
        {!isCollapsed && (
          <div className="version-info">
            <p>v1.0.0</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;