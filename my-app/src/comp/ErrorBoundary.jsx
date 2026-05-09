import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Logic: Catch the error and update state
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You could log this to a telemetry service like Sentry here
    console.error("PIT_STOP_TELEMETRY:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // THEMED FALLBACK UI
      return (
        <div className="container py-5 text-center">
          <div className="f1-card p-5 mx-auto" style={{ maxWidth: "500px" }}>
            <h1 className="fw-black italic text-danger display-4">PIT STOP</h1>
            <div className="my-4">
              <span style={{ fontSize: "4rem" }}>🛠️</span>
            </div>
            <h3 className="text-white text-uppercase italic">Mechanical Failure</h3>
            <p className="text-white opacity-50 mb-4">
              We've encountered a critical error in the telemetry stream. 
              The stewards are investigating.
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