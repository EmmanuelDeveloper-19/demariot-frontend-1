import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import nouserimage from "../../src/assets/no_user_image.png";
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";

const Toolbar = () => {
  const { currentUser, logout } = useAuth(); // Añadir función de logout
  const navigate = useNavigate(); // Para redireccionar después de cerrar sesión
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Para manejar la búsqueda

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
    // Aquí se debe añadir la lógica para mostrar/ocultar el sidebar
    // Por ejemplo, emitir un evento o usar un contexto para comunicarse con el componente padre
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implementar lógica de búsqueda (puedes añadir un debounce aquí)
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  // Ejemplo de notificaciones, idealmente vendrían de una API
  const notifications = [
    {
      id: 1,
      text: "Tienes una nueva tarea asignada",
      time: "Hace 10 minutos",
      read: false
    },
    {
      id: 2,
      text: "Recordatorio: Reunión a las 15:00",
      time: "Hace 30 minutos",
      read: true
    }
  ];

  // Cierra los menús cuando se hace clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setShowSettings(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Número de notificaciones no leídas
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <header className="toolbar">
      <div className="toolbar-left">
        <button 
          className="menu-toggle-btn" 
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>

      <div className="search-container">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Buscar..." 
            className="search-input" 
            value={searchTerm}
            onChange={handleSearch}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>

      <div className="toolbar-right">
        <div className="notification-container" ref={notificationRef}>
          <button
            className="notification-icon"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <i className="fas fa-bell"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <h4>Notificaciones</h4>
                {notifications.length > 0 && (
                  <button className="mark-all-read">Marcar todo como leído</button>
                )}
              </div>
              
              {notifications.length > 0 ? (
                <ul className="notifications-list">
                  {notifications.map((notif) => (
                    <li key={notif.id} className={notif.read ? "read" : "unread"}>
                      <div className="notification-content">
                        <p>{notif.text}</p>
                        <span className="notification-time">{notif.time}</span>
                      </div>
                      {!notif.read && <span className="unread-indicator"></span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-notifications">
                  <p>No tienes notificaciones</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="user-profile">
          <div className="user-avatar">
            {currentUser?.profile_picture ? (
              <img
                src={`${API_BASE_URL}/${currentUser.profile_picture}`}
                alt="Foto de perfil"
                className="avatar-image"
              />
            ) : (
              <img
                src={nouserimage}
                alt="Foto de perfil por defecto"
                className="avatar-image"
              />
            )}
          </div>

          <div className="user-info">
            <p className="user-name">{currentUser?.first_name || "Usuario"}</p>
          </div>

          <div className="settings-dropdown-container" ref={settingsRef}>
            <button
              className="settings-toggle"
              onClick={() => setShowSettings(!showSettings)}
              aria-label="User menu"
            >
              <i className="fas fa-chevron-down"></i>
            </button>
            
            {showSettings && (
              <div className="settings-dropdown">
                <ul className="settings-menu">
                  <li>
                    <Link to="/profile" className="menu-item">
                      <i className="fas fa-user"></i>
                      <span>Mi Perfil</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="menu-item">
                      <i className="fas fa-cogs"></i>
                      <span>Configuración</span>
                    </Link>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <button onClick={handleLogout} className="menu-item logout-btn">
                      <i className="fas fa-sign-out-alt"></i>
                      <span>Cerrar Sesión</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Toolbar;