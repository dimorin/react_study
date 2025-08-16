import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserModal from '../../components/Modals/UserModal';
import DeleteConfirmModal from '../../components/Modals/DeleteConfirmModal';
import './UserList.css';
import { fetchUsers } from '../../services/usersApi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  const itemsPerPage = 10;

  // API에서 사용자 목록을 가져옴
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await fetchUsers();
        // 화면에서 사용 중인 필드에 맞춰 매핑
        const mapped = data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone || '-',
          joinDate: '-',
          lastLogin: '-',
          status: '활성'
        }));
        setUsers(mapped);
      } catch (err) {
        setError(err.message || '알 수 없는 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleCreateUser = (userData) => {
    const newUser = {
      id: users.length + 1,
      ...userData,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: '-'
    };
    setUsers([...users, newUser]);
    setShowCreateModal(false);
  };

  const handleEditUser = (userData) => {
    setUsers(users.map(user => 
      user.id === selectedUser.id ? { ...user, ...userData } : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const filteredAndSortedUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === '' || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="user-list">
      <div className="page-header">
        <h1>회원</h1>
        <nav className="breadcrumb">
          <span>운영 관리</span> <span class="material-symbols-outlined">chevron_right</span> <span>사용자</span> <span class="material-symbols-outlined">chevron_right</span> <span className="current">회원</span>
        </nav>
      </div>
      <div className="page-content">
        <div className="page-content-wrapper">
          {isLoading && (
            <div className="loading">불러오는 중...</div>
          )}
          {error && (
            <div className="loading" style={{ color: '#c00' }}>{error}</div>
          )}

          <div className="list-controls">
            <div className="search-filters">
              <input
                type="text"
                placeholder="회원 ID, 이름, 이메일로 검색"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <select
                value={statusFilter}
                onChange={handleStatusFilter}
                className="filter-select"
              >
                <option value="">전체 상태</option>
                <option value="활성">활성</option>
                <option value="비활성">비활성</option>
                <option value="탈퇴">탈퇴</option>
              </select>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                }}
              >
                초기화
              </button>
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              + 새 회원 등록
            </button>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')} className="sortable">
                    회원 ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('name')} className="sortable">
                    이름 {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('email')} className="sortable">
                    이메일 {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>연락처</th>
                  <th onClick={() => handleSort('joinDate')} className="sortable">
                    가입일 {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>최종 로그인</th>
                  <th onClick={() => handleSort('status')} className="sortable">
                    상태 {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user) => (
                  <tr key={user.id} onClick={() => console.log('Navigate to user detail')}>
                    <td>{user.id}</td>
                    <td>
                      <Link to={`/operation/users/list/${user.id}`} className="user-link">
                        {user.name}
                      </Link>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.joinDate}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <span className={`status-badge ${user.status === '활성' ? 'active' : 'inactive'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="btn btn-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              이전
            </button>
            <span className="page-info">
              {currentPage} / {totalPages} 페이지 (총 {filteredAndSortedUsers.length}건)
            </span>
            <button
              className="btn btn-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              다음
            </button>
          </div>  
        </div>        
      </div>
      

      {showCreateModal && (
        <UserModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
          title="새 회원 등록"
        />
      )}

      {showEditModal && selectedUser && (
        <UserModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSubmit={handleEditUser}
          title="회원 정보 수정"
          user={selectedUser}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDeleteUser}
          title="회원 삭제"
          message={`선택하신 회원 ${selectedUser.name} (ID: ${selectedUser.id})을(를) 정말로 삭제하시겠습니까?`}
          subMessage="삭제된 데이터는 복구할 수 없습니다."
        />
      )}
    </div>
  );
};

export default UserList; 