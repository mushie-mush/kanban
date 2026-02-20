import { Navigate, Route, Routes } from 'react-router';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegistrationPage from './pages/RegistrationPage';
import ProtectedRoute from './pages/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
export default App;
