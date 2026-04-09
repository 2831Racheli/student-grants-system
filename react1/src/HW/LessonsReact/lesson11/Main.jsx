// redux 
// משתנים גלובליים לפרויקט
// קיימים ברמת שיחה - session
// כל משתנה שנרצה לשמור ביחס לריצה למסוימת:
// פרטי המשתמש, סל הקניות...

import { Provider } from "react-redux"
import s from "./redux/store"
import { Products } from "./Products"
import { AddProduct } from "./AddProduct"

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
            <Products></Products>
            <AddProduct></AddProduct>
        </Provider>
    </>
}