import './NoticeCard.css';

function NoticeCard({ notice }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="notice-card">
      <div className="notice-type-badge">
        {notice.type === 'leave' ? '🚫 Leave' : '🏫 College'}
      </div>
      
      <div className="notice-content">
        <h3 className="notice-title">{notice.title}</h3>
        
        <div className="notice-meta">
          <div className="notice-date">
            <span className="meta-icon">📅</span>
            <span>{formatDate(notice.date)}</span>
          </div>
        </div>

        {notice.createdAt && (
          <div className="notice-footer">
            <small>Posted {formatDate(notice.createdAt)}</small>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoticeCard;
