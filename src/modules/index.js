import { combineReducers } from "redux";
import users from "./users";
import albums from "./albums";
import photos from "./photos";
import login from "./login";

export default combineReducers({
  users,
  albums,
  photos,
  login
});
