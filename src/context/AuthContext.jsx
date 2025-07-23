import { createContext, useState, useEffect } from 'react';
import React from 'react'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authorization') || null);
  const [userImage, setUserImage] = useState(localStorage.getItem('userImage') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);


  const login = (newToken, newImage,newUser) => {
    localStorage.setItem('authorization', newToken);
    localStorage.setItem('userImage', newImage);
    localStorage.setItem('userId', newUser);
    setToken(newToken);
    setUserImage(newImage);
    setUserId(newUser)
  };

  const logout = () => {
    localStorage.removeItem('authorization');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userId')
    setToken(null);
    setUserImage('');
    setUserId(null)
  };

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('authorization'));
      setUserImage(localStorage.getItem('userImage'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userImage,userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
