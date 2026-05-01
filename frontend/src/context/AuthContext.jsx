import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);

    // Axios Interceptor for token refresh
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const currentUser = authService.getCurrentUser();
          if (currentUser && currentUser.refreshToken) {
            try {
              const data = await authService.refreshToken(currentUser.refreshToken);
              setUser(data);
              originalRequest.headers['Authorization'] = `Bearer ${data.token}`;
              return axios(originalRequest);
            } catch (refreshError) {
              authService.logout();
              setUser(null);
              window.location.href = '/login';
              return Promise.reject(refreshError);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    // Request interceptor to add token
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const user = authService.getCurrentUser();
        if (user && user.token) {
          config.headers['Authorization'] = `Bearer ${user.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data);
    return data;
  };

  const registerVendor = async (data) => {
    const res = await authService.registerVendor(data);
    setUser(res);
    return res;
  };

  const registerCustomer = async (data) => {
    const res = await authService.registerCustomer(data);
    setUser(res);
    return res;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, registerVendor, registerCustomer, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
