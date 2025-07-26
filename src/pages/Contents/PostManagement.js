import React from 'react';

const PostManagement = () => {
  return (
    <div className="post-management">
      <div className="page-header">
        <h1>게시글 관리</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> &gt; <span>콘텐츠 관리</span> &gt; <span className="current">게시글 관리</span>
        </nav>
      </div>
      
      <div className="coming-soon">
        <h2>🚧 개발 중</h2>
        <p>게시글 관리 기능이 곧 추가될 예정입니다.</p>
      </div>
    </div>
  );
};

export default PostManagement; 