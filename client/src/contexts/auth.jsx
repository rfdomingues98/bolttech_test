import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('token');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers['x-access-token'] = storedToken;
    }
  }, []);

  const Login = async (userData) => {
    try {
      const response = await api.post('/users/signin', userData);
      setUser(response.data.user);
      api.defaults.headers['x-access-token'] = response.data.token;
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };

  const Register = async (userData) => {
    try {
      return await api.post('/users/signup', userData);
    } catch (error) {
      return error.response.data;
    }
  };

  const Logout = () => {
    setUser(null);
    api.defaults.headers['x-access-token'] = '';
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ signed: Boolean(user), user, Register, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
