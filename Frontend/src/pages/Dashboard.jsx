import React from 'react';
import { 
  Plus, 
  Globe2, 
  BarChart3, 
  ShieldCheck, 
  GitMerge, 
  Terminal
} from 'lucide-react';
import './Dashboard.scss';

const Dashboard = () => {
  // Mock user data for the wireframe's {user.name} requirement
  const user = {
    name: 'dev_user1'
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
            hello <span className="highlight-name">{`{${user.name}}`}</span>
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
            <button className="add-link-btn">
              <span>add links</span>
              <Plus size={18} />
            </button>
          </div>

          <div className="divider"></div>

          {/* Links Data View */}
          <div className="links-data-view">
            <div className="table-header">
              <div className="col">Alias / Target</div>
              <div className="col">Telemetry</div>
              <div className="col">Status</div>
              <div className="col">Actions</div>
            </div>

            {/* Mock Data Row 1 */}
            <div className="data-row">
              <div className="col target-info">
                <span className="short-link">trim.link/api-v2</span>
                <span className="long-link">https://backend.domain.com/docs/api-v2</span>
              </div>
              <div className="col stats">
                <BarChart3 size={14} />
                <span>12,492 clicks</span>
              </div>
              <div className="col status active">
                <div className="status-dot"></div> Active
              </div>
              <div className="col actions">
                <button className="icon-btn"><ShieldCheck size={16} /></button>
                <button className="icon-btn"><Terminal size={16} /></button>
              </div>
            </div>

            {/* Mock Data Row 2 */}
            <div className="data-row">
              <div className="col target-info">
                <span className="short-link">trim.link/github-repo</span>
                <span className="long-link">https://github.com/organization/repo-name</span>
              </div>
              <div className="col stats">
                <BarChart3 size={14} />
                <span>843 clicks</span>
              </div>
              <div className="col status routing">
                <GitMerge size={14} className="spin-icon" /> Geo-Routing
              </div>
              <div className="col actions">
                <button className="icon-btn"><ShieldCheck size={16} /></button>
                <button className="icon-btn"><Terminal size={16} /></button>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default Dashboard;