import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
const InvitationDecisionButtons = ({
  disabled,
  acceptInvitationHandler,
  rejectInvitationHandler,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <IconButton
        style={{
          color: "#3ba55d",
        }}
        disabled={disabled}
        onClick={acceptInvitationHandler}
      >
        <CheckIcon></CheckIcon>
      </IconButton>
      <IconButton
        style={{
          color: "#e2332e",
        }}
        disabled={disabled}
        onClick={rejectInvitationHandler}
      >
        <ClearIcon></ClearIcon>
      </IconButton>
    </Box>
  );
};

export default InvitationDecisionButtons;
