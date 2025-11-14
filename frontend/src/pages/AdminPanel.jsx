import { useState, useEffect } from 'react';
import {
  getAllNotices,
  createNotice,
  updateNotice,
  deleteNotice,
} from '../utils/api';
import Navbar from '../components/Navbar';
import NoticeForm from '../components/NoticeForm';
import './AdminPanel.css';

function AdminPanel({ user, token, onLogout }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const data = await getAllNotices();
      setNotices(data.notices || []);
      setError('');
    } catch (err) {
      setError('Failed to load notices');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (formData) => {
    try {
      setError('');
      setSuccess('');
      await createNotice(formData.title, formData.date, formData.type, token);
      setSuccess('Notice created successfully!');
      setShowForm(false);
      fetchNotices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to create notice');
    }
  };

  const handleUpdateNotice = async (formData) => {
    try {
      setError('');
      setSuccess('');
      await updateNotice(
        editingNotice._id,
        formData.title,
        formData.date,
        formData.type,
        token
      );
      setSuccess('Notice updated successfully!');
      setEditingNotice(null);
      setShowForm(false);
      fetchNotices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update notice');
    }
  };

  const handleDeleteNotice = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        setError('');
        setSuccess('');
        await deleteNotice(id, token);
        setSuccess('Notice deleted successfully!');
        fetchNotices();
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        setError(err.message || 'Failed to delete notice');
      }
    }
  };

  const filteredNotices = notices.filter((notice) =>
    notice.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-panel">
      <Navbar user={user} onLogout={onLogout} isAdmin={true} />

      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>⚙️ Admin Panel</h1>
            <p>Manage all notices and system content</p>
          </div>
          <button
            className="btn btn-primary btn-large"
            onClick={() => {
              setEditingNotice(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? '✕ Close' : '➕ New Notice'}
          </button>
        </div>

        {error && (
          <div className="alert alert-danger">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>✅</span>
            <p>{success}</p>
          </div>
        )}

        {showForm && (
          <div className="form-section">
            <NoticeForm
              notice={editingNotice}
              onSubmit={editingNotice ? handleUpdateNotice : handleCreateNotice}
              onCancel={() => {
                setShowForm(false);
                setEditingNotice(null);
              }}
              isLoading={loading}
            />
          </div>
        )}

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-number">{notices.length}</div>
              <div className="stat-label">Total Notices</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚫</div>
            <div className="stat-content">
              <div className="stat-number">
                {notices.filter((n) => n.type === 'leave').length}
              </div>
              <div className="stat-label">Leave Notices</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏫</div>
            <div className="stat-content">
              <div className="stat-number">
                {notices.filter((n) => n.type === 'college').length}
              </div>
              <div className="stat-label">College Notices</div>
            </div>
          </div>
        </div>

        <div className="admin-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading notices...</p>
          </div>
        ) : filteredNotices.length === 0 ? (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <h3>No Notices Found</h3>
            <p>Create a new notice to get started</p>
          </div>
        ) : (
          <div className="notices-table-wrapper">
            <table className="notices-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotices.map((notice) => (
                  <tr key={notice._id}>
                    <td className="title-cell">{notice.title}</td>
                    <td className="type-cell">
                      <span className={`type-badge type-${notice.type}`}>
                        {notice.type === 'leave' ? '🚫 Leave' : '🏫 College'}
                      </span>
                    </td>
                    <td>
                      {new Date(notice.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="created-cell">
                      {new Date(notice.createdAt).toLocaleDateString()}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => {
                          setEditingNotice(notice);
                          setShowForm(true);
                        }}
                        title="Edit notice"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteNotice(notice._id)}
                        title="Delete notice"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
