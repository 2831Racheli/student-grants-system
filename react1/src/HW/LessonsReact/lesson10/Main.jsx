// routing - ניתוב
// router - נתב
// דמה ראוטינג
// אילו קומפוננטות ואילו לא
// משתנה בוליאני - מסובך
// url משתמש בשורת ה
// תפעול קל
// הסטוריה
// קישור ספציפי

import { BrowserRouter } from "react-router"
import { Routing } from "./routing/Routing"
import { Nav } from "./routing/Nav"

// שתי התקנות
// npm i react-router
// npm i react-router-dom

export const Main = () => {
    return <>
        {/* <Routing></Routing> */}
        {/* <Header></Header> */}
        <BrowserRouter>
            <Nav></Nav>
            {/* <MainArticle> */}
            {/* היכן שנטען את קומפוננטת הניתובים */}
            {/* שם תטענה הקומפוננטות שמגיעות דרך הניתוב */}
            <Routing></Routing>
            {/* </MainArticle> */}
        </BrowserRouter>
        {/* <Footer></Footer> */}
    </>
}