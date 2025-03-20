import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/login.css";
import logo from "../../src/assets/logoar.-02.png";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthContainer() {
  const [isRecovery, setIsRecovery] = useState(false);

  return (
    <div className="login-container">
      {/* Sección izquierda con el logo */}
      <div className="left-row">
        <img className="logo-img" src={logo} alt="Logo" />
      </div>

      {/* Sección derecha con los formularios animados */}
      <div className="right-row">
        <AnimatePresence mode="wait">
          {!isRecovery ? (
            <LoginForm key="login" onRecovery={() => setIsRecovery(true)} />
          ) : (
            <RecoveryForm key="recovery" onBack={() => setIsRecovery(false)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 📌 Animación para la transición de formularios
const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

// 📌 Formulario de LOGIN
function LoginForm({ onRecovery }) {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const result = await login(email, password);

      if (result.success) {
        const path =
          result.user.role === "admin" ? "/dashboard/home" : "/user/dashboard";
        navigate(path);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Error inesperado. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      className="login-form"
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>}

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" ref={emailRef} placeholder="Ingresa tu correo" required />

      <label htmlFor="password">Contraseña:</label>
      <input type="password" id="password" ref={passwordRef} placeholder="Ingresa tu contraseña" required />

      <button className="login-btn" type="submit" disabled={loading}>
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>

      <div>
        <button className="forgot-password" type="button" onClick={onRecovery}>
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </motion.form>
  );
}

// 📌 Formulario de RECUPERACIÓN DE CONTRASEÑA
function RecoveryForm({ onBack }) {
  return (
    <motion.form
      className="login-form"
      variants={formVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <h2>Recuperar Contraseña</h2>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" placeholder="Ingresa tu correo" required />

      <button className="login-btn" type="submit">
        Recuperar Contraseña
      </button>

      <div>
        <button className="forgot-password" type="button" onClick={onBack}>
          Volver al inicio de sesión
        </button>
      </div>
    </motion.form>
  );
}
