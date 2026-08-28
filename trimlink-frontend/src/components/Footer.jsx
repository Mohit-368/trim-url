import React from 'react';
import { Activity, ExternalLink } from 'lucide-react';
import './Footer.scss';

// SVG Icons
const Github = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="premium-footer">
      <div className="glow-edge"></div>
      
      <div className="footer-content">
        <div className="footer-hero">
          <h2>READY TO <span className="outline-text">SCALE?</span></h2>
          <p>Join the next generation of data-driven link management.</p>
        </div>

        <div className="footer-grid">
          <div className="brand-col">
            <div className="logo-wrapper">
              <Activity size={28} className="logo-icon" />
              <span>TrimLink</span>
            </div>
            
            <div className="system-status">
              <span className="status-text">
                <span className="status-dot"></span>
                API Systems: Operational
              </span>
              <span className="uptime">99.99% Uptime</span>
            </div>

            <div className="social-links">
              <a href="#github" aria-label="Github"><Github size={20} /></a>
              <a href="#twitter" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#linkedin" aria-label="LinkedIn"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="links-col">
            <h4>Infrastructure</h4>
            <a href="#analytics">Edge Analytics</a>
            <a href="#routing">Smart Routing</a>
            <a href="#api">REST API <ExternalLink size={12} /></a>
            <a href="#webhooks">Webhooks</a>
          </div>

          <div className="links-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#blog">Engineering Blog</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact Support</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} TrimLink Inc. Engineered for scale.
          </p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;