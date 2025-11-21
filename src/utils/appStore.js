import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsReducer from "./connectionsSlice";
import requestsReducer from "./requestsSlice";
import mutualConnectionsReducer from "./mutualConnectionsSlice"

const appStore = configureStore({
    reducer : {
        user : userReducer,
        feed : feedReducer,
        connections : connectionsReducer,
        requests : requestsReducer,
        mutual : mutualConnectionsReducer,
        
    },
})

export default appStore;