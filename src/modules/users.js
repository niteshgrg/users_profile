const GET_USERS_DATA = "GET_USERS_DATA";
const SORTED_USERS = "SORTED_USERS";
const DELETE_USER = "DELETE_USER";

const initialState = {
  users: [],
  sortBy: "",
  sortOrder: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_DATA:
      let { json } = action.payload;
      return {
        ...state,
        users: json
      };
    case SORTED_USERS:
      let { field } = action.payload;
      let sortOrderDirection = state.sortOrder;
      if (sortOrderDirection === "asc") {
        sortOrderDirection = "desc";
      } else {
        sortOrderDirection = "asc";
      }
      let sortedUsers =
        sortOrderDirection === "asc"
          ? state.users.sort((a, b) => a[field].localeCompare(b[field]))
          : state.users.sort((a, b) => b[field].localeCompare(a[field]));
      return {
        ...state,
        users: sortedUsers,
        sortBy: field,
        sortOrder: sortOrderDirection
      };
    case DELETE_USER:
      let { userId } = action.payload;
      return {
        ...state,
        users: state.users.filter(user => userId !== user.id)
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

export const sortByField = field => {
  return dispatch => {
    dispatch({
      type: SORTED_USERS,
      payload: {
        field
      }
    });
  };
};

export const deleteUser = (userId, index) => {
  return dispatch => {
    dispatch({
      type: DELETE_USER,
      payload: {
        userId,
        index
      }
    });
  };
};
