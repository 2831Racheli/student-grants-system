import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice"



const store =configureStore({
    reducer: {
        NumReducer: NumReducer
        // ????????????למה לא צהוב
    }
})


export default store
