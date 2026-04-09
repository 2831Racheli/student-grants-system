export const JSXRules = () => {

    const fruits = [
        'strawberry',
        'apple',
        'peach',
        'pear',
        'plum',
        'grape',
        'watermelon',
        'orange',
        'raspberries',
        'blueberries',
        'avocado',
        'avocado',
        'avocado',
        'avocado',
        'banana'
    ]

    return <>
        {/* 1. בתוך סוגריים מסולסלות JS קוד */}

        {/* 2. camelCase - מילה שניה באות גדולה */}
        {/* מילים שמורות של הטמל ישתנו */}
        {/* font-size => fontSize */}
        {/* class => className */}
        {/* background-color => backgroundColor */}
        {/* for => htmlFor */}

        {/* 3. map מעבר על מערך - באמצעות פונקצית */}
        {/* פונקציה שממפה אובייקטים - לתת תצוגה אלמנטית */}
        <ul>
            {/* <li>{fruits[0]}</li> */}
            {/* <li>{fruits[1]}</li> */}
            {/* <li>{fruits[2]}</li> */}
            {/* <li>{fruits[3]}</li> */}
            {/* הפונקציה מקבלת פרמטר - שיכיל בכל פעם את האיבר הנוכחי */}
            {/* {fruits.map(x => <li>{x}</li>)} */}
            {/* פרמטר שני - אופצינאלי - יכיל תמיד את האינדקס של האיבר הנוכחי */}
            {fruits.map((item, index) => <li key={index}>{index} - {item}</li>)}
            {/* {fruits.map(function func(x) {
                return <li>{x}</li>
            })} */}
        </ul>
    </>
}

// annonymous function
// לפונקציה אנונימית אין משמעות בפני עצמה כיון שאין אפשרות לזמן אותה
// () => {
//     console.log('aaa');
// }

// בשביל שתהיה אפשרות לזמן אותה
// נציב אותה במשתנה
// const func = () => {
//     console.log('func');
// }

// func()

// קיצור כתיבה
// אופנה

// חץ - סימן זיהוי
// (פרמטרים) => {לוגיקה}
// אם אין פרמטרים - סוגריים ריקות
// const f1 = () => {
//     console.log('f1');
// }
// אם יש כמה פרמטרים - בתוך הסוגריים העגולות עם פסיקים ביניהם
// const f2 = (x, y) => {
//     console.log(x * y);
// }
// אם יש רק פרמטר אחד - אפשר לוותר על הסוגריים
// const f3 = x => {
//     console.log(x * x);
// }
// קוד לוגי - בתוך סוגריים מסולסלות
// אם יש רק פקודה אחת - ניתן לוותר על הסוגריים
// const f4 = () => console.log('f4');
// const f5 = num => console.log(num);