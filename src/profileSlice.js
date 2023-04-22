import { createSlice } from "@reduxjs/toolkit"

const profileSlice=createSlice({
    name:'userData',
    initialState:[],
    reducers:{ 
        setData(state,action){
            state.push(action.payload)
        }
    }
})
export default profileSlice.reducer
export const {setData}=profileSlice.actions