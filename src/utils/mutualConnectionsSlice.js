const { createSlice } = require("@reduxjs/toolkit");

const mutualConnectionsSlice = createSlice(
    {
        name : "mutualConnections",
        initialState :null,
        reducers : {
            addMutuallength : (state,action)=>{
                return action.payload;
            },
            addMutualData : (state,action)=>{
                return action.payload;
            }
        }
    }
)

export const {addMutuallength ,addMutualData} = mutualConnectionsSlice.actions;

export default mutualConnectionsSlice.reducer;