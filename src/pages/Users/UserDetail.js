import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserModal from '../../components/Modals/UserModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import './UserDetail.css';
import { fetchUserById } from '../../services/usersApi';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchUserById(id);
        // 상세 화면에서 사용하는 필드에 맞춰 매핑
        const mapped = {
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone || '-',
          gender: '-',
          birthDate: '-',
          joinDate: '-',
          joinSource: data.website || '-',
          lastLogin: '-',
          loginCount: '-',
          status: '활성',
          zipCode: data.address?.zipcode || '-',
          address: data.address ? `${data.address.street} ${data.address.suite}, ${data.address.city}` : '-',
          detailAddress: '-'
        };
        setUser(mapped);
      } catch (err) {
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
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

  if (isLoading) {
    return (
      <div className="user-detail">
        <div className="loading">불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-detail">
        <div className="loading" style={{ color: '#c00' }}>{error}</div>
      </div>
    );
  }

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
        <h1>{user.name}</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> <span class="material-symbols-outlined">chevron_right</span> <span>사용자</span> <span class="material-symbols-outlined">chevron_right</span> 
          <span>회원</span> <span class="material-symbols-outlined">chevron_right</span> <span className="current">{user.name}</span>
        </nav>
      </div>
      <div className="page-content">
        <div className="page-content-wrapper">
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