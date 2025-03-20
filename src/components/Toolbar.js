import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import nouserimage from "../../src/assets/no_user_image.png";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001";

const Toolbar = () => {
  const { currentUser } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen ] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };
  

  const notificationRef = useRef(null);
  const settingsRef = useRef(null);

  const notifications = [
    {
      id: 1,
      text: "Tienes una notificacion",
    },
  ];

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

  return (
    <header className="toolbar">
      <div>
        <i className="fa-solid fa-bars" style={{color: "black", fontSize: "24px"}}
        onClick={handleMenuToggle}></i>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Buscar..." className="search-input" />
      </div>

      <div className="notification-container" ref={notificationRef}>
        <div
          className="notification-icon"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <i className="fas fa-bell"></i>
          {notifications.length > 0 && (
            <span className="notification-badge">{notifications.length}</span>
          )}
        </div>
        {showNotifications && (
          <div className="notification-dropdown">
            <h4>Notificaciones</h4>
            <ul>
              {notifications.map((notif) => (
                <li key={notif.id}>{notif.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {currentUser?.profile_picture ? (
        <img
          src={`${API_BASE_URL}/${currentUser.profile_picture}`}
          alt="Foto de perfil"
          width="40px"
          height="40px"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "10px",
          }}
        />
      ) : (
        <img
          src={nouserimage}
          alt="Foto de perfil por defecto"
          width="50px"
          style={{ borderRadius: "50%" }}
        />
      )}

      <div className="user-info">
        <p style={{ color: "black" }}>{currentUser.first_name}</p>
      </div>

      <div className="notification-container" ref={settingsRef}>
        <div
          className="notification-icon"
          onClick={() => setShowSettings(!showSettings)}
          style={{ marginLeft: "10px" }}
        >
          <i className="fas fa-chevron-down"></i>
        </div>
        {showSettings && (
          <div className="notification-dropdown">
            <ul
              style={{
                listStyle: "none",
                color: "black",
                alignItems: "center",
                justifyContent: "center",
                padding: 0, // Eliminar el padding por defecto
              }}
            >
              <li
                style={{
                  display: "flex", // Usar flexbox para alinear los elementos en una fila
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px", // Agregar un poco de espacio alrededor de cada item
                }}
              >
                <Link
                  style={{
                    listStyle: "none",
                    textDecoration: "none",
                    color: "black",
                    display: "flex", // Para alinear el icono y el texto en una fila
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fas fa-cogs"
                    style={{
                      marginRight: "8px", // Separación entre el icono y el texto
                    }}
                  ></i>
                  Configuración
                </Link>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Link
                  style={{
                    listStyle: "none",
                    textDecoration: "none",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fas fa-sign-out-alt"
                    style={{
                      marginRight: "8px", // Separación entre el icono y el texto
                    }}
                  ></i>
                  Cerrar Sesión
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Toolbar;