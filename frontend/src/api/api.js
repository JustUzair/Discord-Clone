import axios from "axios";
const apiClient = axios.create({
  baseURL: `http://localhost:8000/api`,
  timeout: 5000,
  withCredentials: true,
});

export const login = async data => {
  try {
    const response = await apiClient.post("/auth/login", data);
    // console.log(response);
    return response;
  } catch (exception) {
    console.log(exception.response.data.message);
    return {
      error: true,
      exception,
    };
  }
};

export const signup = async data => {
  try {
    const response = await apiClient.post("/auth/signup", data);
    // console.log(response);
    return response;
  } catch (exception) {
    console.log(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/auth/logout");
    // console.log(response);
    return response;
  } catch (exception) {
    console.log(exception);
    return {
      error: true,
      exception,
    };
  }
};
