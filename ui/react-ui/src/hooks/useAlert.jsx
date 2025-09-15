import React, { useState, useCallback, createContext, useContext } from 'react';

// Créer le contexte pour les alertes
const AlertContext = createContext();

// Hook pour utiliser les alertes
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

// Logique des alertes
const useAlertMethods = () => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = useCallback((type, message, duration = 3000) => {
    const id = Date.now() + Math.random();
    const newAlert = { id, type, message };
    
    setAlerts(prev => [...prev, newAlert]);

    if (duration > 0) {
      setTimeout(() => {
        removeAlert(id);
      }, duration);
    }

    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const showSuccess = useCallback((message, duration) => {
    return showAlert('success', message, duration);
  }, [showAlert]);

  const showError = useCallback((message, duration) => {
    return showAlert('error', message, duration);
  }, [showAlert]);

  const showWarning = useCallback((message, duration) => {
    return showAlert('warning', message, duration);
  }, [showAlert]);

  const showInfo = useCallback((message, duration) => {
    return showAlert('info', message, duration);
  }, [showAlert]);

  return {
    alerts,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert,
    clearAllAlerts
  };
};

// Provider pour les alertes
export const AlertProvider = ({ children }) => {
  const alertMethods = useAlertMethods();
  
  return (
    <AlertContext.Provider value={alertMethods}>
      {children}
    </AlertContext.Provider>
  );
};
