import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSidebar from "./FriendsSidebar/FriendsSidebar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
// import { logout } from "../../utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
const Dashboard = ({ setUserDetails, logout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout(navigate);
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);
  return (
    <Wrapper>
      <SideBar></SideBar>
      <FriendsSidebar></FriendsSidebar>
      <Messenger></Messenger>
      <AppBar logout={logout}></AppBar>
    </Wrapper>
  );
};
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});
const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(Dashboard);
