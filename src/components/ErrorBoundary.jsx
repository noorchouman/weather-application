import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div className="app-shell">
            <div className="state-box error-box">
              Something went wrong. Please refresh the page.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}