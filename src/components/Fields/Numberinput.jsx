import React from "react";
import { InputNumber } from "antd";



const Numberinput = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  min,
  max,
  step,
}) => {
  const handleNumberChange = (val) => {
    // Create a synthetic event-like object for consistency with text inputs
    const syntheticEvent = {
      target: {
        name: name,
        value: val || "",
      },
    };
    onChange(syntheticEvent);
  };

  return (
    <div className="number-input">
      <label htmlFor={name}>{label}</label>
      <InputNumber
        size="large"
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleNumberChange}
        min={min}
        max={max}
        step={step}
        style={{ width: "100%" }}
        required={required ? true : false}
      />
    </div>
  );
};

export default Numberinput;
