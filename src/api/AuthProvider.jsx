import React, { useMemo, useState } from 'react';
import { AuthContext } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const initialState = localStorage.getItem('user') === 'authorization';
  const [loggedIn, setloggedIn] = useState(initialState);

  const logIn = () => {
    setloggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setloggedIn(false);
  };

  const authObject = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={authObject}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
