import React from 'react';
import UserProfile from './UserProfile';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <h1 className="logo-text">BookManager Pro</h1>
          </div>
          <p className="tagline">Professional Library Management System</p>
        </div>
        <div className="header-right">
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
