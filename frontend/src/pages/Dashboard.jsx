import { useState, useEffect } from 'react';
import { getAllNotices } from '../utils/api';
import Navbar from '../components/Navbar';
import NoticeCard from '../components/NoticeCard';
import './Dashboard.css';

function Dashboard({ user, token, onLogout }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
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

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || notice.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>📋 Notices</h1>
            <p>Stay updated with all important notices</p>
          </div>
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-number">{notices.length}</div>
              <div className="stat-label">Total Notices</div>
            </div>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="dashboard-filters">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Notices
            </button>
            <button
              className={`filter-btn ${filter === 'leave' ? 'active' : ''}`}
              onClick={() => setFilter('leave')}
            >
              🚫 Leave
            </button>
            <button
              className={`filter-btn ${filter === 'college' ? 'active' : ''}`}
              onClick={() => setFilter('college')}
            >
              🏫 College
            </button>
          </div>

          <button className="btn btn-secondary" onClick={fetchNotices}>
            🔄 Refresh
          </button>
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
            <p>
              {searchTerm || filter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back later for updates'}
            </p>
          </div>
        ) : (
          <div className="notices-grid">
            {filteredNotices.map((notice) => (
              <NoticeCard key={notice._id} notice={notice} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
