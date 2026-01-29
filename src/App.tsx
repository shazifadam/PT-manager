import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Spinner } from 'baseui/spinner';
import { useStyletron } from 'baseui';
import { customTheme } from './config/theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { userService } from './services/userService';

// Pages
import LoginPage from './pages/auth/LoginPage';
import SetupPage from './pages/auth/SetupPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

const engine = new Styletron();

// Auth Router Component
const AuthRouter: React.FC = () => {
  const [css] = useStyletron();
  const { currentUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!currentUser) {
        setCheckingProfile(false);
        return;
      }

      try {
        const profile = await userService.getUserProfile(currentUser.uid);
        setHasProfile(!!profile);
        
        // Auto-redirect based on profile status
        if (profile) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/setup', { replace: true });
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
      } finally {
        setCheckingProfile(false);
      }
    };

    if (!authLoading) {
      checkUserProfile();
    }
  }, [currentUser, authLoading, navigate]);

  if (authLoading || checkingProfile) {
    return (
      <div className={css({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2e9e2',
      })}>
        <Spinner 
          $color="#e6434c"
          $size={48}
        />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={
        currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />
      } />
      
      <Route path="/setup" element={
        currentUser ? <SetupPage /> : <Navigate to="/login" replace />
      } />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={customTheme}>
        <AuthProvider>
          <div className="App min-h-screen bg-gray-100">
            <AuthRouter />
          </div>
        </AuthProvider>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
