import React, { useState } from "react";
import AuthBox from "../../components/AuthBox";
import ForgotHeader from "./ForgotHeader";
import ForgotForm from "./ForgotForm";
import ForgotFooter from "./ForgotFooter";
const ForgotPassword = () => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const handleForgot = e => {
    console.log("Forgot password");
  };
  return (
    <>
      <AuthBox>
        <ForgotHeader />
        <ForgotForm mail={mail} setMail={setMail}></ForgotForm>
        <ForgotFooter isFormValid={isFormValid} handleForgot={handleForgot} />
      </AuthBox>
    </>
  );
};

export default ForgotPassword;
