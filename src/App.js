import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import UserList from './pages/Users/UserList';
import UserDetail from './pages/Users/UserDetail';
import UserLogs from './pages/Users/UserLogs';
import PostManagement from './pages/Contents/PostManagement';
import CommentManagement from './pages/Contents/CommentManagement';
import DauMau from './pages/Analysis/DauMau';
import SalesAnalysis from './pages/Analysis/SalesAnalysis';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/operation/users/list" element={<UserList />} />
            <Route path="/operation/users/list/:id" element={<UserDetail />} />
            <Route path="/operation/users/logs" element={<UserLogs />} />
            <Route path="/operation/contents/posts" element={<PostManagement />} />
            <Route path="/operation/contents/comments" element={<CommentManagement />} />
            <Route path="/analysis/service/dau_mau" element={<DauMau />} />
            <Route path="/analysis/service/sales" element={<SalesAnalysis />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App; 