import { combineReducers } from "redux";
import posts from './posts';
import auth from "./user";

export default combineReducers({posts, auth});