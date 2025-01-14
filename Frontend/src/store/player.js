import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name:"player",
    initialState:{isPlayerDiv:false, songPath:"",img:"",},
    reducers:{
        setDiv(state){
            state.isPlayerDiv=true;
        },
        closeDiv(state){
            state.isPlayerDiv = false;
        },
        changeSong(state, action){
            const pathofSong = action.payload;
            state.songPath = pathofSong;
        },
        changeImage(state, action){
            const imgofSong = action.payload;
            state.img = imgofSong;
        },
    }
})

export const playerActions = playerSlice.actions;
export default playerSlice.reducer;