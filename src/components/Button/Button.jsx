import React from "react";
import { Button as AntdButton } from "antd";

const Button = ({ type, onClick, children, ...props }) => {
  return (
    <AntdButton type={type} onClick={onClick} {...props}>
      {children}
    </AntdButton>
  );
};

export default Button;
