import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import nouserimage from "../../src/assets/no_user_image.png";
import logo from "../assets/logoar.-02.png";


const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-profile">

        <Link to="/userProfile" className="perfil" style={{ textDecoration: "none", color: "white" }}>
          {/* Verifica si hay foto de perfil en userProfile */}
          {currentUser?.profile_picture ? (
            <img
              src={logo}
              alt="Foto de perfil"
              width="70px"
              height="70px"
              style={{ borderRadius: "50%", objectFit: "cover",  }}
            />
          ) : (
            <img
              src={nouserimage}
              alt="Foto de perfil por defecto"
              width="50px"
              style={{ borderRadius: "50%" }}
            />
          )}

          <div className="user-info-sidebar">
            <p style={{fontWeight: "bold", color:"#00ed64", fontSize: "20px"}}>DEMAR-IOT</p>
          </div>
        </Link>
      </div>
      <br />
      <ul>
        <li>
          <Link to="dashboard/home">
            <i className="fas fa-home"></i> Inicio
          </Link>
        </li>
        {currentUser?.role === "admin" && (
          <li>
            <Link to="/dashboard/users">
              <i className="fas fa-users"></i> Usuarios
            </Link>
          </li>
        )}
        <li>
          <Link to="/dashboard/prototype">
            <i className="fas fa-cogs"></i> Prototipo
          </Link>
        </li>
        <li>
          <Link to="/historicData">
            <i className="fas fa-history"></i> Datos históricos
          </Link>
        </li>
        <li>
          <Link to="/recopileData">
            <i className="fas fa-database"></i> Datos recopilados
          </Link>
        </li>
      </ul>

      <div className="under-content">
        <ul>
          <li>
            <Link to="/dashboard/settings">
              <i className="fas fa-cogs"></i> Configuración
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
