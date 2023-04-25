import React from "react";
import { Typography } from "@mui/material";
const LoginHeader = () => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Welcome Back!
      </Typography>
      <Typography
        sx={{
          color: "#b9bbbe",
        }}
      >
        We're happy that you are back!
      </Typography>
    </>
  );
};

export default LoginHeader;
