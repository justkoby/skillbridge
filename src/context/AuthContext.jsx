import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [dashboardMode, setDashboardMode] = useState('demo'); // 'demo' | 'personalized'
  const [demoProfile, setDemoProfile] = useState(null);

  useEffect(() => {
    // Mock persistent login
    const savedUser = localStorage.getItem('skillbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin credentials (bypass DB)
    if (email === 'admin@skillbridge.gh' && password === 'admin123') {
      const adminUser = { id: 'admin', name: 'Admin', email, role: 'employer' };
      setUser(adminUser);
      setHasCompletedOnboarding(true);
      localStorage.setItem('skillbridge_user', JSON.stringify(adminUser));
      return { success: true };
    }

    // 1. Load "Database"
    const users = JSON.parse(localStorage.getItem('skillbridge_all_users') || '[]');
    
    // 2. Find User
    const dbUser = users.find(u => u.email === email);
    if (!dbUser) {
      return { success: false, error: 'Invalid email or password' };
    }

    // 3. Validate Password (simulated hash check)
    const hashedPassword = `sb_hash_${btoa(password)}`;
    if (dbUser.password !== hashedPassword) {
      return { success: false, error: 'Invalid email or password' };
    }

    // 4. Success — Set Session
    const sessionUser = { ...dbUser };
    delete sessionUser.password; // Security: don't keep hash in state
    
    setUser(sessionUser);
    // Note: For existing users, we'd ideally check their actual onboarding status, 
    // but for this mock we'll assume they're good if they're in the DB
    setHasCompletedOnboarding(true); 
    localStorage.setItem('skillbridge_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const signup = (fullname, email, password, role) => {
    // 1. Load "Database"
    const users = JSON.parse(localStorage.getItem('skillbridge_all_users') || '[]');
    
    // 2. Check for Duplicate
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }

    // 3. "Hash" Password
    const hashedPassword = `sb_hash_${btoa(password)}`;

    // 4. Create User
    const newUser = {
      id: Date.now().toString(),
      name: fullname,
      email: email,
      role: role,
      password: hashedPassword
    };

    // 5. Save to "Database"
    users.push(newUser);
    localStorage.setItem('skillbridge_all_users', JSON.stringify(users));

    // 6. Set Session
    const sessionUser = { ...newUser };
    delete sessionUser.password;

    setUser(sessionUser);
    setHasCompletedOnboarding(false);
    setDashboardMode('personalized');
    localStorage.setItem('skillbridge_user', JSON.stringify(sessionUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillbridge_user');
  };

  const completeOnboarding = (mode, profile = null) => {
    setDashboardMode(mode);
    setDemoProfile(profile);
    setHasCompletedOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, signup, logout,
      hasCompletedOnboarding, dashboardMode, demoProfile, completeOnboarding
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
