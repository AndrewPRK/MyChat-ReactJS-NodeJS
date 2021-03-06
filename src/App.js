import React from "react"
import Chat from "./components/Chat"
import {Provider} from "react-redux"
import store from "./store"

export default  function App(props) {
    return(
        <Provider store = {store}>
            <Chat/>
        </Provider>
    );
}