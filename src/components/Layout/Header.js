import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const menuItems = [
    {
      title: '운영 관리',
      path: '/operation',
      icon: 'settings',
      subItems: [
        { title: '사용자 관리', path: '/operation/users' },
        { title: '콘텐츠 관리', path: '/operation/contents' }
      ]
    },
    {
      title: '통계 및 분석',
      path: '/analysis',
      icon: 'analytics',
      subItems: [
        { title: '서비스 통계', path: '/analysis/service' }
      ]
    }
  ];

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/dashboard" className="logo-link">
          <span className="logo-icon material-symbols-outlined">business</span>
          종합 자원 관리 시스템
        </Link>
      </div>
      
      <nav className="header-nav">
        {menuItems.map((menu) => (
          <div
            key={menu.path}
            className={`nav-item ${isActive(menu.path) ? 'active' : ''}`}
            onMouseEnter={() => handleDropdownToggle(menu.path)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <span className="nav-title">
              <span className="material-symbols-outlined">{menu.icon}</span>
              {menu.title}
            </span>
            {activeDropdown === menu.path && (
              <div className="dropdown">
                {menu.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className="dropdown-item"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

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