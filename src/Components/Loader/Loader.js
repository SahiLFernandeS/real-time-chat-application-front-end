import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        zIndex: "10000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "0",
        left: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(13, 60, 21, 0.4)",
      }}
    >
      <img
        src="../Images/loader.gif"
        srcSet="../Images/loader.gif"
        width="120px"
        height="100vh"
        alt="Loader"
      />
    </div>
  );
}
