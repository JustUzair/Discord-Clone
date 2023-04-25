import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import AuthBox from "../../components/AuthBox";
import SignupInputs from "./SignupInputs";
import SignupFooter from "./SignupFooter";
import { validateSignupForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
const Signup = ({ signup }) => {
  const [mail, setMail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const handleRegister = () => {
    const userDetails = {
      mail,
      password,
      username,
    };
    signup(userDetails, navigate);
  };
  useEffect(() => {
    setIsFormValid(validateSignupForm({ mail, username, password }));
  }, [mail, username, password, setIsFormValid]);
  return (
    <AuthBox>
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Create an Account
      </Typography>
      <SignupInputs
        mail={mail}
        setMail={setMail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      ></SignupInputs>
      <SignupFooter
        handleRegister={handleRegister}
        isFormValid={isFormValid}
      ></SignupFooter>
    </AuthBox>
  );
};

const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(Signup);
