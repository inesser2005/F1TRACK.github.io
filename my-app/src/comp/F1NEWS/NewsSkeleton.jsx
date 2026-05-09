import React from "react";

const NewsSkeleton = () => (
  <div className="f1-card skeleton-card">
    <div className="f1-card-body">
      {/* Simula a NewsImage */}
      <div className="skeleton-image mb-3" style={{ height: "200px" }}></div>
      
      <div className="mb-2">
        {/* Simula o Badge "News Update" */}
        <div className="skeleton-badge mb-2" style={{ width: "80px", height: "15px" }}></div>
        
        {/* Simula o Título (duas linhas) */}
        <div className="skeleton-title mb-1" style={{ width: "100%", height: "20px" }}></div>
        <div className="skeleton-title" style={{ width: "60%", height: "20px" }}></div>
      </div>

      <div className="f1-card-footer">
        {/* Simula o Parágrafo de Descrição */}
        <div className="skeleton-text mb-4" style={{ width: "100%", height: "40px", opacity: 0.5 }}></div>
        
        {/* Simula o Botão "Read the news!" */}
        <div className="skeleton-btn" style={{ width: "100%", height: "38px" }}></div>
      </div>
    </div>
  </div>
);

export default NewsSkeleton;
