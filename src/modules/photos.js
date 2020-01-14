import { GET_PHOTOS_DATA, PHOTOS_DATA_RECIEVED } from "../constants";
const initialState = {
  photos: {},
  status: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_DATA:
      let { json } = action.payload;
      let tempPhotos = json.reduce((acc, curr) => {
        if (acc.hasOwnProperty(curr.albumId)) {
          acc[curr.albumId].push(curr);
        } else {
          acc[curr.albumId] = [curr];
        }
        return acc;
      }, {});
      for (let i in tempPhotos) {
        tempPhotos[i].sort((a, b) => a["title"].localeCompare(b["title"]));
      }
      return {
        ...state,
        photos: tempPhotos,
        status: PHOTOS_DATA_RECIEVED
      };
    default:
      return state;
  }
};

export const fetchPhotosData = () => {
  return dispatch => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(response => {
        if (response.status !== 200) {
          console.log("Unable to fetch users", response);
          return;
        }
        return response.json();
      })
      .then(json => {
        dispatch({
          type: GET_PHOTOS_DATA,
          payload: {
            json
          }
        });
      });
  };
};
