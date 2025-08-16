import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import LNB from './LNB';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <Header />
      <div className="main-container">
        <div className="sidebar">
          <LNB 
            collapsed={sidebarCollapsed} 
            onToggleCollapse={toggleSidebar} 
          />
        </div>
        <main className="content-area">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 