import { useState } from 'react';
import { login } from '../utils/api';
import './Auth.css';

function Login({ onLogin, onSwitchPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(email, password);
      const userData = {
        id: response.userId,
        role: response.role,
      };
      onLogin(userData, response.token);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="form-input-wrapper">
                <span className="form-icon">📧</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <span className="form-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large auth-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Signing In...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <button
                type="button"
                className="auth-switch-btn"
                onClick={onSwitchPage}
              >
                Create one
              </button>
            </p>
          </div>
        </div>

        <div className="auth-side">
          <div className="auth-side-content">
            <h2>Manage Your Notices Effortlessly</h2>
            <ul className="auth-features">
              <li>
                <span className="feature-icon">✨</span>
                Premium UI Design
              </li>
              <li>
                <span className="feature-icon">🔒</span>
                Secure Authentication
              </li>
              <li>
                <span className="feature-icon">📋</span>
                Easy Notice Management
              </li>
              <li>
                <span className="feature-icon">👥</span>
                Role-Based Access
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
