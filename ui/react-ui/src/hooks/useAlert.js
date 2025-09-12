import { useState, useCallback } from 'react';

export const useAlert = () => {
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
