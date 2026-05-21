import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="input-group">
      <label>{label}</label>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onBlur={onBlur}
          className={touched && error ? "input-error" : ""}
          style={{ width: "100%", paddingRight: isPassword ? "40px" : "10px" }}
        />

        {isPassword && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              cursor: "pointer",
              color: "#666",
              display: "flex",
              alignItems: "center",
            }}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </div>
        )}
      </div>
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default InputField;
