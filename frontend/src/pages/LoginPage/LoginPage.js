import React, { useEffect, useState } from "react";
import AuthBox from "../../components/AuthBox";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import LoginFooter from "./LoginFooter";
import { validateLoginForm } from "../../utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";

import { useNavigate } from "react-router-dom";

const LoginPage = ({ login }) => {
  const [mail, setMail] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = e => {
    const userDetails = {
      mail,
      password,
    };
    login(userDetails, navigate);
  };
  useEffect(() => {
    setIsFormValid(
      validateLoginForm({
        mail,
        password,
      })
    );
  }, [mail, password]);
  return (
    <AuthBox>
      <LoginHeader />
      <LoginForm
        mail={mail}
        setMail={setMail}
        password={password}
        setPassword={setPassword}
      ></LoginForm>
      <LoginFooter isFormValid={isFormValid} handleLogin={handleLogin} />
    </AuthBox>
  );
};
const mapActionsToProps = dispatch => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LoginPage);
