const NewsSkeleton = () => (
    <div className="f1-card skeleton-card">
        <div className="f1-card-body">
            {/* Simula a NewsImage */}
            <div className="skeleton-image mb-3" style={{ height: "200px", backgroundColor: "#333" }}></div>
            <div className="mb-2">
                {/* Simula o Badge */}
                <div className="skeleton-badge mb-2" style={{ width: "80px", height: "15px", backgroundColor: "#444" }}></div>
                {/* Simula o Título */}
                <div className="skeleton-title mb-1" style={{ width: "100%", height: "20px", backgroundColor: "#444" }}></div>
                <div className="skeleton-title" style={{ width: "60%", height: "20px", backgroundColor: "#444" }}></div>
            </div>
            <div className="f1-card-footer">
                {/* Simula a Descrição */}
                <div className="skeleton-text mb-4" style={{ width: "100%", height: "40px", backgroundColor: "#333", opacity: 0.5 }}></div>
                {/* Simula o Botão */}
                <div className="skeleton-btn" style={{ width: "100%", height: "38px", backgroundColor: "#555" }}></div>
            </div>
        </div>
    </div>
);
