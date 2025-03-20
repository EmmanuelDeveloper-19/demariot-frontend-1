import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const API_BASE_URL = "http://localhost:3001"
export const ViewUser = () => {
  const { userId } = useParams(); // Asegúrate de que userId se está obteniendo correctamente
  const { getUserById } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const data = await getUserById(userId);
          setUser(data);
        } catch (error) {
          console.error("Error al obtener el usuario", error);
        }
      };

      fetchUser();
    } else {
      console.error("ID de usuario no válido");
    }
  }, [userId]);

  const formatDate = (dateString) => {
    if (!dateString || dateString.startsWith("0001-01-01"))
      return "Nunca ha ingresado"; // Manejo de la fecha vacía

    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <p>
          <Link to="/dashboard/users" className="breadcrumb-link">
            Usuarios
          </Link>{" "}
          / Datos del usuario
        </p>
      </div>

      <h2 className="title">Información del Usuario</h2>

      <div className="user-card">
        <div className="profile-image-wrapper">
          {user?.profile_picture ? (
            <img
              src={`${API_BASE_URL}/${user.profile_picture}`}
              alt=""
              className="profile-image"
            />
          ) : null}
        </div>
        <p>
          <strong>Nombre:</strong> {user.first_name}{" "}
          {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Rol:</strong> {user.role}
        </p>
        <p>
          <strong>Teléfono:</strong> {user.phone}
        </p>
        <p>
          <strong>Fecha de Incorporación:</strong>{" "}
          {formatDate(user.created_at)}
        </p>
        <p>
          <strong>Última Vez que Ingresó:</strong>{" "}
          {formatDate(user.last_login)}
        </p>
        <p>
          <strong>Última vez que se actualizo un campo: </strong>
          {formatDate(user.updated_at)}
        </p>
      </div>
    </div>
  );
};

export default ViewUser;
