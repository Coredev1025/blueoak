import React from "react";
export function LogoMark({ size = 38 }) {
  return (
    <img
      src="/brand/blueoak-logo.png"
      alt="BlueOak Software"
      width="1970"
      height="789"
      data-testid="logo-mark"
      className="brand-logo"
      style={{
        height: size,
        width: "auto",
        display: "block",
        objectFit: "contain",
      }}
    />
  );
}
