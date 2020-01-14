import { GET_USERS_DATA, USER_DATA_RECIEVED } from "../constants";

const initialState = {
  users: [],
  status: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_DATA:
      let { json } = action.payload;
      let sortedUsers = json.sort((a, b) => a["name"].localeCompare(b["name"]));
      return {
        ...state,
        users: sortedUsers,
        status: USER_DATA_RECIEVED
      };
    default:
      return state;
  }
};

export const fetchUsersData = () => {
  return dispatch => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (response.status !== 200) {
          console.log("Unable to fetch users", response);
          return;
        }
        return response.json();
      })
      .then(json => {
        dispatch({
          type: GET_USERS_DATA,
          payload: {
            json
          }
        });
      });
  };
};
