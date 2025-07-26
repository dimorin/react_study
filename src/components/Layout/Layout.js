import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import LNB from './LNB';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        {!isDashboard && <LNB />}
        <main className={`content-area ${isDashboard ? 'full-width' : ''}`}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 