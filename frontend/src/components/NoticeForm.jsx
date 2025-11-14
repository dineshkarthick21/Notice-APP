import { useState, useEffect } from 'react';
import './NoticeForm.css';

function NoticeForm({ notice, onSubmit, onCancel, isLoading }) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    type: 'leave',
  });

  useEffect(() => {
    if (notice) {
      const noticeDate = new Date(notice.date);
      const formattedDate = noticeDate.toISOString().split('T')[0];
      setFormData({
        title: notice.title || '',
        date: formattedDate || '',
        type: notice.type || 'leave',
      });
    }
  }, [notice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!formData.date) {
      alert('Please select a date');
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', date: '', type: 'leave' });
  };

  return (
    <form className="notice-form" onSubmit={handleSubmit}>
      <h2>{notice ? '✏️ Edit Notice' : '➕ Create New Notice'}</h2>

      <div className="form-group">
        <label className="form-label">Notice Title *</label>
        <input
          type="text"
          name="title"
          className="form-input"
          placeholder="e.g., College Holidays"
          value={formData.title}
          onChange={handleChange}
          maxLength={200}
          required
        />
        <small>{formData.title.length}/200</small>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Date *</label>
          <input
            type="date"
            name="date"
            className="form-input"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type *</label>
          <select
            name="type"
            className="form-select"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="leave">🚫 Leave</option>
            <option value="college">🏫 College</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          ✕ Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-small"></span>
              {notice ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>{notice ? '✏️ Update Notice' : '➕ Create Notice'}</>
          )}
        </button>
      </div>
    </form>
  );
}

export default NoticeForm;
