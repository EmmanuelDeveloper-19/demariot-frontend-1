import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <h2>Dashboard de Administrador</h2>
      <p>Bienvenido, {currentUser?.first_name || 'Administrador'}</p>
      <p>Este es el panel de control administrativo</p>
    </div>
  );
};

export default AdminDashboard;