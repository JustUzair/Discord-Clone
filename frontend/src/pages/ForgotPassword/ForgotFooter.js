import React from "react";
import CustomPrimaryButton from "../../components/CustomPrimaryButton";
import RedirectInfo from "../../components/RedirectInfo";

import { useNavigate } from "react-router-dom";
const ForgotFooter = ({ handleForgot, isFormValid }) => {
  const navigate = useNavigate();

  const handlePushToLoginPage = e => {
    navigate("/login");
  };
  return (
    <>
      <div>
        <CustomPrimaryButton
          label="Continue"
          additionalStyles={{
            marginTop: "30px",
          }}
          disabled={!isFormValid}
          onClick={handleForgot}
        />
      </div>
      <RedirectInfo
        text="Back to login?"
        redirectText={"Login"}
        additionalStyles={{
          margin: "5px",
        }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default ForgotFooter;
