import React from "react";
import InputWithLabel from "../../components/InputWithLabel";
const LoginForm = props => {
  const { mail, setMail, password, setPassword } = props;
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label={"E-mail"}
        type="mail"
        placeholder="Enter your email"
      />
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label={"Password"}
        type="password"
        placeholder="Enter your password"
        maxlength="20"
      />
    </>
  );
};

export default LoginForm;
