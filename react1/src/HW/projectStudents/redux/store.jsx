import usersReducer from './userSlice'
import requestReducer from './requestSlice'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
    // כל הסלייסים שיצרנו - יהיו מאוחדים לרדיוסר אחד
    // reducer - מילה שמורה
    // configureStore מאפיין של אובייקט הפרמטר של הפונקציה
    reducer: {
        users: usersReducer,
        request:requestReducer
    }
})
export default store