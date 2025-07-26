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
      subItems: [
        { title: '사용자 관리', path: '/operation/users' },
        { title: '콘텐츠 관리', path: '/operation/contents' }
      ]
    },
    {
      title: '통계 및 분석',
      path: '/analysis',
      subItems: [
        { title: '서비스 통계', path: '/analysis/service' }
      ]
    }
  ];

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/dashboard" className="logo-link">
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
            <span className="nav-title">{menu.title}</span>
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
          <span className="user-name">관리자님</span>
          <span className="user-icon">👤</span>
        </div>
        {userDropdown && (
          <div className="user-dropdown">
            <div className="user-dropdown-item">내 정보</div>
            <div className="user-dropdown-item">로그아웃</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 