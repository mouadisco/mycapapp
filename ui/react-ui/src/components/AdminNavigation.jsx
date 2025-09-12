import React from 'react';

const AdminNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'books', label: 'Gestion des Livres', icon: '📚' },
    { id: 'users', label: 'Gestion des Utilisateurs', icon: '👥' }
  ];

  return (
    <nav className="admin-navigation">
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavigation;
