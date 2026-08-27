import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Globe2,
  BarChart3,
  ShieldCheck,
  Terminal,
  Trash2,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLinks } from '../hooks/useLinks';
import './Dashboard.scss';

const Dashboard = () => {
  const { user } = useAuth();
  const { links, status, error, fetchLinks, createLink, removeLink } = useLinks();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ original_link: '', trim_link: '', expires_at: '' });
  const [formError, setFormError] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!formData.original_link || !formData.trim_link) {
      setFormError('Both the destination URL and a short alias are required.');
      return;
    }

    setCreating(true);
    try {
      await createLink({
        original_link: formData.original_link,
        trim_link: formData.trim_link,
        expires_at: formData.expires_at || null,
      });
      setFormData({ original_link: '', trim_link: '', expires_at: '' });
      setShowForm(false);
    } catch (err) {
      setFormError(err.data?.message || 'Failed to create link.');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await removeLink(id);
    } catch {
      // fetchLinks() below still reflects reality even if this silently fails
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dynamic Background Elements */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="dashboard-layout">

        {/* HEADER GREETING */}
        <header className="dashboard-header">
          <h1>
            hello <span className="highlight-name">{`{${user?.username || '...'}}`}</span>
            <span className="cursor-blink">_</span>
          </h1>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="dashboard-main glass-panel">

          {/* CONTROLS (All Links & Add Links +) */}
          <div className="controls-row">
            <div className="section-title">
              <Globe2 size={20} className="title-icon" />
              <h2>All Links</h2>
            </div>
            <button className="add-link-btn" onClick={() => setShowForm((v) => !v)}>
              <span>{showForm ? 'cancel' : 'add links'}</span>
              <Plus size={18} style={{ transform: showForm ? 'rotate(45deg)' : 'none' }} />
            </button>
          </div>

          {showForm && (
            <form className="create-link-panel" onSubmit={handleCreate}>
              {formError && (
                <div className="error-banner">
                  <Terminal size={16} />
                  <span>{formError}</span>
                </div>
              )}
              <div className="create-link-fields">
                <div className="form-group">
                  <label htmlFor="original_link">Destination URL</label>
                  <input
                    type="url"
                    id="original_link"
                    name="original_link"
                    placeholder="https://your-long-destination-url.com"
                    value={formData.original_link}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trim_link">Short Alias</label>
                  <input
                    type="text"
                    id="trim_link"
                    name="trim_link"
                    placeholder="my-alias"
                    value={formData.trim_link}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expires_at">Expires (optional)</label>
                  <input
                    type="date"
                    id="expires_at"
                    name="expires_at"
                    value={formData.expires_at}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className="add-link-btn" disabled={creating}>
                <span>{creating ? 'creating…' : 'create link'}</span>
                {creating ? <Loader2 size={18} className="spin-icon" /> : <Plus size={18} />}
              </button>
            </form>
          )}

          <div className="divider"></div>

          {/* Links Data View */}
          <div className="links-data-view">
            {status === 'loading' && (
              <p className="empty-state">Loading your links…</p>
            )}

            {status === 'error' && (
              <div className="error-banner">
                <Terminal size={16} />
                <span>{error}</span>
              </div>
            )}

            {status === 'success' && links.length === 0 && (
              <p className="empty-state">No links yet — create your first one above.</p>
            )}

            {links.length > 0 && (
              <>
                <div className="table-header">
                  <div className="col">Alias / Target</div>
                  <div className="col">Telemetry</div>
                  <div className="col">Status</div>
                  <div className="col">Actions</div>
                </div>

                {links.map((link) => {
                  const isExpired = link.expires_at && new Date(link.expires_at) < new Date();
                  return (
                    <div className="data-row" key={link._id}>
                      <div className="col target-info">
                        <span className="short-link">{link.trim_link}</span>
                        <span className="long-link">{link.original_link}</span>
                      </div>
                      <div className="col stats">
                        <BarChart3 size={14} />
                        <span>{link.clicks?.toLocaleString() || 0} clicks</span>
                      </div>
                      <div className={`col status ${isExpired ? '' : 'active'}`}>
                        <div className="status-dot"></div> {isExpired ? 'Expired' : 'Active'}
                      </div>
                      <div className="col actions">
                        <button
                          className="icon-btn"
                          title="View analytics"
                          onClick={() => navigate(`/analytics/${link._id}`)}
                        >
                          <ShieldCheck size={16} />
                        </button>
                        <button
                          className="icon-btn"
                          title="Delete link"
                          disabled={deletingId === link._id}
                          onClick={() => handleDelete(link._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
