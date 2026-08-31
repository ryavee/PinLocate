import React, { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCity,
  FaLandmark,
  FaGlobeAsia,
  FaTimes,
  FaCheckCircle,
  FaExclamationCircle,
  FaRedoAlt,
  FaCopy,
  FaCheck,
  FaChevronDown,
  FaSearchLocation,
} from "react-icons/fa";
import "./AddressForm.css";

const POPULAR_PINS = [
  { pin: "110001", city: "New Delhi" },
  { pin: "560001", city: "Bengaluru" },
  { pin: "400001", city: "Mumbai" },
  { pin: "600001", city: "Chennai" },
  { pin: "700001", city: "Kolkata" },
];

const AddressForm = () => {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedAddress, setSubmittedAddress] = useState(null);
  const activeRequest = useRef(null);

  const clearLocationDetails = () => {
    setPostOffices([]);
    setSelectedOffice("");
    setDistrict("");
    setState("");
  };

  useEffect(() => () => activeRequest.current?.abort(), []);

  const fetchPinDetails = async (pinValue) => {
    activeRequest.current?.abort();
    const controller = new AbortController();
    activeRequest.current = controller;

    setLoading(true);
    setError("");
    setSubmittedAddress(null);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pinValue}`,
        { signal: controller.signal }
      );
      if (!response.ok) {
        throw new Error("The postal service could not complete the lookup.");
      }

      const data = await response.json();
      if (activeRequest.current !== controller) return;

      if (
        data &&
        Array.isArray(data) &&
        data[0]?.Status === "Success" &&
        data[0]?.PostOffice?.length > 0
      ) {
        const offices = data[0].PostOffice;
        setPostOffices(offices);
        const firstOffice = offices[0];
        setSelectedOffice(firstOffice.Name);
        setDistrict(firstOffice.District || "");
        setState(firstOffice.State || "");
      } else {
        setError("PIN code not found. Please verify the 6-digit code.");
        clearLocationDetails();
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Error fetching location data:", err);
      setError("Unable to fetch address details. Please check your connection.");
      clearLocationDetails();
    } finally {
      if (activeRequest.current === controller) {
        setLoading(false);
        activeRequest.current = null;
      }
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    activeRequest.current?.abort();
    clearLocationDetails();
    setError("");
    setSubmittedAddress(null);

    if (value.length === 6) {
      fetchPinDetails(value);
    }
  };

  const handleSelectSamplePin = (samplePin) => {
    setPincode(samplePin);
    fetchPinDetails(samplePin);
  };

  const handleOfficeChange = (e) => {
    const officeName = e.target.value;
    setSelectedOffice(officeName);

    const office = postOffices.find((o) => o.Name === officeName);
    if (office) {
      setDistrict(office.District || "");
      setState(office.State || "");
    }
  };

  const handleReset = () => {
    activeRequest.current?.abort();
    setPincode("");
    clearLocationDetails();
    setError("");
    setSubmittedAddress(null);
    setCopied(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOffice || !district || !state || !pincode) return;

    setSubmittedAddress({
      locality: selectedOffice,
      district,
      state,
      pincode,
      fullFormatted: `${selectedOffice}, ${district}, ${state} - ${pincode}`,
    });
  };

  const handleCopy = async () => {
    if (!submittedAddress) return;
    try {
      await navigator.clipboard.writeText(submittedAddress.fullFormatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError("Could not copy the address. Please select and copy it manually.");
    }
  };

  const hasResults = postOffices.length > 0 && selectedOffice;

  return (
    <div className="card-wrapper">
      <div className="form-card" id="pinlocate-form-card">
        {loading && (
          <div className="overlay" role="status" aria-live="polite" aria-label="Looking up PIN code">
            <div className="overlay-content">
              <div className="spinner" aria-hidden="true"></div>
              <p className="overlay-text">
                Fetching postal records for <strong>{pincode}</strong>...
              </p>
            </div>
          </div>
        )}

        <div className="form-card-header">
          <div className="card-badge">
            <FaSearchLocation className="badge-icon" />
            <span>Indian Postal Lookup</span>
          </div>
          <h2 className="form-card-title">Enter Address Details</h2>
          <p className="form-card-subtitle">
            Type any 6-digit Indian PIN code to auto-populate locality, district, and state.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-busy={loading}>
          {/* PIN CODE INPUT GROUP */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="pincode-input">
                Postal PIN Code <span className="required-star">*</span>
              </label>
              <div className="pincode-counter">
                {pincode.length > 0 && (
                  <span
                    className={
                      pincode.length === 6 ? "count-ready" : "count-progress"
                    }
                  >
                    {pincode.length}/6 digits
                  </span>
                )}
              </div>
            </div>

            <div className="input-wrapper pincode-wrapper">
              <FaMapMarkerAlt className="input-icon marker-icon" />
              <input
                id="pincode-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={pincode}
                onChange={handlePincodeChange}
                maxLength="6"
                placeholder="Enter 6-digit PIN (e.g. 560001)"
                autoComplete="postal-code"
                className={pincode.length === 6 && hasResults ? "input-success" : ""}
              />
              {pincode && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={handleReset}
                  aria-label="Clear PIN code"
                  title="Clear PIN code"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* QUICK SAMPLE PINS */}
            <div className="sample-pins-container">
              <span className="sample-pins-label">Try:</span>
              <div className="sample-pins-list">
                {POPULAR_PINS.map((item) => (
                  <button
                    key={item.pin}
                    type="button"
                    className={`sample-pill ${pincode === item.pin ? "active" : ""}`}
                    onClick={() => handleSelectSamplePin(item.pin)}
                  >
                    {item.city} ({item.pin})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SUCCESS STATUS BADGE */}
          {hasResults && (
            <div className="results-status-banner">
              <FaCheckCircle className="status-icon success-icon" />
              <span>
                Found <strong>{postOffices.length}</strong> {postOffices.length === 1 ? "locality" : "localities"} for PIN {pincode}
              </span>
            </div>
          )}

          {/* LOCALITY / CITY SELECTION */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="locality-select">
                City / Locality <span className="required-star">*</span>
              </label>
              {postOffices.length > 1 && (
                <span className="count-badge">
                  {postOffices.length} options available
                </span>
              )}
            </div>

            <div className="input-wrapper select-wrapper">
              <FaCity className="input-icon" />
              <select
                id="locality-select"
                value={selectedOffice}
                onChange={handleOfficeChange}
                disabled={postOffices.length === 0}
                className={selectedOffice ? "select-populated" : ""}
              >
                <option value="">
                  {postOffices.length > 0
                    ? "Select City / Locality"
                    : "Auto-populates after valid PIN"}
                </option>
                {postOffices.map((office, idx) => (
                  <option key={`${office.Name}-${idx}`} value={office.Name}>
                    {office.Name} ({office.BranchType || "Post Office"})
                  </option>
                ))}
              </select>
              <FaChevronDown className="select-chevron" />
            </div>
          </div>

          {/* DISTRICT (AUTO-POPULATED) */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="district-input">District</label>
              {district && <span className="auto-pill">Auto-filled</span>}
            </div>
            <div className="input-wrapper">
              <FaLandmark className="input-icon" />
              <input
                id="district-input"
                type="text"
                value={district}
                readOnly
                placeholder="District will appear here"
                className="input-readonly"
              />
            </div>
          </div>

          {/* STATE (AUTO-POPULATED) */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="state-input">State</label>
              {state && <span className="auto-pill">Auto-filled</span>}
            </div>
            <div className="input-wrapper">
              <FaGlobeAsia className="input-icon" />
              <input
                id="state-input"
                type="text"
                value={state}
                readOnly
                placeholder="State will appear here"
                className="input-readonly"
              />
            </div>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="error-banner" role="alert">
              <FaExclamationCircle className="error-icon" />
              <div className="error-text">
                <strong>Lookup Failed</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="actions-group">
            <button
              type="submit"
              id="submit-address-btn"
              className="primary-btn"
              disabled={loading || !selectedOffice || !district || !state}
            >
              <FaCheck className="btn-icon" />
              <span>Confirm Address</span>
            </button>

            {(pincode || postOffices.length > 0 || error) && (
              <button
                type="button"
                id="reset-form-btn"
                className="secondary-btn"
                onClick={handleReset}
              >
                <FaRedoAlt className="btn-icon" />
                <span>Search Another PIN</span>
              </button>
            )}
          </div>
        </form>

        {/* SUBMITTED CONFIRMATION CARD */}
        {submittedAddress && (
          <div className="submitted-card" id="submitted-address-card">
            <div className="submitted-header">
              <div className="submitted-title-group">
                <FaCheckCircle className="submitted-check-icon" />
                <h4>Address Verified</h4>
              </div>
              <button
                type="button"
                className={`copy-btn ${copied ? "copied" : ""}`}
                onClick={handleCopy}
                title="Copy full address"
              >
                {copied ? (
                  <>
                    <FaCheck className="copy-icon" /> Copied!
                  </>
                ) : (
                  <>
                    <FaCopy className="copy-icon" /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="submitted-details-grid">
              <div className="detail-item">
                <span className="detail-label">Locality / Branch</span>
                <span className="detail-value">{submittedAddress.locality}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">District</span>
                <span className="detail-value">{submittedAddress.district}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">State</span>
                <span className="detail-value">{submittedAddress.state}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PIN Code</span>
                <span className="detail-value pin-highlight">
                  {submittedAddress.pincode}
                </span>
              </div>
            </div>

            <div className="full-address-preview">
              <code>{submittedAddress.fullFormatted}</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressForm;
