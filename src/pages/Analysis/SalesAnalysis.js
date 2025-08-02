import React from 'react';

const SalesAnalysis = () => {
  return (
    <div className="sales-analysis">
      <div className="page-header">
        <h1>매출 현황</h1>
        <nav className="breadcrumb">
          <span>통계 및 분석</span> &gt; <span>서비스 통계</span> &gt; <span className="current">매출 현황</span>
        </nav>
      </div>
      
      <div className="coming-soon">
        <h2>🚧 개발 중</h2>
        <p>매출 분석 기능이 곧 추가될 예정입니다.</p>
      </div>
    </div>
  );
};

export default SalesAnalysis; 