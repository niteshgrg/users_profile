import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, LOGOUT } from "../constants";

let initialState = {
  status: null,
  searchTextCount: 0
};

if (window.localStorage.getItem("user")) {
  initialState.userEmail = JSON.parse(
    window.localStorage.getItem("user")
  ).userEmail;
  initialState.status = USER_LOGIN_SUCCESS;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      let { userEmail } = action.payload;
      return {
        ...state,
        userEmail,
        status: USER_LOGIN_SUCCESS
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        status: USER_LOGIN_ERROR
      };
    case LOGOUT:
      return { status: null, searchTextCount: 0 };
    default:
      return state;
  }
};

export const login = (userEmail, password) => {
  return dispatch => {
    //using local storage as not httponly cookie option so its anyhow going to be insecure
    if (password === window.localStorage.getItem("userPassword")) {
      window.localStorage.setItem("user", JSON.stringify({ userEmail }));
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          userEmail,
          password
        }
      });
    } else {
      dispatch({
        type: USER_LOGIN_ERROR
      });
    }
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem("user");
    dispatch({
      type: LOGOUT
    });
  };
};
