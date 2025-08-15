import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/' || location.pathname === '/dashboard';

  return (
    <footer className={`footer ${isDashboard ? 'full-width' : ''}`}>
      <div className="footer-content">
        <p className="footer-text">
          © 2025 <span className="footer-link">Comprehensive Resource Management</span>. All rights reserved.
        </p>
        
        <div className="footer-divider"></div>
        
        <div className="footer-info">
          <div className="footer-info-item">
            <span className="footer-info-icon material-symbols-outlined">email</span>
            <span>support@crm.com</span>
          </div>
          <div className="footer-info-item">
            <span className="footer-info-icon material-symbols-outlined">phone</span>
            <span>02-1234-5678</span>
          </div>
          <div className="footer-info-item">
            <span className="footer-info-icon material-symbols-outlined">location_on</span>
            <span>서울특별시 강남구 테헤란로 123</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 