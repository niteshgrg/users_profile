import { GET_ALBUMS_DATA, ALBUMS_DATA_RECIEVED } from "../constants";

const initialState = {
  albums: {},
  status: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALBUMS_DATA:
      let { json } = action.payload;
      let tempAlbums = json.reduce((acc, curr) => {
        if (acc.hasOwnProperty(curr.userId)) {
          acc[curr.userId].push(curr);
        } else {
          acc[curr.userId] = [curr];
        }
        return acc;
      }, {});
      for (let i in tempAlbums) {
        tempAlbums[i].sort((a, b) => a["title"].localeCompare(b["title"]));
      }
      return {
        ...state,
        albums: tempAlbums,
        status: ALBUMS_DATA_RECIEVED
      };
    default:
      return state;
  }
};

export const fetchAlbumsData = () => {
  return dispatch => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        if (response.status !== 200) {
          console.log("Unable to fetch users", response);
          return;
        }
        return response.json();
      })
      .then(json => {
        dispatch({
          type: GET_ALBUMS_DATA,
          payload: {
            json
          }
        });
      });
  };
};
