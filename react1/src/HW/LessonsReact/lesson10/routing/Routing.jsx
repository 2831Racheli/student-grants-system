// הגדרות של הניתובים
// כתובת מסוימת url אם יהיה כתוב בשורת ה

import { BrowserRouter, Route, Routes } from "react-router"
import { Home } from "../components/Home"
import { Login } from "../components/Login"
import { Welcome } from "../components/Welcome"
import { Products } from "../components/Products"
import { Details } from "../components/Details"
import { Nav } from "./Nav"

// תוצג קומפוננטה מסוימת
export const Routing = () => {
    return <>
        {/* BrowserRouter - טעינה של קומפוננטה אחת בלבד לפי הראוטינג */}
        {/* <BrowserRouter> */}
        {/* Nav - קומפוננטת התפריט */}
        {/* BrowserRouter קומפוננטת התפריט צריכה להיות טעונה בתוך ה */}
        {/* <Nav></Nav> */}
        {/* Routes - תגית האב של כל הגדרות הניתובים */}
        <Routes>
            {/* Route - מגדיר ניתוב בודד */}
            {/* שני מאפיינים: */}
            {/* path = ניתוב */}
            {/* element = קומפוננטה */}
            {/* component = שיטה ישנה - טעינה של תגית בודדת */}
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="welcome" element={<Welcome></Welcome>}></Route>
            <Route path="products" element={<Products></Products>}>
                {/* הגדרת ניתוב כילד */}
                {/* בין התגיות של האב */}
                {/* ניתוב בנוסף ולא במקום */}
                {/* ניתן להגדיר ילדים רבים */}
                {/* הילדים מתייחסים ביניהם כאחים */}
                <Route path="details" element={<Details></Details>}></Route>
            </Route>
            {/* שליחת פרמטרים בניתוב */}
            {/* באמצעות סלש נקודתיים ושם הפרמטר */}
            {/* ניתן לשרשר יותר מפרמטר אחד */}
            {/* <Route path="details/:desc/:price/:image" element={<Details></Details>}></Route> */}
        </Routes>
        {/* </BrowserRouter> */}
    </>
}