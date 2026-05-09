import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // Adicionamos 'error' ao estado inicial
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Guardamos o erro no estado para o usar no render
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("PIT_STOP_TELEMETRY:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container py-5 text-center">
          <div className="f1-card p-5 mx-auto" style={{ maxWidth: "600px" }}>
            <h1 className="fw-black italic text-danger display-4">PIT STOP</h1>
            <div className="my-4">
              <span style={{ fontSize: "4rem" }}>🛠️</span>
            </div>
            <h3 className="text-white text-uppercase italic">Mechanical Failure</h3>
            
            {/* NOVO: Bloco para mostrar o erro real */}
            <div className="mt-4 p-3 bg-black border border-secondary text-start">
              <p className="text-danger fw-bold mb-1" style={{ fontSize: "0.8rem", fontFamily: "monospace" }}>
                DIAGNOSTIC_DATA:
              </p>
              <code className="text-white small" style={{ wordBreak: "break-all" }}>
                {this.state.error && this.state.error.toString()}
              </code>
            </div>

            <p className="text-white opacity-50 my-4">
              The stewards are investigating the telemetry stream.
            </p>
            
            <button 
              className="f1-btn w-100" 
              onClick={() => window.location.reload()}
            >
              REJOIN SESSION
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
