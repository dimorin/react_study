import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LNB.css';

const LNB = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const navigationStructure = {
    '/operation': {
      title: '운영 관리',
      icon: 'settings',
      sections: [
        {
          title: '사용자 관리',
          path: '/operation/users',
          icon: 'group',
          items: [
            { title: '회원 목록', path: '/operation/users/list', icon: 'list' },
            { title: '로그 기록', path: '/operation/users/logs', icon: 'analytics' }
          ]
        },
        {
          title: '콘텐츠 관리',
          path: '/operation/contents',
          icon: 'edit_note',
          items: [
            { title: '게시글 관리', path: '/operation/contents/posts', icon: 'article' },
            { title: '댓글 관리', path: '/operation/contents/comments', icon: 'chat' }
          ]
        }
      ]
    },
    '/analysis': {
      title: '통계 및 분석',
      icon: 'trending_up',
      sections: [
        {
          title: '서비스 통계',
          path: '/analysis/service',
          icon: 'analytics',
          items: [
            { title: '일간/월간 활성 사용자', path: '/analysis/service/dau_mau', icon: 'person' },
            { title: '매출 현황', path: '/analysis/service/sales', icon: 'payments' }
          ]
        }
      ]
    }
  };

  const getCurrentNav = () => {
    for (const [key, nav] of Object.entries(navigationStructure)) {
      if (location.pathname.startsWith(key)) {
        return nav;
      }
    }
    return null;
  };

  const toggleSection = (sectionPath) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionPath]: !prev[sectionPath]
    }));
  };

  useEffect(() => {
    // 현재 경로에 해당하는 섹션을 자동으로 열기
    const currentNav = getCurrentNav();
    if (currentNav) {
      const newOpenSections = {};
      currentNav.sections.forEach(section => {
        if (location.pathname.startsWith(section.path)) {
          newOpenSections[section.path] = true;
        }
      });
      setOpenSections(newOpenSections);
    }
  }, [location.pathname]);

  const currentNav = getCurrentNav();

  if (!currentNav) {
    return null;
  }

  return (
    <div className="lnb">
      <div className="lnb-header">
        <h3>
          <span className="material-symbols-outlined" style={{ marginRight: '8px' }}>{currentNav.icon}</span>
          {currentNav.title}
        </h3>
      </div>
      
      <nav className="lnb-nav">
        {currentNav.sections.map((section) => (
          <div key={section.path} className="lnb-section">
            <div
              className={`lnb-section-title ${openSections[section.path] ? 'open' : ''}`}
              onClick={() => toggleSection(section.path)}
            >
              <span>
                <span className="material-symbols-outlined" style={{ marginRight: '8px' }}>{section.icon}</span>
                {section.title}
              </span>
              <span className="arrow material-symbols-outlined">{openSections[section.path] ? 'expand_more' : 'chevron_right'}</span>
            </div>
            
            {openSections[section.path] && (
              <ul className="lnb-items">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`lnb-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      <span className="material-symbols-outlined" style={{ marginRight: '8px' }}>{item.icon}</span>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default LNB; 