import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {  
  const [userDropdown, setUserDropdown] = useState(false);  

  return (
    <header className="header">
            

      <div className="header-user">
        <div
          className="user-info"
          onClick={() => setUserDropdown(!userDropdown)}
        >
          <div className="user-avatar">
            A
          </div>
          <div className="user-details">
            <span className="user-name">관리자</span>
            <span className="user-role">시스템 관리자</span>
          </div>
          <span className="user-icon material-symbols-outlined">expand_more</span>
        </div>
        {userDropdown && (
          <div className="user-dropdown">
            <div className="user-dropdown-item">
              <span className="material-symbols-outlined">person</span>
              내 정보
            </div>
            <div className="user-dropdown-item">
              <span className="material-symbols-outlined">lock</span>
              비밀번호 변경
            </div>
            <div className="user-dropdown-item">
              <span className="material-symbols-outlined">logout</span>
              로그아웃
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 