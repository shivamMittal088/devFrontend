import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connections",
    initialState : null,
    reducers : {
        setConnections : (state,action)=>{
            return action.payload;
        },
        removeConnections : ()=>{
            return null;
        }
    }
})

export const {setConnections ,removeConnections} = connectionsSlice.actions;
export default connectionsSlice.reducer;