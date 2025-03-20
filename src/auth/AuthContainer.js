import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoginForm } from "./LoginForm";
import { RecoveryForm } from "./RecoveryForm";
import "../styles/login.css";
import logo from "../../src/assets/logoar.-02.png";

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
