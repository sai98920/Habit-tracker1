// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from '../api'; // base axios instance with credentials
import api from '../../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from backend using cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/verify', { withCredentials: true });
        setAuthData(res.data.user); // adjust based on your backend response
      } catch (err) {
        setAuthData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (formData) => {
    try {
      const res = await api.post('/api/login', formData, { withCredentials: true });
      setAuthData(res.data.user || { id: res.data.id }); // adjust as needed
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const logout = async (navigate) => {
    try {
      await api.post('/api/logout', {}, { withCredentials: true }); // Important: use `/api/logout`
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setAuthData(null);
      navigate('/login'); 
    }
  };
  

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
