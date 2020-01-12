import { combineReducers } from "redux";
import users from "./users";
import pageInfo from "./pageInfo";
import userDetails from "./userDetails";

export default combineReducers({
  users,
  pageInfo,
  userDetails
});
