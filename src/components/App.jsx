import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import routes from '../routes.js';
import { useAuth } from '../hooks/index.js';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import HotelPage from './HotelPage/HotelPage.jsx';

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth.loggedIn ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Routes>
    <Route path={routes.hotelsPagePath()} element={<PrivateOutlet />}>
      <Route path="/" element={<HotelPage />} />
    </Route>
    <Route path={routes.loginPagePath()} element={<LoginPage />} />
    <Route path="/*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
