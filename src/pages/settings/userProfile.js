import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useAuth } from "../../contexts/AuthContext";
import nouserimage from "../../assets/no_user_image.png";

const API_BASE_URL = "http://localhost:3001";

export const UserProfile = () => {
  const {
    currentUser,
    updateUser,
    uploadProfilePicture,
    updateCurrentUser,
    changePassword,
  } = useAuth();

  const [updatedData, setUpdatedData] = useState({
    first_name: currentUser?.first_name || "",
    last_name: currentUser?.last_name || "",
    phone: currentUser?.phone || "",
    email: currentUser?.email || "",
    address: {
      street: currentUser?.address?.street || "",
      city: currentUser?.address?.city || "",
      state: currentUser?.address?.state || "",
      zip: currentUser?.address?.zip || "",
    },
    current_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [updatedPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejo de campos anidados (address.property)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setUpdatedData({
        ...updatedData,
        [parent]: {
          ...updatedData[parent],
          [child]: value
        }
      });
    } else {
      // Manejo normal para campos no anidados
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = currentUser.id;

    const updateResponse = await updateUser(userId, updatedData);
    if (updateResponse.success) {
      console.log("Usuario actualizado correctamente");
      const getUserResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
      const updatedUser = await getUserResponse.json();
      updateCurrentUser(updatedUser);
    } else {
      console.error(updateResponse.error);
    }

    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);
      const uploadResponse = await uploadProfilePicture(
        currentUser.id,
        formData
      );
      if (uploadResponse.success) {
        console.log("Foto de perfil cargada correctamente");
      } else {
        console.error(uploadResponse.error);
      }
    }

    navigate("/dashboard/settings");
  };

  const handlePassword = async (e) => {
    e.preventDefault();
  
    if (updatedData.new_password !== updatedData.confirm_password) {
      console.error("Las contraseñas no coinciden");
      return;
    }
  
    const userId = currentUser.id;
    try {
      const passwordResponse = await changePassword(
        userId,
        updatedData.current_password,
        updatedData.new_password
      );
      
      if (passwordResponse && passwordResponse.success) {
        console.log("Contraseña cambiada correctamente");
        // Limpiar campos de contraseña
        setUpdatedData({
          ...updatedData,
          current_password: "",
          new_password: "",
          confirm_password: ""
        });
      } else {
        console.error(
          passwordResponse && passwordResponse.error ? passwordResponse.error : "Error desconocido"
        );
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error.message);
    }
};

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card-left">
            <div className="container">
              <div className="row-tab">
                <div className="col-start">
                  <h2>General</h2>
                </div>
              </div>

              <br></br>

              <div className="profile-image-wrapper">
                {currentUser?.profile_picture ? (
                  <img
                    src={`${API_BASE_URL}/${currentUser.profile_picture}`}
                    className="profile-image"
                    alt="Imagen de perfil del usuario"
                  />
                ) : (
                  <img
                    src={nouserimage}
                    className="profile-image"
                    alt="Imagen predeterminada del usuario sin foto de perfil"
                  />
                )}
                <label htmlFor="file-input" className="edit-icon">
                  <i className="fas fa-camera"></i>
                </label>
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p>Nombre*</p>
                  <div className="form-group">
                    <input
                      id="firstName"
                      name="first_name"
                      value={updatedData.first_name}
                      className="input-black"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Apellido*</p>
                  <div className="form-group">
                    <input
                      id="lastName"
                      name="last_name"
                      value={updatedData.last_name}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p>Teléfono*</p>
                  <div className="form-group">
                    <input
                      id="phone"
                      name="phone"
                      value={updatedData.phone}
                      className="input-black"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Correo *</p>
                  <div className="form-group">
                    <input
                      id="email"
                      name="email"
                      value={updatedData.email}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
              <br />
            </div>

            <div className="container">
              <div className="row-tab">
                <div className="col-start">
                  <h2>Dirección</h2>
                </div>
              </div>
              <br></br>

              <div className="row">
                <div className="col-md-6">
                  <p>Estado*</p>
                  <div className="form-group">
                    <input
                      id="state"
                      name="address.state"
                      value={updatedData.address.state}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Ciudad*</p>
                  <div className="form-group">
                    <input
                      id="city"
                      name="address.city"
                      value={updatedData.address.city}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p>Calle o avenida*</p>
                  <div className="form-group">
                  <input
                      id="street"
                      name="address.street"
                      value={updatedData.address.street}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Código Postal *</p>
                  <div className="form-group">
                    <input
                      id="zip"
                      name="address.zip"
                      value={updatedData.address.zip}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
              <br />
            </div>
            <div className="container">
              <div className="row-tab">
                <div className="col-start">
                  <h2>Contraseña</h2>
                </div>
              </div>
              <br></br>

              <div className="row">
                <div className="col-md-6">
                  <p>Ingrese su contraseña*</p>
                  <div className="form-group">
                    <input
                      id="currentPassword"
                      name="current_password"
                      value={updatedData.current_password}
                      className="input-black"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Ingrese su nueva contraseña*</p>
                  <div className="form-group">
                    <input
                      id="newPassword"
                      name="new_password"
                      value={updatedData.new_password}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <p>Confirme su contraseña*</p>
                  <div className="form-group">
                    <input
                      id="confirmPassword"
                      name="confirm_password"
                      value={updatedData.confirm_password}
                      className="input-black"
                      type="text"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary" onClick={handlePassword}>
                  Guardar
                </button>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
