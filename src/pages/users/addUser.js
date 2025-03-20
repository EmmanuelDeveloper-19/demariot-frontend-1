import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const AddUser = () => {
  const { addUser } = useAuth();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false); // Estado para manejar éxito
  const [error, setError] = useState(""); // Estado para manejar errores

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      phone: phoneRef.current.value,
      role: roleRef.current.value,
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
      },
    };

    const response = await addUser(user);

    if (response.success) {
      setSuccess(true); // Mostrar modal de éxito
      setError(""); // Limpiar error
    } else {
      setError(response.error); // Establecer error si no se pudo agregar el usuario
      setSuccess(false); // No mostrar modal de éxito
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/dashboard/users");
  };

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
  }, [success]);

  return (
    <div className="container">
      <div className="breadcrumb">
        <p>
          <Link to="/dashboard/users" className="breadcrumb-link">
            Usuarios
          </Link>{" "}
          / Agregar nuevo usuario
        </p>
      </div>
      <br />
      <div className="col-md-12">
        <div className="card-left">
          <h1>Datos Personales</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="first_name">Nombre</label>
                  <input
                    type="text"
                    id="first_name"
                    ref={firstNameRef}
                    className="form-control"
                    required
                    placeholder="Ingrese el nombre del usuario"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="last_name">Apellido</label>
                  <input
                    type="text"
                    id="last_name"
                    ref={lastNameRef}
                    className="form-control"
                    placeholder="Ingrese el apellido del usuario"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    className="form-control"
                    placeholder="Ingrese el correo del usuario"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    ref={phoneRef}
                    className="form-control"
                    placeholder="Ingrese el número de télefono del usuario"
                    required
                  />
                </div>
              </div>
            </div>

            <br />
            <h3>Dirección</h3>
            <br />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="street">Calle</label>
                  <input
                    type="text"
                    id="street"
                    ref={streetRef}
                    className="form-control"
                    placeholder="Ingrese la calle o avenida del usuario"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    ref={cityRef}
                    className="form-control"
                    placeholder="Ingrese la ciudad de residencia del usuario"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="state">Estado</label>
                  <input
                    type="text"
                    id="state"
                    ref={stateRef}
                    className="form-control"
                    placeholder="Ingrese el Estado de residencia del usuario"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="zip">Código Postal</label>
                  <input
                    type="text"
                    id="zip"
                    ref={zipRef}
                    className="form-control"
                    placeholder="Ingrese el código postal del usuario"
                    required
                  />
                </div>
              </div>
            </div>

            <br />
            <h3>Datos de la cuenta</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="role">Rol</label>
                  <select
                    id="role"
                    ref={roleRef}
                    className="form-control"
                    required
                  >
                    <option value="user">Usuario normal</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    ref={passwordRef}
                    className="form-control"
                    placeholder="Ingrese una contraseña para el usuario"
                    required
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-success">
              Enviar
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="modal show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleModalClose}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>¡El usuario ha sido agregado exitosamente!</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleModalClose}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddUser;
