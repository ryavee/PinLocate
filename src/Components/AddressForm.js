import React, { useState } from "react";
import { FaMapMarkerAlt, FaCity, FaLandmark, FaGlobeAsia } from "react-icons/fa";
import "./AddressForm.css";

const AddressForm = () => {
  const [pincode, setPincode] = useState("");
  const [postOffices, setPostOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePincodeChange = async (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPincode(value);
    setPostOffices([]);
    setSelectedOffice("");
    setDistrict("");
    setState("");
    setError("");

    if (value.length === 6) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = await response.json();

        if (data[0].Status === "Success" && data[0].PostOffice?.length > 0) {
          setPostOffices(data[0].PostOffice);
          const firstOffice = data[0].PostOffice[0];
          setSelectedOffice(firstOffice.Name);
          setDistrict(firstOffice.District || "");
          setState(firstOffice.State || "");
        } else {
          setError("Invalid Pincode");
        }
      } catch (err) {
        console.error("Error fetching:", err);
        setError("Failed to fetch location data");
      } finally {
        setLoading(false);
      }
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Address submitted:\n${selectedOffice}, ${district}, ${state} - ${pincode}`);
  };

  return (
    <div className="page-container">
      <div className="container">
        <form className="form-card" onSubmit={handleSubmit}>
          {loading && (
            <div className="overlay">
              <div className="spinner"></div>
            </div>
          )}

          <h2 className="form-card-title">Enter Address</h2>

          <div className="form-group">
            <label>Pincode</label>
            <div className="input-wrapper">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                value={pincode}
                onChange={handlePincodeChange}
                maxLength="6"
                placeholder="6-digit PIN"
              />
            </div>
          </div>

          <div className="form-group">
            <label>City / Locality</label>
            <div className="input-wrapper select-wrapper">
              <FaCity className="icon" />
              <select value={selectedOffice} onChange={handleOfficeChange}>
                <option value="">Select City / Locality</option>
                {postOffices.map((office, idx) => (
                  <option key={idx} value={office.Name}>
                    {office.Name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>District</label>
            <div className="input-wrapper">
              <FaLandmark className="icon" />
              <input type="text" value={district} readOnly />
            </div>
          </div>

          <div className="form-group">
            <label>State</label>
            <div className="input-wrapper">
              <FaGlobeAsia className="icon" />
              <input type="text" value={state} readOnly />
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading || !selectedOffice}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
