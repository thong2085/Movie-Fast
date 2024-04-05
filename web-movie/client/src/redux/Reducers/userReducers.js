import * as userContants from "../Constants/userConstants";

//LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_LOGIN_REQUEST:
      return { isLoading: true };
    case userContants.USER_LOGIN_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userContants.USER_LOGIN_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_LOGIN_RESET:
      return {};
    case userContants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// REGISTER

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case userContants.USER_REGISTER_REQUEST:
      return { isLoading: true };
    case userContants.USER_REGISTER_SUCCESS:
      return { isLoading: false, userInfo: action.payload, isSuccess: true };
    case userContants.USER_REGISTER_FAIL:
      return { isLoading: false, isError: action.payload };
    case userContants.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};
