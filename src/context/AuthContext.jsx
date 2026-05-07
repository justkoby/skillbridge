import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock persistent login
    const savedUser = localStorage.getItem('skillbridge_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Admin credentials
    if (email === 'admin@skillbridge.gh' && password === 'admin123') {
      const adminUser = { id: 'admin', name: 'Admin', email, role: 'employer' };
      setUser(adminUser);
      localStorage.setItem('skillbridge_user', JSON.stringify(adminUser));
      return { success: true };
    }
    // Mock login logic — any email + password works
    if (email && password) {
      const mockUser = {
        id: '1',
        name: 'Kwame Asare',
        email: email,
        role: 'jobseeker'
      };
      setUser(mockUser);
      localStorage.setItem('skillbridge_user', JSON.stringify(mockUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const signup = (fullname, email, password, role) => {
    // Mock signup logic
    const mockUser = {
      id: Date.now().toString(),
      name: fullname,
      email: email,
      role: role
    };
    setUser(mockUser);
    localStorage.setItem('skillbridge_user', JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillbridge_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
