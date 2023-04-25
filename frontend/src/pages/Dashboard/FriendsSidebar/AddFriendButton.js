import React, { useState } from "react";
import CustomPrimaryButton from "../../../components/CustomPrimaryButton";
import AddFriendDialog from "./AddFriendDialog";
const AddFriendButton = () => {
  const additionalStyles = {
    marginTop: "10px",
    marginLeft: "5px",
    width: "80%",
    height: "30px",
    background: "#3ba55d",
  };
  const handleOpenAddFriendDialog = e => {
    setIsDialogOpen(true);
  };
  const handleCloseAddFriendDialog = e => {
    setIsDialogOpen(false);
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <CustomPrimaryButton
        additionalStyles={additionalStyles}
        label="Add Friend"
        onClick={handleOpenAddFriendDialog}
      ></CustomPrimaryButton>
      <AddFriendDialog
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}
      />
    </>
  );
};

export default AddFriendButton;
