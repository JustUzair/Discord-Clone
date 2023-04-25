import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
const FriendsList = () => {
  const DUMMY_FRIENDS = [
    { id: 1, username: "Mark", isOnline: true },
    { id: 2, username: "Abcde", isOnline: false },
    { id: 3, username: "Pqrst", isOnline: false },
  ];
  return (
    <MainContainer>
      {DUMMY_FRIENDS.map((friend, index) => (
        <FriendsListItem
          username={friend.username}
          id={friend.id}
          isOnline={friend.isOnline}
          key={index}
        />
      ))}
    </MainContainer>
  );
};
const MainContainer = styled("div")({
  flexGrow: "1",
  width: "100%",
});
export default FriendsList;
