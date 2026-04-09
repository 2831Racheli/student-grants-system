import { useState, useEffect } from 'react'

export const Comp = () => {

    const [list, setList] = useState([
        'aaa', 'bbb', 'ccc', 'ddd', 'eee'
    ])

    // useEffect
    // מחזור החיים של הקומפוננטה
    // life cycle
    // היכולת לשלוט על שינוי בטעינת הקומפוננטה
    // לתפוס את רגע הטעינה - רק בעת טעינה ולא ברנדור
    // בעת שינוי של משתנה מסוים
    // בעת דריסה
    // 1. on load - on init
    // 2. on changes
    // 3. on destroy

    // מקבלת 2 פרמטרים:
    // 1. פונקציה
    // מה שנכתוב בפונקציה - יקרה בעת טעינה
    // return הפונקציה מחזירה פונקציה - תקרה בעת דריסה
    // 2. מערך
    useEffect(() => {
        // on init
        console.log('init');

        // on destroy
        // return () => { }
        //  ברגע שהקומפוננטה כבר לא מוצגת
        // לחיצה על כפתור שתנתב למקום אחר . לא מציגה
        // מעבר בתפריט
        // סגירת האפליקציה
        return () => {
            document.title = 'React App'
            console.log('exit');
        }

    }, [])

    useEffect(() => {
        document.title = `There are ${list.length} items in the list`
    }, [list])

    return <>
        <h1>component</h1>
        {list.map(x => <p>{x}</p>)}
        {/* splice - מחיקה מאינדקס כמה איברים */}
        {/* מחקנו את כל האיברים חוץ מהאחרון */}
        {/* הפונקציה מחזירה את האיברים שנמחקו */}
        {/* החזרנו את כל מה שנמחק והצבנו במערך מחדש */}
        <button onClick={() => setList(list.splice(0, list.length - 1))}>remove last</button>
    </>
}