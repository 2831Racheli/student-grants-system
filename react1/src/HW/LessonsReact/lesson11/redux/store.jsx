import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'

const store = configureStore({
    // כל הסלייסים שיצרנו - יהיו מאוחדים לרדיוסר אחד
    // reducer - מילה שמורה
    // configureStore מאפיין של אובייקט הפרמטר של הפונקציה
    reducer: {
        product: productReducer
    }
})

// window.store = store
export default store