import React from "react";
import CustomPrimaryButton from "../../components/CustomPrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SignupFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToLoginPage = e => {
    navigate("/login");
  };
  const getFormNotValidMessage = () => {
    return "Enter a valid e-mail address, username must be 3-20 characters long and password must be 8-20 characters long";
  };
  const getFormValidMessage = () => {
    return "Click to Register";
  };
  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Create Account"
            additionalStyles={{
              marginTop: "30px",
            }}
            disabled={!isFormValid}
            onClick={handleRegister}
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
          text="Already have an account?"
          redirectText={"Login"}
          additionalStyles={{
            margin: "5px",
          }}
          redirectHandler={handlePushToLoginPage}
        />
      </div>
    </>
  );
};

export default SignupFooter;
