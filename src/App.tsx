import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { fittrackTheme } from './design-system';
import './design-system/styles/globals.css';

// Pages
import LoginPage from './pages/auth/LoginPage';
import SetupPage from './pages/auth/SetupPage';
import DashboardPage from './pages/dashboard/DashboardPage';

const engine = new Styletron();

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={currentUser ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/setup" element={currentUser ? <SetupPage /> : <Navigate to="/login" replace />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={fittrackTheme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
