import { Details } from "./Details";
import { JSXRules } from "./Rules";

export function Main() {
    // return - האלמנטים צריכים להתחיל בשורת ההחזרה
    // אם מתחילים בשורה חדשה- צריך סוגריים עגולות
    // אם מתחילים באותה שורה - ניתן לוותר עליהם
    // return (
    //     <>
    //         <Details></Details>
    //         <Details></Details>
    //         <Details></Details>
    //     </>
    // )
    return <>
        {/* פרמטרים של תגית - מאפיינים - attributes */}
        {/* קומפוננטה יכולה לקבל מאפיינים רק כמחרוזת */}
        {/* אם נרצה לקבל פרמטרים מסוגים אחרים - בתוך סוגריים מסולסלות */}
        {/* <Details name="Sari" age={19}></Details> */}
        {/* <Details name='Elisheva' age={18}></Details> */}
        {/* <Details name={"Ayala"} age={24.5} phone={'0583215811'}></Details> */}

        <JSXRules></JSXRules>
    </>

}