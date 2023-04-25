import React from "react";
import CustomPrimaryButton from "../../components/CustomPrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LoginFooter = ({ handleLogin, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToRegisterPage = e => {
    navigate("/signup");
  };
  const handlePushToForgotPage = e => {
    navigate("/forgot-password");
  };
  const getFormNotValidMessage = () => {
    return "Enter valid e-mail address and password";
  };
  const getFormValidMessage = () => {
    return "Click to Log in";
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Login"
            additionalStyles={{
              marginTop: "30px",
            }}
            disabled={!isFormValid}
            onClick={handleLogin}
          />
        </div>
      </Tooltip>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <RedirectInfo
          text="Need and account?"
          redirectText={"Create an account"}
          additionalStyles={{
            margin: "5px",
          }}
          redirectHandler={handlePushToRegisterPage}
        />
        <RedirectInfo
          text="Forgot Password?"
          redirectText={"Reset Here"}
          additionalStyles={{
            margin: "5px",
          }}
          redirectHandler={handlePushToForgotPage}
        />
      </div>
    </>
  );
};

export default LoginFooter;
