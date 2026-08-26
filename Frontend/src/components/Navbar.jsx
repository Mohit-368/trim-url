import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.scss';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Hook for programmatic navigation on the buttons
  const navigate = useNavigate();

  // Add glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to close mobile menu on navigation
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`premium-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* Logo -> Routes to Home */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Activity size={24} className="logo-icon" />
          <span className="logo-text">TrimLink</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          <Link to="/features" className="nav-link">Features</Link>
        </div>

        {/* Actions */}
        <div className="nav-actions desktop-only">
          <button className="login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="dashboard-btn" onClick={() => navigate('/dashboard')}>
            Dashboard
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/features" onClick={closeMenu}>Features</Link>
        
        <div className="mobile-actions">
          <button 
            className="login-btn" 
            onClick={() => { 
              navigate('/login'); 
              closeMenu(); 
            }}
          >
            Log In
          </button>
          <button 
            className="dashboard-btn" 
            onClick={() => { 
              navigate('/dashboard'); 
              closeMenu(); 
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;