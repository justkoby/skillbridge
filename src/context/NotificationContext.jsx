import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Match!', message: 'You have a 92% match for Junior Web Developer at TechNova.', type: 'match', time: '2h ago', read: false },
    { id: 2, title: 'Profile Viewed', message: 'An employer from Capital Group viewed your profile.', type: 'view', time: '5h ago', read: true }
  ]);

  const addNotification = (title, message, type = 'info') => {
    const newNotify = {
      id: Date.now(),
      title,
      message,
      type,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotify, ...prev]);

    // Simulate real email sending log
    console.log(`[EMAIL SENT] To: user@example.com | Subject: ${title} | Body: ${message}`);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
