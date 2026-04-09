import { useState } from 'react'

export const Inc = () => {

    // let num = 0
    // useState - הגדרת משתנה ששינוי שלו ישפיע על התצוגה
    // הגדרת מערך
    // האיבר הראשון - המשתנה בעצמו
    // האיבר השני - הפונקציה שאחראית על עריכת המשתנה
    // בתוך הסוגריים העגולות ניתן לשלוח ערך התחלתי
    const [num, setNum] = useState(0)
    const [plus, setPlus] = useState(1)

    function incNum() {
        // num++
        setNum(num + plus)
        console.log(num);
        // pure js
        // document.getElementById('numH').innerText = num
    }

    const changePlus = (event) => {
        console.log(event);

        // event = אירוע
        // .target = האלמנט שהפעיל את האירוע
        // .value = הערך שהמשתמש הזין

        // ערך של תיבת טקסט הוא תמיד מחרוזתי
        // setPlus(parseInt(event.target.value))
        setPlus(+event.target.value)
    }

    return <>
        {/* <h1 id='numH'>{num}</h1> */}
        <h1>{num}</h1>
        {/* בריקאט לא נשים סוגריים עגולות */}
        {/* קומפוננטה עוברת קומפילציה */}
        {/* אם נשים סוגריים עגולות הפונקציה תזדמן בזמן הקומפילציה */}
        <button onClick={incNum}>increase</button>
        <br></br>

        {/* איך אפשר לשלוח פרמטרים לפונקציה */}
        {/* הרי א"א לשים סוגריים עגולות */}
        {/* נעטוף את זימון הפונקציה בפונקציה אנונימית */}

        {/* איך נוכל לגשת לערכים של אלמנט כלשהו */}
        {/* איך ניגש לאלמנט שהפעיל את האירוע */}
        {/* JS - event.currentTarget */}
        {/* אם הפונקציה האנונימית תקבל פרמטר */}
        {/* יכנס אובייקט שמכיל את הנתונים על האירוע */}
        {/* <input placeholder={'input number'} onBlur={(event) => changePlus(event)}></input> */}
        <input placeholder={'input number'} onBlur={(e) => setPlus(+e.target.value)}></input>
    </>
}

// DOM - document objects model
// תיעוד של האלמנטים על המסך בכל רגע נתון
// כל שינוי בדום - גורם לרנדור של כל העץ JS ב
// virtual dom - תיעוד מקביל של ריקאט
// ריאקט מזהה באיזה קומפוננטה חל השינוי
// ויודעת לרנדר רק את הקומפוננטות המושפעות מהשינוי
// useState ע"מ לגרום לזיהוי השינוי יש להגדיר את המשתנים כ


// function useState(value) {

//     // הגדרת משתנה והצבת ערך ברירת מחדל
//     let x = value

//     // יצירת פונקציה שמציבה ערך למשתנה
//     function func(newValue) {
//         x = newValue
//         // בדיקה אילו קומפוננטות הושפעו משינוי ערך המשתנה
//         // רנדור מחדש
//     }

//     // החזרת מערך -
//     // 1. המשתנה
//     // 2. פונקציית העריכה
//     return [x, func]
// }

