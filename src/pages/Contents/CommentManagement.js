import React from 'react';

const CommentManagement = () => {
  return (
    <div className="comment-management">
      <div className="page-header">
        <h1>댓글 관리</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> &gt; <span>콘텐츠 관리</span> &gt; <span className="current">댓글 관리</span>
        </nav>
      </div>
      <div className="page-content">
        <div className="coming-soon">
          <h2>개발 중</h2>
          <p>댓글 관리 기능이 곧 추가될 예정입니다.</p>
        </div>
      </div>      
    </div>
  );
};

export default CommentManagement; 