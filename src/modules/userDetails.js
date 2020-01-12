const GET_USER_DETAILS = "GET_USER_DETAILS";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      let { json } = action.payload;
      return {
        ...state,
        [json.id]: json
      };
    default:
      return state;
  }
};

export const fetchUseDetails = userId => {
  return (dispatch, getState) => {
    const { userDetails } = getState();
    if (userDetails.hasOwnProperty(userId)) {
      dispatch({
        type: GET_USER_DETAILS,
        payload: {
          json: userDetails[userId]
        }
      });
    } else {
      fetch("https://jsonplaceholder.typicode.com/users/" + userId)
        .then(response => {
          if (response.status !== 200) {
            console.log("Unable to fetch user details", response);
            return;
          }
          return response.json();
        })
        .then(json => {
          dispatch({
            type: GET_USER_DETAILS,
            payload: {
              json
            }
          });
        });
    }
  };
};
