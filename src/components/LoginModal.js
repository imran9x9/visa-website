import React, { useState } from "react";
import Modal from "react-modal";
import Select from "react-select";
import locations from "../assets/data/locations.json"; // update path as needed

Modal.setAppElement("#root");

// Defensive: make sure locations exist
const countryOptions = Array.isArray(Object.keys(locations))
  ? Object.keys(locations).map(c => ({ label: c, value: c }))
  : [];

export default function LoginModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(""); // mock OTP
  const [otpError, setOtpError] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  // Defensive: get states for selected country
  const stateOptions =
    country &&
    locations[country.value] &&
    locations[country.value].states &&
    Object.keys(locations[country.value].states).length > 0
      ? Object.keys(locations[country.value].states).map(s => ({
          label: s,
          value: s
        }))
      : [];

  // Defensive: get cities for selected state
  const cityOptions =
    country &&
    state &&
    locations[country.value] &&
    locations[country.value].states &&
    locations[country.value].states[state.value] &&
    Array.isArray(locations[country.value].states[state.value])
      ? locations[country.value].states[state.value].map(city => ({
          label: city,
          value: city
        }))
      : [];

  // Mock send OTP (always "1234")
  function handleSendOtp() {
    setSentOtp("1234");
    setStep(2);
  }

  // Mock OTP verify
  function handleVerifyOtp() {
    if (otp === sentOtp) {
      setStep(3);
      setOtpError("");
    } else {
      setOtpError("Invalid OTP, try again");
    }
  }

  // Final submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !country || !state || !city) {
      alert("Please fill all fields.");
      return;
    }
    alert(
      `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nCountry: ${country.label}\nState: ${state.label}\nCity: ${city.label}`
    );
    setStep(1);
    setEmail("");
    setMobile("");
    setName("");
    setCountry(null);
    setState(null);
    setCity(null);
    setOtp("");
    setSentOtp("");
    setOtpError("");
    onClose();
  }

  // Reset on modal open/close
  React.useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setMode("email");
      setEmail("");
      setMobile("");
      setOtp("");
      setSentOtp("");
      setOtpError("");
      setName("");
      setCountry(null);
      setState(null);
      setCity(null);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login"
      style={{
        overlay: {
      zIndex: 9999,
      backgroundColor: "rgba(0,0,0,0.48)"
    },
        content: { maxWidth: 400, margin: "auto", borderRadius: 12 }
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login / Signup</h2>

      {/* Step 1: Email or Mobile */}
      {step === 1 && (
        <>
          <div style={{ marginBottom: 12, textAlign: "center" }}>
            <button
              style={{
                background: mode === "email" ? "#21808d" : "#ddd",
                color: mode === "email" ? "#fff" : "#333",
                marginRight: 10,
                padding: "6px 20px",
                borderRadius: 6,
                border: "none"
              }}
              onClick={() => setMode("email")}
            >
              Email
            </button>
            <button
              style={{
                background: mode === "mobile" ? "#21808d" : "#ddd",
                color: mode === "mobile" ? "#fff" : "#333",
                padding: "6px 20px",
                borderRadius: 6,
                border: "none"
              }}
              onClick={() => setMode("mobile")}
            >
              Mobile
            </button>
          </div>
          {mode === "email" ? (
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ width: "100%", marginBottom: 16, padding: 8 }}
              required
            />
          ) : (
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              style={{ width: "100%", marginBottom: 16, padding: 8 }}
              required
            />
          )}
          <button
            className="hero-button button-large"
            style={{ width: "100%" }}
            onClick={handleSendOtp}
            disabled={mode === "email" ? !email : !mobile}
          >
            Send OTP
          </button>
        </>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            style={{ width: "100%", marginBottom: 8, padding: 8 }}
            required
          />
          {otpError && (
            <div style={{ color: "red", marginBottom: 8 }}>{otpError}</div>
          )}
          <button
            className="hero-button button-large"
            style={{ width: "100%" }}
            onClick={handleVerifyOtp}
            disabled={!otp}
          >
            Verify OTP
          </button>
        </>
      )}

      {/* Step 3: Profile */}
      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
          <Select
            options={countryOptions}
            value={country}
            onChange={v => {
              setCountry(v);
              setState(null);
              setCity(null);
            }}
            placeholder="Select Country"
            styles={{ menu: base => ({ ...base, zIndex: 1001 }) }}
            isClearable
            required
          />
          <div style={{ height: 16 }} />
          <Select
            options={stateOptions}
            value={state}
            onChange={v => {
              setState(v);
              setCity(null);
            }}
            placeholder={
              country
                ? stateOptions.length
                  ? "Select State"
                  : "No States Found"
                : "Select Country first"
            }
            isDisabled={!country || stateOptions.length === 0}
            styles={{ menu: base => ({ ...base, zIndex: 1001 }) }}
            isClearable
            required
          />
          <div style={{ height: 16 }} />
          <Select
            options={cityOptions}
            value={city}
            onChange={v => setCity(v)}
            placeholder={
              state
                ? cityOptions.length
                  ? "Select City"
                  : "No Cities Found"
                : "Select State first"
            }
            isDisabled={!state || cityOptions.length === 0}
            styles={{ menu: base => ({ ...base, zIndex: 1001 }) }}
            isClearable
            required
          />
          <button
            className="hero-button button-large"
            style={{ width: "100%", marginTop: 16 }}
            type="submit"
            disabled={
              !name ||
              !country ||
              !state ||
              !city
            }
          >
            Finish & Submit
          </button>
        </form>
      )}

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <button
          onClick={onClose}
          style={{
            color: "#21808d",
            background: "none",
            border: "none",
            fontSize: 16
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
