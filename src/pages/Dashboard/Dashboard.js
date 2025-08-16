import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const summaryCards = [
    { title: '총 사용자 수', value: '1,234', icon: 'group', trend: '+5.2%' },
    { title: '오늘 등록된 게시글', value: '45', icon: 'note_stack', trend: '+12.3%' },
    { title: '총 매출액', value: '₩12,345,678', icon: 'money_bag', trend: '+8.1%' },
    { title: '활성 사용자', value: '567', icon: 'mode_heat', trend: '+3.7%' }
  ];

  const recentActivities = [
    { id: 1, user: '김철수', action: '로그인', time: '10분 전' },
    { id: 2, user: '이영희', action: '게시글 작성', time: '15분 전' },
    { id: 3, user: '박민수', action: '댓글 작성', time: '20분 전' },
    { id: 4, user: '정미영', action: '회원가입', time: '25분 전' },
    { id: 5, user: '홍길동', action: '로그인', time: '30분 전' }
  ];

  const quickLinks = [
    { title: '회원 관리', path: '/operation/users/list', icon: 'group' },
    { title: '게시글', path: '/operation/contents/posts', icon: 'note_stack' },
    { title: '통계 보기', path: '/analysis/service/dau_mau', icon: 'bar_chart' },
    { title: '매출 현황', path: '/analysis/service/sales', icon: 'money_bag' }
  ];

  return (
    <div className="dashboard">
      <div className="page-content">        
        <div className="summary-cards">
          {summaryCards.map((card, index) => (
            <div key={index} className="summary-card">
              <div className="card-icon">
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <div className="card-content">
                <h3>{card.title}</h3>
                <div className="card-value">{card.value}</div>
                <div className="card-trend positive">{card.trend}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="content-section-wrapper">
          <div className="content-section">
            <div className="section-title">
              <h2>최근 활동 로그</h2>
            </div>
            <div className="recent-activities">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-user">{activity.user}</div>
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section">
            <div className="section-title">
              <h2>최근 7일간 일간 활성 사용자(DAU) 추이</h2>
            </div>
            <div className="chart-placeholder">
              <div className="chart-content">              
                <div className="chart-mock">
                  <div className="chart-bar" style={{height: '60%'}}></div>
                  <div className="chart-bar" style={{height: '75%'}}></div>
                  <div className="chart-bar" style={{height: '45%'}}></div>
                  <div className="chart-bar" style={{height: '80%'}}></div>
                  <div className="chart-bar" style={{height: '90%'}}></div>
                  <div className="chart-bar" style={{height: '70%'}}></div>
                  <div className="chart-bar" style={{height: '85%'}}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-section">
            <div className="section-title">
              <h2>퀵 링크</h2>
            </div>
            <div className="quick-links">
              {quickLinks.map((link, index) => (
                <a key={index} href={link.path} className="quick-link">
                  <div className="link-icon">
                    <span className="material-symbols-outlined">{link.icon}</span>
                  </div>
                  <div className="link-title">{link.title}</div>
                </a>
              ))}
            </div>
          </div>
        </div>        
      </div>      
    </div>
  );
};

export default Dashboard; 