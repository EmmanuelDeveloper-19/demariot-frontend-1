import React from "react";
import { motion } from "framer-motion";
import "../styles/login.css";


const formVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

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

export default RecoveryForm;