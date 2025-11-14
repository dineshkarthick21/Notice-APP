import { useState } from 'react';
import { signup, login } from '../utils/api';
import './Auth.css';

function Signup({ onSignup, onSwitchPage }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await signup(name, email, password, role);
      // Auto login after signup
      const loginResponse = await login(email, password);
      const userData = {
        id: loginResponse.userId,
        role: loginResponse.role,
      };
      onSignup(userData, loginResponse.token);
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-side">
          <div className="auth-side-content">
            <h2>Join Our Community</h2>
            <ul className="auth-features">
              <li>
                <span className="feature-icon">🎯</span>
                Get Started in Seconds
              </li>
              <li>
                <span className="feature-icon">🛡️</span>
                Your Data is Secure
              </li>
              <li>
                <span className="feature-icon">⚡</span>
                Fast & Reliable
              </li>
              <li>
                <span className="feature-icon">🌟</span>
                Premium Experience
              </li>
            </ul>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Sign up to get started</p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <span>⚠️</span>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="form-input-wrapper">
                <span className="form-icon">👤</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="form-input-wrapper">
                <span className="form-icon">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
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
                  Creating Account...
                </>
              ) : (
                <>
                  <span>✨</span>
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <button
                type="button"
                className="auth-switch-btn"
                onClick={onSwitchPage}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
