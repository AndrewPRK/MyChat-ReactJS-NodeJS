import {createStore, applyMiddleware} from "redux"
import reducers from "../reducers"
import ws from '../middleware/ws'
import logger from '../middleware/logger'
import thunk from "redux-thunk"

const enhancer = applyMiddleware(thunk, logger,ws);
const store = createStore(reducers, {}, enhancer);
window.store = store;
export default store;