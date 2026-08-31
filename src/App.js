import React from "react";
import AddressForm from "./Components/AddressForm";
import { FaMapMarkerAlt, FaGithub, FaBolt } from "react-icons/fa";

function App() {
  return (
    <div className="app-shell" id="pinlocate-app">
      {/* HEADER / BRANDING */}
      <header className="app-header">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <FaMapMarkerAlt className="brand-icon" />
          </div>
          <div className="brand-text">
            <h1 className="brand-title">PinLocate</h1>
            <span className="brand-badge">
              <FaBolt className="badge-bolt" /> Instant Lookup
            </span>
          </div>
        </div>
        <p className="brand-tagline">
          Find address details instantly using an Indian PIN code.
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <AddressForm />
      </main>

      {/* MINIMAL FOOTER */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-brand">PinLocate</span>
            <span className="footer-dot">•</span>
            <span className="footer-tech">Built with React</span>
          </div>
          <a
            href="https://github.com/ryavee/PinLocate"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-github-link"
            aria-label="View PinLocate repository on GitHub"
          >
            <FaGithub className="github-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

