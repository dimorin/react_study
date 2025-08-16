import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LNB.css';

const LNB = ({ collapsed, onToggleCollapse }) => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const navigationStructure = [
    {
      id: 'dashboard',
      title: '대시보드',
      icon: 'dashboard',
      path: '/dashboard',
      badge: null
    },
    {
      id: 'operation',
      title: '운영 관리',
      icon: 'settings',
      path: '/operation',
      badge: null,
      children: [
        {
          id: 'users',
          title: '사용자',
          icon: 'group',
          path: '/operation/users',
          children: [
            { title: '회원', path: '/operation/users/list', icon: 'list' },
            { title: '로그', path: '/operation/users/logs', icon: 'analytics' }
          ]
        },
        {
          id: 'contents',
          title: '콘텐츠',
          icon: 'edit_note',
          path: '/operation/contents',
          children: [
            { title: '게시글', path: '/operation/contents/posts', icon: 'article' },
            { title: '댓글', path: '/operation/contents/comments', icon: 'chat' }
          ]
        }
      ]
    },
    {
      id: 'analysis',
      title: '통계 및 분석',
      icon: 'trending_up',
      path: '/analysis',
      badge: 'New',
      children: [
        {
          id: 'service',
          title: '서비스 통계',
          icon: 'analytics',
          path: '/analysis/service',
          children: [
            { title: '일간/월간 활성 사용자', path: '/analysis/service/dau_mau', icon: 'person' },
            { title: '매출 현황', path: '/analysis/service/sales', icon: 'payments' }
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleSidebar = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  useEffect(() => {
    // 현재 경로에 해당하는 섹션을 자동으로 열기
    const currentPath = location.pathname;
    const newOpenSections = {};
    
    navigationStructure.forEach(nav => {
      if (nav.children) {
        nav.children.forEach(section => {
          if (currentPath.startsWith(section.path)) {
            newOpenSections[section.id] = true;
          }
        });
      }
    });
    
    setOpenSections(newOpenSections);
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const renderMenuItem = (item) => {
    if (item.children) {
      return (
        <li key={item.id} className={`has-sub ${openSections[item.id] ? 'open' : ''}`}>
          <a 
            href="#!" 
            className="side-menu-link"
            onClick={(e) => {
              e.preventDefault();
              toggleSection(item.id);
            }}
          >
            <span className="side-menu-icon">
              <span className="material-symbols-outlined">{item.icon}</span>
            </span>
            <span className="side-menu-text">{item.title}</span>
            {item.badge && (
              <span className="badge bg-soft-primary text-primary ms-auto">{item.badge}</span>
            )}
            <span className="menu-arrow">
              <span className="material-symbols-outlined">
                {openSections[item.id] ? 'expand_more' : 'chevron_right'}
              </span>
            </span>
          </a>
          <ul className="side-menu-sub">
            {item.children.map(subItem => (
              <li key={subItem.id} className={`has-sub ${openSections[subItem.id] ? 'open' : ''}`}>
                <a 
                  href="#!" 
                  className="side-menu-link"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSection(subItem.id);
                  }}
                >
                  <span className="side-menu-icon">
                    <span className="material-symbols-outlined">{subItem.icon}</span>
                  </span>
                  <span className="side-menu-text">{subItem.title}</span>
                  <span className="menu-arrow">
                    <span className="material-symbols-outlined">
                      {openSections[subItem.id] ? 'expand_more' : 'chevron_right'}
                    </span>
                  </span>
                </a>
                {subItem.children && (
                  <ul className="side-menu-sub">
                    {subItem.children.map(subSubItem => (
                      <li key={subSubItem.path}>
                        <Link 
                          to={subSubItem.path} 
                          className={`side-menu-link ${isActive(subSubItem.path) ? 'active' : ''}`}
                        >
                          <span className="side-menu-icon">
                            <span className="material-symbols-outlined">{subSubItem.icon}</span>
                          </span>
                          <span className="side-menu-text">{subSubItem.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      );
    } else {
      return (
        <li key={item.id}>
          <Link 
            to={item.path} 
            className={`side-menu-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <span className="side-menu-icon">
              <span className="material-symbols-outlined">{item.icon}</span>
            </span>
            <span className="side-menu-text">{item.title}</span>
            {item.badge && (
              <span className="badge bg-soft-primary text-primary ms-auto">{item.badge}</span>
            )}
          </Link>
        </li>
      );
    }
  };

  return (
    <>
      <div className="header-logo">
          <Link to="/dashboard" className="logo-link">
            <span className="logo-icon material-symbols-outlined">business</span>
            <span className="logo-text">종합 자원 관리 시스템</span>            
          </Link>
      </div>
      <div className="left-side-menu">
        {/* 사이드바 헤더 */}
        <div className="h-100" data-simplebar>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              {navigationStructure.map(renderMenuItem)}
            </ul>
          </div>
        </div>

        {/* 사이드바 토글 버튼 */}
        <div className="sidebar-footer">
          <button 
            className="btn btn-sm btn-light w-100"
            onClick={toggleSidebar}
            title={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
          >
            <span className="material-symbols-outlined">
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>            
          </button>
        </div>
      </div>
    </>
  );
};

export default LNB; 