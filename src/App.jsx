import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import ProfilePage from './pages/ProfilePage';

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = ['/', '/signup'].includes(location.pathname) || location.pathname.startsWith('/dashboard');

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
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

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppContent />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

const DashboardRouter = () => {
  const { user } = useAuth();
  return user?.role === 'employer' ? <EmployerDashboard /> : <Dashboard />;
};

export default App;
