import {
  Routes, Route, Navigate, Outlet,
} from 'react-router-dom';

import routes from '../routes.js';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import HotelPage from './HotelPage.jsx';

///
const useAuth = () => false;
///

const PrivateOutlet = () => {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <Routes>
    <Route path={routes.hotelsPagePath()} element={<PrivateOutlet />}>
      <Route index element={<HotelPage />} />
    </Route>
    <Route path={routes.loginPagePath()} element={<LoginPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
