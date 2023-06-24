import axios from "axios";

const usersAPI = "http://localhost:8000/users/token/";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(
      usersAPI,
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("Invalid username or password");
    } else {
      throw new Error("Failed to login");
    }
  }
};

export const getUser = (token) => {
  return axios.get("http://localhost:8000/users/api/v1/", {
    headers: { Authorization: `Token ${token}` },
  });
};
