import React, { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

const AuthContext = createContext();
const API_BASE_URL = "http://localhost:3001";

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (storedUser && token) {
            const user = JSON.parse(storedUser);
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }
    , []);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });    
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setCurrentUser(user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            return { success: true, user };  
        } catch (error) {
            console.error("Error en login:", error);
    
            if (error.response) {
                return { success: false, error: error.response.data.message }; 
            }
    
            return { success: false, error: "No se pudo conectar con el servidor." };
        }
    };
    
    const logout = () => { 
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser(null);
        delete axios.defaults.headers.common['Authorization'];
        return true;
    };

    const getUsers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users`);
            return response.data;
        } catch (error) {
            console.error("Error en getUsers:", error);
            return [];
        }
    }

    const addUser = async (user) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/register`, user);
            return { success: true, user: response.data};
        } catch (error) {
            return;
        }
    }

    const getUserById = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/${id}`);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    const updateUserRole = async (id, role) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/users/${id}/role`, { role });
            return response.data;
        } catch (error) {
            return null;
        }
    };

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/users/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error en deleteUser:", error);
            return null;
        }
    };

    const updateUser = async (id, updatedData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${id}`, updatedData);
            return { success: true, user: response.data};
        } catch (error){
            console.error("Error al actualizar usuario:", error);
            return { success: false, error: "No se pudo actualizar el usuario." };
        }
    }

    const uploadProfilePicture = async (id, formData) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/user/${id}/profile_picture`, formData);
          return { success: true, profilePicture: response.data.profile_picture };
        } catch (error) {
          return;
        }
    };

    const changePassword = async (userId, currentPassword, newPassword) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/change-password`,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword  // Asegúrate de que el nombre de la propiedad sea consistente con tu API
                }
            );
            return { success: true, data: response.data };  // Devuelve un objeto con success: true y los datos
        } catch (error) {
            return { success: false, error: error.message };  // Devuelve un objeto con success: false y el mensaje de error
        }
    }
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        } 
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        getUsers,
        addUser,
        getUserById,
        deleteUser,
        updateUserRole,
        updateUser,
        uploadProfilePicture,
        changePassword,
        isAuthenticated: !!currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);