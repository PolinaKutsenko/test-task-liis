import React, { useMemo, useState } from 'react';
import { AuthContext } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const initialState = localStorage.getItem('user') === 'authorization';
  const [loggedIn, setLoggedIn] = useState(initialState);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const authObject = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={authObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
