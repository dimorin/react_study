import React, { useState } from 'react';
import './UserLogs.css';

const UserLogs = () => {
  const [logs] = useState([
    {
      id: 1,
      userId: 1,
      userName: '김철수',
      action: '로그인',
      timestamp: '2024-12-20 14:30:25',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0'
    },
    {
      id: 2,
      userId: 2,
      userName: '이영희',
      action: '게시글 작성',
      timestamp: '2024-12-20 13:15:42',
      ip: '192.168.1.101',
      userAgent: 'Safari 17.2.1'
    },
    {
      id: 3,
      userId: 3,
      userName: '박민수',
      action: '댓글 작성',
      timestamp: '2024-12-20 12:45:18',
      ip: '192.168.1.102',
      userAgent: 'Firefox 121.0'
    },
    {
      id: 4,
      userId: 1,
      userName: '김철수',
      action: '로그아웃',
      timestamp: '2024-12-20 11:30:05',
      ip: '192.168.1.100',
      userAgent: 'Chrome 120.0.0.0'
    },
    {
      id: 5,
      userId: 4,
      userName: '정미영',
      action: '회원가입',
      timestamp: '2024-12-20 10:15:32',
      ip: '192.168.1.103',
      userAgent: 'Edge 120.0.0.0'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === '' || log.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const getActionBadgeClass = (action) => {
    switch (action) {
      case '로그인':
        return 'success';
      case '로그아웃':
        return 'secondary';
      case '회원가입':
        return 'primary';
      case '게시글 작성':
      case '댓글 작성':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="user-logs">
      <div className="page-header">
        <h1>로그</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> <span class="material-symbols-outlined">chevron_right</span> <span>사용자</span> <span class="material-symbols-outlined">chevron_right</span> <span className="current">로그</span>
        </nav>
      </div>
      <div className="page-content">
        <div className="page-content-wrapper">
          <div className="log-controls">
            <div className="search-filters">
              <input
                type="text"
                placeholder="사용자명 또는 활동으로 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="filter-select"
              >
                <option value="">모든 활동</option>
                <option value="로그인">로그인</option>
                <option value="로그아웃">로그아웃</option>
                <option value="회원가입">회원가입</option>
                <option value="게시글 작성">게시글 작성</option>
                <option value="댓글 작성">댓글 작성</option>
              </select>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setActionFilter('');
                }}
              >
                초기화
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>로그 ID</th>
                  <th>사용자</th>
                  <th>활동</th>
                  <th>시간</th>
                  <th>IP 주소</th>
                  <th>사용자 에이전트</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>
                      <div className="">
                        <span className="user-name">{log.userName}</span>
                        <span className="user-id">(ID: {log.userId})</span>
                      </div>
                    </td>
                    <td>
                      <span className={`action-badge ${getActionBadgeClass(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td>{log.timestamp}</td>
                    <td>{log.ip}</td>
                    <td className="user-agent">{log.userAgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="log-summary">
            <div className="summary-item">
              <span className="summary-label">총 로그 수:</span>
              <span className="summary-value">{filteredLogs.length}건</span>
            </div>
          </div>
        </div>        
      </div>      
    </div>
  );
};

export default UserLogs; 