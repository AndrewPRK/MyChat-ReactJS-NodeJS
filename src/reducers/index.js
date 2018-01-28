import {combineReducers} from "redux"
import userReducer from "./users"
import messagesReduser from "./messages"

const reducers = combineReducers({
    users : userReducer,
    messages : messagesReduser
});

export default reducers;