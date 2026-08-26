import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MousePointerClick, MapPin, Laptop, Smartphone, 
  ArrowRight, Zap, Terminal, BarChart3, Globe2, 
  Shield, Code2, Activity 
} from 'lucide-react';
import './Home.scss';

const Home = () => {
  // Initialize programmatic routing
  const navigate = useNavigate();

  return (
    <main className="premium-home">
      {/* 1. Animated Tech Background */}
      <div className="animated-bg">
        <div className="grid-overlay"></div>
        <div className="glow-orb red-1"></div>
        <div className="glow-orb red-2"></div>
      </div>

      <div className="content-container">
        
        {/* 2. Hero Section */}
        <section className="hero-section">
          <div className="badge animate-drop">
            <Activity size={14} className="icon-pulse" />
            <span>v2.0 Link Analytics Engine</span>
          </div>
          
          <h1 className="hero-title animate-rise-1">
            Short Links. <br/>
            <span className="text-gradient">Infinite Data.</span>
          </h1>
          
          <p className="hero-subtitle animate-rise-2">
            The ultimate URL shortener engineered for total traffic visibility. 
            Capture clicks, map global origins, and fingerprint device hardware 
            in real-time with zero latency.
          </p>
          
          <div className="cta-wrapper animate-rise-3">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Deploy Your First Link
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => navigate('/features')}>
              <Terminal size={18} />
              Features
            </button>
          </div>
        </section>

        {/* 3. Infinite Marquee (Social Proof / Tech Stack) */}
        <div className="tech-marquee animate-fade-in">
          <div className="marquee-track">
            <span>Powered by Node.js</span><div className="dot"></div>
            <span>Global Edge Network</span><div className="dot"></div>
            <span>99.9% Uptime</span><div className="dot"></div>
            <span>Real-time WebSockets</span><div className="dot"></div>
            <span>REST API Ready</span><div className="dot"></div>
            {/* Duplicated for infinite scroll effect */}
            <span>Powered by Node.js</span><div className="dot"></div>
            <span>Global Edge Network</span><div className="dot"></div>
            <span>99.9% Uptime</span><div className="dot"></div>
            <span>Real-time WebSockets</span><div className="dot"></div>
            <span>REST API Ready</span><div className="dot"></div>
          </div>
        </div>

        {/* 4. Premium Bento Box Grid */}
        <section className="bento-grid">
          {/* Main Chart Card */}
          <div className="bento-card span-2 animate-pop">
            <div className="card-header">
              <BarChart3 className="accent-icon" size={24} />
              <h3>Real-Time Traffic Flow</h3>
            </div>
            <p>Monitor your link performance the millisecond it's clicked. Our engine processes requests globally.</p>
            <div className="mock-chart-container">
              <div className="chart-bar" style={{height: '40%'}}></div>
              <div className="chart-bar" style={{height: '70%'}}></div>
              <div className="chart-bar" style={{height: '50%'}}></div>
              <div className="chart-bar" style={{height: '90%'}}></div>
              <div className="chart-bar highlight" style={{height: '100%'}}></div>
              <div className="chart-bar" style={{height: '60%'}}></div>
              <div className="chart-bar" style={{height: '30%'}}></div>
            </div>
          </div>

          {/* Geo Card */}
          <div className="bento-card animate-pop delay-1">
            <div className="card-header">
              <Globe2 className="accent-icon" size={24} />
              <h3>Geo-Mapping</h3>
            </div>
            <p>Track request origins by country to optimize your global reach.</p>
            <div className="geo-list">
              <div className="geo-item"><span>United States</span> <span className="stat">45%</span></div>
              <div className="geo-item"><span>India</span> <span className="stat">32%</span></div>
              <div className="geo-item"><span>Germany</span> <span className="stat">12%</span></div>
            </div>
          </div>

          {/* Device Hardware Card */}
          <div className="bento-card animate-pop delay-2">
            <div className="card-header">
              <Laptop className="accent-icon" size={24} />
              <h3>Device Intel</h3>
            </div>
            <p>Granular breakdown of hardware accessing your links.</p>
            <div className="device-stats">
              <div className="stat-circle">
                <Smartphone size={20}/>
                <span>68% Android</span>
              </div>
              <div className="stat-circle dark">
                <Laptop size={20}/>
                <span>32% Mac/PC</span>
              </div>
            </div>
          </div>

          {/* Developer API Card */}
          <div className="bento-card span-2 animate-pop delay-3">
            <div className="card-header">
              <Code2 className="accent-icon" size={24} />
              <h3>Developer Ready API</h3>
            </div>
            <p>Integrate our shortening and analytics engine directly into your own applications.</p>
            <div className="code-block">
              <div className="code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="filename">request.js</span>
              </div>
              <pre>
                <code>
                  <span className="keyword">const</span> response = <span className="keyword">await</span> fetch(<span className="string">'https://api.trimlink.com/v1/shorten'</span>, {'{'} <br/>
                  &nbsp;&nbsp;method: <span className="string">'POST'</span>, <br/>
                  &nbsp;&nbsp;body: JSON.stringify({'{'} url: <span className="string">'https://your-long-url.com'</span> {'}'}) <br/>
                  {'}'});<br/>
                  <span className="keyword">const</span> data = <span className="keyword">await</span> response.json();
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* 5. Bottom CTA */}
        <section className="final-cta animate-fade-in delay-4">
          <h2>Stop flying blind.</h2>
          <p>Get the data you deserve from every link you share.</p>
          <button className="btn-primary large" onClick={() => navigate('/register')}>
            Create Your Account
            <Shield size={20} />
          </button>
        </section>

      </div>
    </main>
  );
};

export default Home;