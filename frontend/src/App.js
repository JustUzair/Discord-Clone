import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage.js";
import SignupPage from "./pages/SignupPage/SignupPage.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import ForgotPassword from "./pages/ForgotPassword//ForgotPassword.js";

import AlertNotifications from "./components/AlertNotifications";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            exact
            path="/signup"
            element={<SignupPage></SignupPage>}
          ></Route>
          <Route
            exact
            path="/dashboard"
            element={<Dashboard></Dashboard>}
          ></Route>
          <Route
            exact
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            path="/"
            element={<Navigate to="/dashboard"></Navigate>}
          ></Route>
        </Routes>
      </Router>
      <AlertNotifications></AlertNotifications>
    </>
  );
}

export default App;
