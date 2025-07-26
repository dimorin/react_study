import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LNB.css';

const LNB = () => {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({});

  const navigationStructure = {
    '/operation': {
      title: '운영 관리',
      sections: [
        {
          title: '사용자 관리',
          path: '/operation/users',
          items: [
            { title: '회원 목록', path: '/operation/users/list' },
            { title: '로그 기록', path: '/operation/users/logs' }
          ]
        },
        {
          title: '콘텐츠 관리',
          path: '/operation/contents',
          items: [
            { title: '게시글 관리', path: '/operation/contents/posts' },
            { title: '댓글 관리', path: '/operation/contents/comments' }
          ]
        }
      ]
    },
    '/analysis': {
      title: '통계 및 분석',
      sections: [
        {
          title: '서비스 통계',
          path: '/analysis/service',
          items: [
            { title: '일간/월간 활성 사용자', path: '/analysis/service/dau_mau' },
            { title: '매출 현황', path: '/analysis/service/sales' }
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
    <aside className="lnb">
      <div className="lnb-header">
        <h3>{currentNav.title}</h3>
      </div>
      
      <nav className="lnb-nav">
        {currentNav.sections.map((section) => (
          <div key={section.path} className="lnb-section">
            <div
              className={`lnb-section-title ${openSections[section.path] ? 'open' : ''}`}
              onClick={() => toggleSection(section.path)}
            >
              <span>{section.title}</span>
              <span className="arrow">{openSections[section.path] ? '▼' : '▶'}</span>
            </div>
            
            {openSections[section.path] && (
              <ul className="lnb-items">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`lnb-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default LNB; 