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
      {/* Header 영역 */}      
      <Header />
      
      <div className="main-container">
        {/* Sidebar 영역 */}
        {!isDashboard && (
          <div className="sidebar">
            <LNB />
          </div>
        )}
        
        {/* Main 영역 - 대시보드 페이지에서는 풀 너비로 표시 */}
        <main className={`content-area ${isDashboard ? 'full-width' : ''}`}>
          {children}
        </main>
      </div>
      
      {/* Footer 영역 - 대시보드 페이지에서는 풀 너비로 표시 */}      
      <Footer />
    </div>
  );
};

export default Layout; 