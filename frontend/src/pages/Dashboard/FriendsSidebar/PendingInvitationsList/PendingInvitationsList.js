import React from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
const DUMMY_INVITATIONS = [
  {
    _id: 1,
    senderId: {
      username: "Mark",
      mail: "Dummy@ad.com",
    },
  },
  {
    _id: 2,
    senderId: {
      username: "John",
      mail: "Dummy2@ad.com",
    },
  },
];
const PendingInvitationsList = () => {
  return (
    <MainContainer>
      {DUMMY_INVITATIONS.map((invitation, index) => (
        <PendingInvitationsListItem
          key={index}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};
const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});
export default PendingInvitationsList;
