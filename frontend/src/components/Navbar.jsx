import './Navbar.css';

function Navbar({ user, onLogout, isAdmin = false }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">📢</span>
          <span className="brand-name">NoticeBoard</span>
        </div>

        <div className="navbar-content">
          <div className="navbar-user">
            <span className="user-icon">👤</span>
            <div className="user-info">
              <p className="user-name">Welcome!</p>
              {isAdmin && <span className="admin-badge">ADMIN</span>}
            </div>
          </div>
          <button className="btn btn-small" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
