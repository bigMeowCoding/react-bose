import React from "react";
import "./logo.scss";
import logoImg from "./logo.png";
export function Logo() {
  return (
    <div className="logo-container">
      <img src={logoImg} alt="" />
    </div>
  );
}
