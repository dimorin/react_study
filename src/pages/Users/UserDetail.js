import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserModal from '../../components/Modals/UserModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 실제 앱에서는 API에서 데이터를 가져올 것입니다
  const mockUsers = [
    {
      id: 1,
      name: '김철수',
      email: 'kim@example.com',
      phone: '010-1234-5678',
      gender: '남성',
      birthDate: '1990-05-15',
      joinDate: '2024-01-15',
      joinSource: '웹사이트',
      lastLogin: '2024-12-20 14:30',
      loginCount: 45,
      status: '활성',
      zipCode: '12345',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: '1층 101호'
    },
    {
      id: 2,
      name: '이영희',
      email: 'lee@example.com',
      phone: '010-2345-6789',
      gender: '여성',
      birthDate: '1985-08-22',
      joinDate: '2024-02-20',
      joinSource: '모바일 앱',
      lastLogin: '2024-12-19 09:15',
      loginCount: 32,
      status: '활성',
      zipCode: '54321',
      address: '부산시 해운대구 해운대로 456',
      detailAddress: '3층 301호'
    },
    {
      id: 3,
      name: '박민수',
      email: 'park@example.com',
      phone: '010-3456-7890',
      gender: '남성',
      birthDate: '1995-12-03',
      joinDate: '2024-03-10',
      joinSource: '추천',
      lastLogin: '2024-12-18 16:45',
      loginCount: 18,
      status: '비활성',
      zipCode: '67890',
      address: '대구시 중구 중앙대로 789',
      detailAddress: '2층 201호'
    }
  ];

  useEffect(() => {
    const foundUser = mockUsers.find(u => u.id === parseInt(id));
    setUser(foundUser);
  }, [id]);

  const handleEditUser = (userData) => {
    setUser({ ...user, ...userData });
    setShowEditModal(false);
  };

  const handleDeleteUser = () => {
    setShowDeleteModal(false);
    navigate('/operation/users/list');
  };

  const handleBackToList = () => {
    navigate('/operation/users/list');
  };

  if (!user) {
    return (
      <div className="user-detail">
        <div className="loading">사용자를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="user-detail">
      <div className="page-header">
        <h1>회원 상세 정보 - {user.name}</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> &gt; <span>사용자 관리</span> &gt; 
          <span>회원 목록</span> &gt; <span className="current">{user.name}</span>
        </nav>
      </div>

      <div className="detail-actions">
        <button 
          className="btn btn-secondary"
          onClick={handleBackToList}
        >
          목록으로
        </button>
        <div className="action-group">
          <button 
            className="btn btn-primary"
            onClick={() => setShowEditModal(true)}
          >
            회원 정보 수정
          </button>
          <button 
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            회원 삭제
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h2>기본 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>회원 ID</label>
              <span>{user.id}</span>
            </div>
            <div className="info-item">
              <label>이름</label>
              <span>{user.name}</span>
            </div>
            <div className="info-item">
              <label>이메일</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>연락처</label>
              <span>{user.phone}</span>
            </div>
            <div className="info-item">
              <label>성별</label>
              <span>{user.gender}</span>
            </div>
            <div className="info-item">
              <label>생년월일</label>
              <span>{user.birthDate}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>가입 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>가입일</label>
              <span>{user.joinDate}</span>
            </div>
            <div className="info-item">
              <label>가입 경로</label>
              <span>{user.joinSource}</span>
            </div>
            <div className="info-item">
              <label>최종 로그인 일시</label>
              <span>{user.lastLogin}</span>
            </div>
            <div className="info-item">
              <label>로그인 횟수</label>
              <span>{user.loginCount}회</span>
            </div>
            <div className="info-item">
              <label>상태</label>
              <span className={`status-badge ${user.status === '활성' ? 'active' : 'inactive'}`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>주소 정보</h2>
          <div className="info-grid">
            <div className="info-item">
              <label>우편번호</label>
              <span>{user.zipCode}</span>
            </div>
            <div className="info-item full-width">
              <label>기본 주소</label>
              <span>{user.address}</span>
            </div>
            <div className="info-item full-width">
              <label>상세 주소</label>
              <span>{user.detailAddress}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>추가 정보</h2>
          <div className="additional-info">
            <div className="info-card">
              <h3>구매 내역</h3>
              <p>최근 30일간 구매 건수: <strong>3건</strong></p>
              <p>총 구매 금액: <strong>₩156,000</strong></p>
            </div>
            <div className="info-card">
              <h3>게시글 작성</h3>
              <p>총 게시글 수: <strong>12개</strong></p>
              <p>최근 게시글: <strong>2024-12-18</strong></p>
            </div>
            <div className="info-card">
              <h3>댓글 활동</h3>
              <p>총 댓글 수: <strong>45개</strong></p>
              <p>최근 댓글: <strong>2024-12-19</strong></p>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <UserModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditUser}
          title="회원 정보 수정"
          user={user}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteUser}
          title="회원 삭제"
          message={`선택하신 회원 ${user.name} (ID: ${user.id})을(를) 정말로 삭제하시겠습니까?`}
          subMessage="삭제된 데이터는 복구할 수 없습니다."
        />
      )}
    </div>
  );
};

export default UserDetail; 