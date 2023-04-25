import * as api from "../../api/api";
import { openAlertMessage } from "./alertActions";
// import { logout } from "../../utils/auth";
export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
  LOGOUT: "AUTH.LOGOUT",
};

export const getActions = dispatch => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    signup: (userDetails, history) => dispatch(signup(userDetails, history)),
    logout: history => dispatch(logout(history)),
    setUserDetails: userDetails => {
      dispatch(setUserDetails(userDetails));
    },
  };
};
const setUserDetails = userDetails => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, navigate) => {
  return async dispatch => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(
        openAlertMessage(
          `${response.exception.response.data.error.statusCode} - ${response.exception.response.data.message}`
        )
      );
    } else {
      console.log(response.data);
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate("/dashboard");
    }
  };
};

const signup = (userDetails, navigate) => {
  return async dispatch => {
    const response = await api.signup(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(
        openAlertMessage(
          `${response.exception.response.data.error.statusCode} - ${response.exception.response.data.message}`
        )
      );
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      navigate("/dashboard");
    }
  };
};
const logout = navigate => {
  return async dispatch => {
    const response = await api.logout();
    if (response.error) {
      dispatch(
        openAlertMessage(
          `${response.exception.response.data.error.statusCode} - ${response.exception.response.data.message}`
        )
      );
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };
};
const checkResponseCode = exception => {
  const responseCode = exception.response.data.error.statusCode;
  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
