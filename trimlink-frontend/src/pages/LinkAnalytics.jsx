import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  ArrowLeft,
  Activity,
  Globe2,
  Cpu,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  ExternalLink,
  QrCode,
  Download,
  FileText,
  Terminal
} from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import './LinkAnalytics.scss';

const LinkAnalytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();
  const { link, status, error, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    if (id) fetchAnalytics(id);
  }, [id, fetchAnalytics]);

  const processTelemetry = (dataObj = {}, total = 0) => {
    return Object.entries(dataObj)
      .map(([key, value]) => ({
        name: key,
        count: value,
        percent: total > 0 ? ((value / total) * 100).toFixed(1) : '0.0',
      }))
      .sort((a, b) => b.count - a.count);
  };

  const getDeviceIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower === 'mobile') return <Smartphone size={18} />;
    if (lower === 'tablet') return <Tablet size={18} />;
    return <Monitor size={18} />;
  };

  const downloadQR = async () => {
    if (!link?.qr_code) return;
    try {
      const response = await fetch(link.qr_code);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${link.trim_link || 'trimlink'}-qr-code.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download QR:', err);
    }
  };

  const downloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      backgroundColor: '#000000',
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${link?.trim_link || 'trimlink'}-telemetry.pdf`);
  };

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="analytics-container">
        <div className="loading-state">
          <Activity size={32} className="pulse-icon" />
          <p>Compiling telemetry streams…</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="analytics-container">
        <div className="error-state">
          <div className="error-banner">
            <Terminal size={16} />
            <span>{error || 'Failed to load telemetry data.'}</span>
          </div>
          <button className="action-btn outline mt-4" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  const totalClicks = link.clicks || 0;
  const deviceStats = processTelemetry(link.device, totalClicks);
  const countryStats = processTelemetry(link.demographics, totalClicks);

  return (
    <div className="analytics-container">
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>

      <div className="analytics-layout" ref={printRef}>
        <header className="analytics-header">
          <button className="back-btn hide-on-print" onClick={() => navigate('/dashboard')}>
            <ArrowLeft size={18} />
            <span>Dashboard</span>
          </button>

          <div className="link-meta glass-panel">
            <div className="meta-info">
              <h2>{link.trim_link}</h2>
              <a href={link.original_link} target="_blank" rel="noreferrer" className="target-url">
                {link.original_link} <ExternalLink size={14} />
              </a>
            </div>
            <div className="live-status">
              <span className="status-dot blink"></span>
              <span className="status-text">Live Telemetry</span>
            </div>
          </div>
        </header>

        <div className="master-controls-row">
          <div className="master-stat glass-panel">
            <Activity size={36} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-label">Total Resolves (All Time)</span>
              <span className="stat-value">{totalClicks.toLocaleString()}</span>
            </div>
          </div>

          {link.qr_code && (
            <div className="export-module glass-panel">
              <div className="qr-display">
                <div className="qr-frame">
                  <img src={link.qr_code} alt="Routing QR" crossOrigin="anonymous" />
                </div>
              </div>
              <div className="export-actions hide-on-print">
                <button onClick={downloadQR} className="action-btn outline">
                  <QrCode size={16} />
                  <span>Save QR</span>
                </button>
                <button onClick={downloadPDF} className="action-btn solid">
                  <FileText size={16} />
                  <span>Export PDF</span>
                  <Download size={16} className="dl-icon" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="metrics-grid">
          <div className="metric-card glass-panel">
            <div className="card-header">
              <Cpu size={20} className="card-icon" />
              <h3>Hardware Fingerprint</h3>
            </div>
            <div className="chart-container">
              {deviceStats.length === 0 ? (
                <p className="empty-state">Awaiting data packets…</p>
              ) : (
                deviceStats.map((device, index) => (
                  <div className="data-row" key={index}>
                    <div className="data-label">
                      {getDeviceIcon(device.name)}
                      <span className="name capitalize">{device.name}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${device.percent}%` }}></div>
                    </div>
                    <div className="data-values">
                      <span className="count">{device.count.toLocaleString()}</span>
                      <span className="percent">{device.percent}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="metric-card glass-panel">
            <div className="card-header">
              <Globe2 size={20} className="card-icon" />
              <h3>Global Routing</h3>
            </div>
            <div className="chart-container">
              {countryStats.length === 0 ? (
                <p className="empty-state">Awaiting data packets…</p>
              ) : (
                countryStats.map((country, index) => (
                  <div className="data-row" key={index}>
                    <div className="data-label">
                      <MapPin size={16} className="text-muted" />
                      <span className="name">{country.name}</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill geo-fill" style={{ width: `${country.percent}%` }}></div>
                    </div>
                    <div className="data-values">
                      <span className="count">{country.count.toLocaleString()}</span>
                      <span className="percent">{country.percent}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAnalytics;