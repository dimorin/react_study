import React from 'react';

const PostManagement = () => {
  return (
    <div className="post-management">
      <div className="page-header">
        <h1>게시글</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> <span class="material-symbols-outlined">chevron_right</span> <span>콘텐츠</span> <span class="material-symbols-outlined">chevron_right</span> <span className="current">게시글</span>
        </nav>
      </div>
      <div className="page-content">
        <div className="page-content-wrapper">
          <div className="coming-soon">
            <h2>개발 중</h2>
            <p>게시글 기능이 곧 추가될 예정입니다.</p>
          </div>
        </div>        
      </div>      
    </div>
  );
};

export default PostManagement; 