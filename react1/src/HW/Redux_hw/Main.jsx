import { Provider } from "react-redux"
import s from "../Redux_hw/store"
import { Add } from "../Redux_hw/Add"
// שתי גירסאות:
// 1. redux - ישנה
// ארוכה, מובנת
// 2. redux toolkit - חדשה
// מקוצרת

// התקנות:
// 1. 
// npm i redux - ישנה
// npm i @reduxjs/toolkit - חדשה
// 2. npm i react-redux - תקשורת של הקומפוננטות עם רידקס - בשתי השיטות

export const Main = () => {
    return <>
        {/* Provider - ספק */}
        {/* כל קומפוננטה שתהיה טעונה בתוך הספק תכיר הסטור */}
        {/* הספק מקבל כפרופס את הסטור */}
        <Provider store={s}>
            <Add></Add>
        </Provider>
    </>
}