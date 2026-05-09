import React from "react";
import "../F1theme.css";

export default function Home() {
  return (
    <div className="container-fluid px-4 min-vh-100 py-4">
      
      {/* Header Section  */}
      <div className="f1-telemetry-tip mb-5">
        <span className="f1-badge-tip">SYSTEM STATUS</span>
        <span className="text-uppercase fw-bold italic text-white">
          WEBSITE OPERATIONAL // SESSION 2025-2026 ACTIVE
        </span>
      </div>

      {/* Content Section */}
      <p className="lead opacity-75 text-white mb-5 italic fw-bold">
        Access real-time driver data, track layouts, and weather telemetry.
      </p>

      <div className="f1-dashboard-grid">
        
        {/* System Diagnostics */}
        <div className="f1-card">
          <div className="f1-card-body">
            <h5 className="text-danger fw-black italic small mb-3">DIAGNOSTICS</h5>
            <div className="d-flex align-items-center mb-4">
              <span className="spinner-grow spinner-grow-sm text-success me-3"></span>
              <span className="small text-white opacity-75">All F1 APIs Operational</span>
            </div>
            {/* Pinned Footer to have alignment */}
            <div className="f1-card-footer border-top border-secondary border-opacity-25">
              <span className="small opacity-50 text-white">LATENCY: 24ms</span>
            </div>
          </div>
        </div>

        {/* Card 2: Data Link */}
        <div className="f1-card">
          <div className="f1-card-body">
            <h5 className="text-danger fw-black italic small mb-3">DATA LINK</h5>
            <p className="small text-white opacity-75">
              Switch to the <strong>Drivers</strong> tab to see the confirmed 2026 grid updates including Audi and Cadillac.
            </p>
            <div className="f1-card-footer">
               <button className="f1-btn w-100 py-1">GO TO DRIVERS</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}