import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, Menu, X, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "./Navbar.scss";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    // Adding { passive: true } forces the scroll event not to block page rendering
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className={`premium-nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <Activity size={24} className="logo-icon" />
          <span className="logo-text">TrimLink</span>
        </Link>

        <div className="nav-links desktop-only">
          <Link to="/features" className="nav-link">
            Features
          </Link>
        </div>

        <div className="nav-actions desktop-only">
          {isAuthenticated ? (
            <>
              <span className="nav-link">{user?.username}</span>
              <button
                className="dashboard-btn"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
                <ChevronRight size={16} />
              </button>
              <button className="login-btn" onClick={handleLogout}>
                <LogOut size={16} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Log In
              </button>
              <button
                className="dashboard-btn"
                onClick={() => navigate("/register")}
              >
                Get Started
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/features" onClick={closeMenu}>
          Features
        </Link>

        <div className="mobile-actions">
          {isAuthenticated ? (
            <>
              <button
                className="dashboard-btn"
                onClick={() => {
                  navigate("/dashboard");
                  closeMenu();
                }}
              >
                Dashboard
              </button>
              <button className="login-btn" onClick={handleLogout}>
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
              >
                Log In
              </button>
              <button
                className="dashboard-btn"
                onClick={() => {
                  navigate("/register");
                  closeMenu();
                }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
