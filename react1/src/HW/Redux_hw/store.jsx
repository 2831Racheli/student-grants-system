import { configureStore } from "@reduxjs/toolkit"
import numReducer from "./numSlice"
const store = configureStore({
    // כל הסלייסים שיצרנו - יהיו מאוחדים לרדיוסר אחד
    // reducer - מילה שמורה
    // configureStore מאפיין של אובייקט הפרמטר של הפונקציה
    reducer: {
       num: numReducer
    }
})

// window.store = store
export default store