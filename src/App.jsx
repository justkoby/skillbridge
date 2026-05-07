import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SplashScreen from './components/SplashScreen';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ProfilePage from './pages/ProfilePage';
import OnboardingPage from './pages/OnboardingPage';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ['/', '/signup', '/onboarding'].includes(location.pathname) || location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

const DashboardRouter = () => {
  const { user, hasCompletedOnboarding } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      navigate('/onboarding');
    }
  }, [hasCompletedOnboarding, navigate]);

  if (!hasCompletedOnboarding) return null;

  return user?.role === 'employer' ? <EmployerDashboard /> : <Dashboard />;
};

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {splashDone && (
        <AuthProvider>
          <NotificationProvider>
            <Router>
              <AppContent />
            </Router>
          </NotificationProvider>
        </AuthProvider>
      )}
    </>
  );
}

export default App;
