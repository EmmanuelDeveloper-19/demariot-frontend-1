import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export const ListUser = () => {
  const { getUsers, updateUserRole, deleteUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
      setLoading(false);
      setIsUpdated(false); // Reiniciar después de actualizar
    };
    fetchUsers();
  }, [getUsers, isUpdated]);

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const response = await updateUserRole(selectedUser.id, newRole);
      console.log("Respuesta del servidor:", response);

      if (response) {
        setModalOpen(false);
        setSelectedUser(null);
        setNewRole("");
        setIsUpdated(true); // Forzar recarga
      }
    } catch (error) {
      console.error("Error al actualizar el rol del usuario", error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await deleteUser(selectedUser.id);
      if (response) {
        setModalOpen2(false);
        setSelectedUser(null);
        setIsUpdated(true); // Forzar recarga
      }
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Lista de usuarios</h2>
        </div>
        <div className="col">
          <Link to="/dashboard/users/addUser" className="btn btn-success">
            Agregar usuario
          </Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((user, index) => (
              <tr key={user.id}>
                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link
                    to={`/dashboard/users/viewUser/${user.id}`}
                    className="btn btn-success"
                  >
                    Ver
                  </Link>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      setSelectedUser(user);
                      setNewRole(user.role);
                      setModalOpen(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setSelectedUser(user);
                      setModalOpen2(true);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn-pagination"
        >
          Anterior
        </button>
        <span className="mx-2">Página {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * usersPerPage >= users.length}
          className="btn-pagination"
        >
          Siguiente
        </button>
      </div>

      {modalOpen && (
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Actualizar Rol</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Selecciona el nuevo rol para {selectedUser?.first_name}:</p>
                <div className="form-group">
                  <select
                    value={newRole}
                    onChange={(e) => {
                      setNewRole(e.target.value);
                      console.log("Nuevo rol seleccionado:", e.target.value);
                    }}
                    className="form-select"
                  >
                    <option value="" disabled>
                      Selecciona un rol
                    </option>
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                    <option value="user">Usuario</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-info" onClick={handleUpdateRole}>
                  Aceptar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setModalOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen2 && (
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Eliminar usuario</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setModalOpen2(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de eliminar este usuario?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-info" onClick={handleDeleteUser}>
                  Aceptar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setModalOpen2(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
