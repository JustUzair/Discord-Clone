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
        Forgot Password?
      </Typography>
      <Typography
        sx={{
          color: "#b9bbbe",
        }}
      >
        We're here to back you up!
      </Typography>
    </>
  );
};

export default LoginHeader;
