import React from 'react';
import { Terminal, Home, ArrowLeft, Unplug } from 'lucide-react';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="notfound-container">
      {/* Background Ambience */}
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="notfound-layout">
        
        {/* CSS Glitch 404 Display */}
        <div className="glitch-wrapper">
          <h1 className="glitch" data-text="404">404</h1>
        </div>

        {/* Humorous Terminal Animation */}
        <div className="terminal-box glass-panel">
          <div className="terminal-header">
            <Terminal size={14} className="term-icon" />
            <span>root@trimlink.sys: /var/log/routing_errors</span>
            <div className="term-controls">
              <span></span><span></span><span></span>
            </div>
          </div>
          <div className="terminal-body">
            <p className="typewriter line-1">
              <span className="prompt">$</span> tracing route to destination...
            </p>
            <p className="typewriter line-2">
              <span className="prompt">$</span> checking CI/CD deployment pipelines... <span className="error">[FAILED]</span>
            </p>
            <p className="typewriter line-3">
              <span className="prompt">$</span> interrogating the load balancer... <span className="error">[IGNORED]</span>
            </p>
            <p className="typewriter line-4">
              <span className="prompt">$</span> FATAL ERROR: Target node evaporated into the void.
            </p>
            <p className="typewriter line-5">
              <span className="prompt">$</span> <span className="cursor-blink">_</span>
            </p>
          </div>
        </div>

        {/* Recovery Actions */}
        <div className="recovery-actions">
          <button className="action-btn outline" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
          <button className="action-btn solid" onClick={() => window.location.href = '/'}>
            <Home size={18} />
            <span>Return to Base</span>
          </button>
        </div>
        
        <div className="status-badge">
          <Unplug size={14} className="spin-slow" />
          <span>Connection Severed</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;