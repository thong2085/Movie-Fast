import Axios from "./Axios";

// register new user API call
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

//logout user Functions
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

//login user API call
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// update profile API call
const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

export {
  registerService,
  logoutService,
  loginService,
  updateProfileService,
  deleteProfileService,
};
