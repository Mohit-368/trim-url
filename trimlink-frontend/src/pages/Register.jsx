import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LockKeyhole, Mail, ArrowRight, ShieldCheck, Code2, Terminal } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './Auth.scss'; // Importing the shared SCSS

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end Validation checks
    if (formData.password.length < 8) {
      setError('Passphrase must contain at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passphrase mismatch. Please verify integrity.');
      return;
    }

    setSubmitting(true);
    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.data?.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Background Ambience */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="brand-badge">
            <Code2 size={20} className="brand-icon" />
            <span>TrimLink.sys</span>
          </div>
          <h2>Create Credentials</h2>
          <p>Register your node for enterprise link management.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-banner">
              <Terminal size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Name / Alias</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="dev_user1"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Secure Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="dev@domain.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Passphrase</label>
            <div className="input-wrapper">
              <LockKeyhole className="input-icon" size={18} />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Verify Passphrase</label>
            <div className="input-wrapper">
              <ShieldCheck className="input-icon" size={18} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="••••••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={submitting}>
            <span>{submitting ? 'Initializing…' : 'Initialize Account'}</span>
            <ArrowRight size={18} className="btn-icon" />
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have clearance?{' '}
            <Link to="/login" className="nav-link">
              Authenticate Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
