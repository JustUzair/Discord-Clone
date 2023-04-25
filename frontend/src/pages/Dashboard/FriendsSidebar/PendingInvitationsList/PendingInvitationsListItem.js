import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "../../../../components/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation,
  rejectFriendInvitation,
}) => {
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };
  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonsDisabled(true);
  };
  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%", cursor: "pointer" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username}></Avatar>
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: "700",
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleAcceptInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationsListItem;
