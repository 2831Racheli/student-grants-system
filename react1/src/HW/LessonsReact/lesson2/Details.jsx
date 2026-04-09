// import { Fragment } from "react";

// import React from "react";

// פונקציה יכולה לקבל פרמטרים
// קומפוננטה יכולה לקבל רק פרמטר אחד - אובייקט

export function Details({ name, age }) {

    // props - properties
    // export function Details(props) {

    // js - לוגיקה
    // let name = 'Sari'
    // const age = 19

    // const name = props.name
    // const age = props.age

    // שליפת ערכים לתוך משתנים
    // חובה להגדיר את המשתנים כשמות המפתחות
    // const { name, age } = props

    return (
        // קומפוננטה היא פונקציה
        // פונקציה יכולה להחזיר רק אלמנט אחד
        // פתרונות
        // 1. מערך
        // לא יפה.
        // [
        //     <h3>name: Sari</h3>,
        //     <h3>age: 19</h3>
        // ]
        // 2. דיב עוטף
        // לדיב יש הגבלות של מקום
        // <div>
        //     <h3>name: Sari</h3>
        //     <h3>age: 19</h3>
        // </div>
        // 3. React Fragment
        // תגית ריקה שריאקט יצרה
        // אין לה הגבלות בכלל (וגם א"א לתת לה שום הגדרה)
        // <Fragment>
        //     <h3>name: Sari</h3>
        //     <h3>age: 19</h3>
        // </Fragment>
        // <React.Fragment>
        //     <h3>name: Sari</h3>
        //     <h3>age: 19</h3>
        // </React.Fragment>
        // <></> - תגית ריקה = Fragment
        <>
            {/* {console.log(props)} */}
            {/* באמצעות סוגריים מסולסלות HTML משורשר בתוך JS קוד */}

            {/* <h3>name: {props.name}</h3> */}
            {/* <h3>age: {props.age}</h3> */}

            <h3>name: {name}</h3>
            <h3>age: {age}</h3>
        </>
    )
}