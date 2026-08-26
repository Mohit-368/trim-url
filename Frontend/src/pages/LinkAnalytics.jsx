import React, { useRef } from 'react';
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
  FileText
} from 'lucide-react';
import './LinkAnalytics.scss';

const LinkAnalytics = () => {
  // Reference for the PDF exporter to capture the layout
  const printRef = useRef();

  // 1. Mock DB Data (Now includes a base64 or URL for the QR Code)
  const dbData = {
    total_clicks: 8432,
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=trim.link/api-v2&color=FF0000&bgcolor=000000",
    country: { 'United States': 3210, 'India': 2150, 'Germany': 1420, 'Japan': 890, 'Brazil': 762 },
    devices: { 'desktop': 3800, 'android': 2400, 'iphone': 1932, 'tablet': 300 }
  };

  const processTelemetry = (dataObj, total) => {
    return Object.entries(dataObj)
      .map(([key, value]) => ({
        name: key,
        count: value,
        percent: ((value / total) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  };

  const countryStats = processTelemetry(dbData.country, dbData.total_clicks);
  const deviceStats = processTelemetry(dbData.devices, dbData.total_clicks);

  const getDeviceIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('desktop')) return <Monitor size={18} />;
    if (lower.includes('android') || lower.includes('iphone')) return <Smartphone size={18} />;
    return <Tablet size={18} />;
  };

  // --- EXPORT FUNCTIONS ---
  const downloadQR = async () => {
    try {
      const response = await fetch(dbData.qr_code_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'trimlink-qr-code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download QR:", error);
    }
  };

  const downloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    // Capture the DOM element as a canvas
    const canvas = await html2canvas(element, { 
      backgroundColor: '#000000',
      scale: 2 // Higher resolution for crisp text
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Calculate aspect ratio to fit A4 page
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('trimlink-telemetry-report.pdf');
  };

  return (
    <div className="analytics-container">
      <div className="bg-grid"></div>
      <div className="bg-orb orb-1"></div>

      {/* Attach the ref here so the PDF captures the layout without the back button */}
      <div className="analytics-layout" ref={printRef}>
        
        <header className="analytics-header">
          {/* We hide the back button during PDF print via SCSS */}
          <button className="back-btn hide-on-print">
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="link-meta glass-panel">
            <div className="meta-info">
              <h2>trim.link/api-v2</h2>
              <a href="https://backend.domain.com/docs/api-v2" className="target-url">
                https://backend.domain.com/docs/api-v2 <ExternalLink size={14} />
              </a>
            </div>
            <div className="live-status">
              <span className="status-dot blink"></span>
              <span className="status-text">Telemetry Active</span>
            </div>
          </div>
        </header>

        {/* Master Stat & Export Controls Row */}
        <div className="master-controls-row">
          <div className="master-stat glass-panel">
            <Activity size={32} className="stat-icon" />
            <div className="stat-content">
              <span className="stat-label">Total Resolves (All Time)</span>
              <span className="stat-value">{dbData.total_clicks.toLocaleString()}</span>
            </div>
          </div>

          {/* NEW: Export & QR Code Module */}
          <div className="export-module glass-panel">
            <div className="qr-display">
              <div className="qr-frame">
                <img src={dbData.qr_code_url} alt="Routing QR Code" crossOrigin="anonymous" />
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
        </div>

        {/* Data Grid */}
        <div className="metrics-grid">
          {/* Card 1: Device Telemetry */}
          <div className="metric-card glass-panel">
            <div className="card-header">
              <Cpu size={20} className="card-icon" />
              <h3>Hardware / OS Origin</h3>
            </div>
            <div className="chart-container">
              {deviceStats.map((device, index) => (
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
              ))}
            </div>
          </div>

          {/* Card 2: Geo-Demographics */}
          <div className="metric-card glass-panel">
            <div className="card-header">
              <Globe2 size={20} className="card-icon" />
              <h3>Geographic Routing</h3>
            </div>
            <div className="chart-container">
              {countryStats.map((country, index) => (
                <div className="data-row" key={index}>
                  <div className="data-label">
                    <MapPin size={16} className="text-muted" />
                    <span className="name capitalize">{country.name}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill geo-fill" style={{ width: `${country.percent}%` }}></div>
                  </div>
                  <div className="data-values">
                    <span className="count">{country.count.toLocaleString()}</span>
                    <span className="percent">{country.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAnalytics;