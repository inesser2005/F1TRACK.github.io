import React from "react";
import "../F1theme.css";
// 1. Certifique-se de que useLocation está importado
import { Link, useLocation } from "react-router-dom"; 

export default function Home() {
  // 2. Defina o location e a função isActive dentro do componente
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="container-fluid px-4 min-vh-100 py-4">
      {/* ... (Header e Diagnostics permanecem iguais) */}

      {/* Card 2: Data Link */}
      <div className="f1-card">
        <div className="f1-card-body">
          <h5 className="text-danger fw-black italic small mb-3">DATA LINK</h5>
          <p className="small text-white opacity-75">
            Switch to the 
            {/* 3. Use o componente <Link> corretamente aqui */}
            <Link 
              to="/drivers" 
              className={`ms-1 ${isActive("/drivers")}`}
              style={{ color: '#e10600', textDecoration: 'none', fontWeight: 'bold' }}
            >
              Drivers
            </Link> tab to see the confirmed 2026 grid updates including Audi and Cadillac.
          </p>
          <div className="f1-card-footer">
            {/* 4. Corrigindo o botão para usar Link também */}
            <Link to="/drivers" className="f1-btn w-100 py-1 text-center d-block" style={{ textDecoration: 'none' }}>
              GO TO DRIVERS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
