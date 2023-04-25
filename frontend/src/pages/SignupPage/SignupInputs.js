import React from "react";
import InputWithLabel from "../../components/InputWithLabel";

const SignupInputs = props => {
  const { mail, setMail, username, setUsername, password, setPassword } = props;
  return (
    <>
      <InputWithLabel
        value={mail}
        setValue={setMail}
        label="E-Mail Address"
        type="text"
        placeholder="Enter E-Mail address"
      ></InputWithLabel>
      <InputWithLabel
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter Username"
      ></InputWithLabel>
      <InputWithLabel
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter Password"
      ></InputWithLabel>
    </>
  );
};

export default SignupInputs;
