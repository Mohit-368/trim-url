import React from 'react';
import { 
  Zap, Globe2, Code2, ShieldCheck, 
  BarChart3, Cpu, Lock, ArrowRight,
  GitMerge, Server, LockKeyhole, MousePointerClick,
  Smartphone, Monitor, Tablet, MapPin
} from 'lucide-react';
import './Features.scss';

const Features = () => {
  return (
    <main className="features-page">
      {/* 1. Animated Tech Background */}
      <div className="animated-bg">
        <div className="grid-overlay"></div>
        <div className="glow-orb red-1"></div>
        <div className="glow-orb red-2"></div>
      </div>

      <div className="content-container">
        
        {/* 2. Page Header */}
        <header className="features-header animate-rise-1">
          <div className="badge">
            <Cpu size={14} className="icon-pulse" />
            <span>Core Infrastructure</span>
          </div>
          <h1 className="title">
            Engineered for <span className="text-gradient">Granular Insights.</span>
          </h1>
          <p className="subtitle">
            Track performance down to the exact click. Get real-time link-level diagnostics, 
            device breakdowns, and geographical distribution across every single short URL.
          </p>
        </header>

        {/* 3. Deep Dive Feature Sections */}
        <div className="feature-deep-dives">

          {/* NEW FEATURE: Per-Link Granular Telemetry */}
          <section className="deep-dive-row animate-rise-2">
            <div className="text-content">
              <div className="feature-icon"><MousePointerClick size={24} /></div>
              <h2>Per-Link Click & Engagement Telemetry</h2>
              <p>
                Get full visibility into individual link performance. Monitor exact click counts, 
                peak traffic hours, and historical growth velocity for every single URL generated in your workspace.
              </p>
              <ul className="feature-list">
                <li><ShieldCheck size={16} /> Real-time total and unique click counters</li>
                <li><ShieldCheck size={16} /> Hourly & daily click distribution graphs</li>
                <li><ShieldCheck size={16} /> Conversion tracking with goal completion tags</li>
              </ul>
            </div>
            <div className="visual-content">
              <div className="mock-glass-panel telemetry-card">
                <div className="card-header">
                  <div className="link-info">
                    <span className="short-url">trim.link/product-launch</span>
                    <span className="status-dot online">Live</span>
                  </div>
                  <div className="total-clicks">
                    <span className="count">128,492</span>
                    <span className="label">Total Clicks</span>
                  </div>
                </div>

                <div className="click-sparkline">
                  <div className="bar-group">
                    <div className="bar" style={{ height: '40%' }}></div>
                    <div className="bar" style={{ height: '65%' }}></div>
                    <div className="bar" style={{ height: '35%' }}></div>
                    <div className="bar" style={{ height: '85%' }}></div>
                    <div className="bar active" style={{ height: '100%' }}></div>
                    <div className="bar" style={{ height: '70%' }}></div>
                    <div className="bar" style={{ height: '90%' }}></div>
                  </div>
                  <span className="sparkline-caption">Peak: 14.2k clicks / hr</span>
                </div>
              </div>
            </div>
          </section>

          {/* NEW FEATURE: Country & Geo Demographics */}
          <section className="deep-dive-row reverse animate-rise-3">
            <div className="text-content">
              <div className="feature-icon"><MapPin size={24} /></div>
              <h2>Country & Regional Geo Demographics</h2>
              <p>
                Discover exactly where your audience lives. Every click is resolved down to the country, region, and city level, giving you precise geographic mapping for targeting optimization.
              </p>
              <ul className="feature-list">
                <li><ShieldCheck size={16} /> Country-level click volume breakdown</li>
                <li><ShieldCheck size={16} /> ISP and city-level geolocation logs</li>
                <li><ShieldCheck size={16} /> Privacy-first IP masking (GDPR/CCPA compliant)</li>
              </ul>
            </div>
            <div className="visual-content">
              <div className="mock-glass-panel geo-card">
                <div className="panel-header">
                  <Globe2 size={16} /> Top Country Demographics
                </div>
                <div className="country-list">
                  <div className="country-row">
                    <div className="country-meta">
                      <span className="flag">🇺🇸</span>
                      <span className="name">United States</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-fill" style={{ width: '58%' }}></div>
                    </div>
                    <span className="pct">58%</span>
                  </div>
                  <div className="country-row">
                    <div className="country-meta">
                      <span className="flag">🇩🇪</span>
                      <span className="name">Germany</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-fill" style={{ width: '22%' }}></div>
                    </div>
                    <span className="pct">22%</span>
                  </div>
                  <div className="country-row">
                    <div className="country-meta">
                      <span className="flag">🇬🇧</span>
                      <span className="name">United Kingdom</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-fill" style={{ width: '12%' }}></div>
                    </div>
                    <span className="pct">12%</span>
                  </div>
                  <div className="country-row">
                    <div className="country-meta">
                      <span className="flag">🇯🇵</span>
                      <span className="name">Japan</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-fill" style={{ width: '8%' }}></div>
                    </div>
                      <span className="pct">8%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW FEATURE: Per-Link Device & OS Breakdown */}
          <section className="deep-dive-row animate-rise-4">
            <div className="text-content">
              <div className="feature-icon"><Smartphone size={24} /></div>
              <h2>Device & Platform Identification</h2>
              <p>
                Understand how visitors view your content. Analyze device types, operating systems, and browsers on a per-link basis to tailor landing pages and product experiences.
              </p>
              <ul className="feature-list">
                <li><ShieldCheck size={16} /> Mobile vs. Desktop vs. Tablet splits</li>
                <li><ShieldCheck size={16} /> Operating system detection (iOS, Android, macOS, Windows)</li>
                <li><ShieldCheck size={16} /> In-app browser detection (Instagram, X, TikTok)</li>
              </ul>
            </div>
            <div className="visual-content">
              <div className="mock-glass-panel device-card">
                <div className="panel-header">
                  Device Distribution
                </div>
                
                <div className="device-distribution-bar">
                  <div className="seg mobile" style={{ width: '64%' }}></div>
                  <div className="seg desktop" style={{ width: '28%' }}></div>
                  <div className="seg tablet" style={{ width: '8%' }}></div>
                </div>

                <div className="device-grid">
                  <div className="device-stat-box">
                    <Smartphone size={20} className="icon mobile" />
                    <div className="info">
                      <span className="type">Mobile</span>
                      <span className="val">64% (82,234)</span>
                    </div>
                  </div>
                  <div className="device-stat-box">
                    <Monitor size={20} className="icon desktop" />
                    <div className="info">
                      <span className="type">Desktop</span>
                      <span className="val">28% (35,977)</span>
                    </div>
                  </div>
                  <div className="device-stat-box">
                    <Tablet size={20} className="icon tablet" />
                    <div className="info">
                      <span className="type">Tablet</span>
                      <span className="val">8% (10,281)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature: Webhooks & API */}
          <section className="deep-dive-row reverse animate-rise-4">
            <div className="text-content">
              <div className="feature-icon"><Code2 size={24} /></div>
              <h2>Webhooks & Developer API</h2>
              <p>
                Stream individual click events directly into your database. Recieve instant webhook payloads containing link click count updates, country ISO codes, and user-agent details.
              </p>
              <ul className="feature-list">
                <li><ShieldCheck size={16} /> Sub-50ms HTTP webhook dispatch</li>
                <li><ShieldCheck size={16} /> HMAC SHA-256 signature security</li>
                <li><ShieldCheck size={16} /> Programmatic link management API</li>
              </ul>
            </div>
            <div className="visual-content">
              <div className="mock-glass-panel code-panel">
                <div className="panel-header">
                  <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                  <span className="title">link_analytics_event.json</span>
                </div>
                <pre>
                  <code>
<span className="key">"link_id"</span>: <span className="string">"trim.link/product-launch"</span>,<br/>
<span className="key">"total_clicks"</span>: <span className="number">128492</span>,<br/>
<span className="key">"analytics"</span>: {'{'}<br/>
&nbsp;&nbsp;<span className="key">"country"</span>: <span className="string">"US"</span>,<br/>
&nbsp;&nbsp;<span className="key">"city"</span>: <span className="string">"San Francisco"</span>,<br/>
&nbsp;&nbsp;<span className="key">"device"</span>: <span className="string">"Mobile (iPhone 15 Pro)"</span>,<br/>
&nbsp;&nbsp;<span className="key">"browser"</span>: <span className="string">"Safari"</span><br/>
{'}'}
                  </code>
                </pre>
              </div>
            </div>
          </section>

        </div>

        {/* 4. Secondary Features Grid */}
        <section className="secondary-features animate-fade-in delay-4">
          <div className="grid-header">
            <h2>Complete Control Over Every Link</h2>
          </div>
          <div className="features-grid">
            <div className="grid-card">
              <MousePointerClick className="card-icon" size={28} />
              <h3>Per-Link Analytics</h3>
              <p>Individual performance dashboards for every short URL created in your account.</p>
            </div>
            <div className="grid-card">
              <Globe2 className="card-icon" size={28} />
              <h3>Country Targeting</h3>
              <p>Direct users to localized landing pages based on their IP address location.</p>
            </div>
            <div className="grid-card">
              <Smartphone className="card-icon" size={28} />
              <h3>Device Detection</h3>
              <p>Route visitors dynamically depending on whether they use iOS, Android, or Desktop.</p>
            </div>
            <div className="grid-card">
              <LockKeyhole className="card-icon" size={28} />
              <h3>Password Protection</h3>
              <p>Lock sensitive destination links behind end-to-end encrypted password prompts.</p>
            </div>
            <div className="grid-card">
              <Zap className="card-icon" size={28} />
              <h3>Bulk Creation</h3>
              <p>Generate thousands of trackable links via API or CSV batch import in seconds.</p>
            </div>
            <div className="grid-card">
              <Server className="card-icon" size={28} />
              <h3>CSV Data Export</h3>
              <p>Download full click, country, and device records per link for custom BI reporting.</p>
            </div>
          </div>
        </section>

        {/* 5. Bottom CTA */}
        <section className="bottom-cta animate-fade-in delay-5">
          <div className="cta-content">
            <h2>Ready to track every click with precision?</h2>
            <p>Deploy TrimLink today and start collecting deep per-link analytics.</p>
            <button className="btn-primary">
              Get Started Free <ArrowRight size={18} />
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Features;