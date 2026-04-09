import { createSlice } from "@reduxjs/toolkit"

const initialState ={num:0}
const NumSlice=createSlice ({
    name: 'MyNum',
    initialState,
    reducers:{
        increase: (state, action) => {
            state.num=state.num+1
        },
        decrease: (state, action) => {
            state.num=state.num-1
        },
        increaseBy: (state, action) => {
            state.num=state.num+action.payload
        },
        decreaseBy: (state, action) => {
            state.num=action.payload
        },
    } 
})
export const { increase,decrease,increaseBy,decreaseBy } = NumSlice.actions
export default NumSlice.reducer
