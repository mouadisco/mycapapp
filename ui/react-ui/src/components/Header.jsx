import React from 'react';

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
          <div className="tech-stack">
            <span className="tech-badge">CAP</span>
            <span className="tech-badge">SQLite</span>
            <span className="tech-badge">React</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
