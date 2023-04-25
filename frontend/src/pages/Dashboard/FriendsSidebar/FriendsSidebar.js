import React from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList/FriendsList";
import PendingInvitationsList from "./PendingInvitationsList/PendingInvitationsList";
const FriendsSidebar = () => {
  return (
    <MainContainer>
      <AddFriendButton></AddFriendButton>
      <FriendsTitle title="Private Messages"></FriendsTitle>
      <FriendsList></FriendsList>
      <FriendsTitle title="Invitations"></FriendsTitle>
      <PendingInvitationsList></PendingInvitationsList>
    </MainContainer>
  );
};
const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2F3136",
});
export default FriendsSidebar;
