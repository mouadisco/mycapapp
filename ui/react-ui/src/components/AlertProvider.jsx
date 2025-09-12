import React from 'react';
import { useAlert } from '../hooks/useAlert';
import Alert from './Alert';

const AlertProvider = ({ children }) => {
  const { alerts, removeAlert } = useAlert();

  return (
    <>
      {children}
      {/* Container pour les alertes globales */}
      <div className="alerts-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            type={alert.type}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </>
  );
};

export default AlertProvider;
