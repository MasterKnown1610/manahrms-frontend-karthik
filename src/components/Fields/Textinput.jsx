import React from "react";
import { Input } from "antd";

const Textinput = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="text-input">
      <label htmlFor={name}>{label}</label>
      <Input
        id={name}
        name={name}
        type={type}
        size="large"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required ? true : false}
      />
    </div>
  );
};

export default Textinput;
