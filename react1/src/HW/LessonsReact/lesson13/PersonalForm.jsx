import { useState } from "react"

export const PersonalForm = () => {

    const [personalDetails, setPersonalDetails] = useState({})
    const [errors, setErrors] = useState({})

    const checkId = (value) => {
        // אם אורך לא תקין
        if (value.length !== 9 || isNaN(value)) {  // Make sure ID is formatted properly
            // שגיאה
            setErrors({ ...errors, id: 'id length is too short!' })
            // ריקון ערך מ.ז
            setPersonalDetails({ ...personalDetails, id: '' })
        }
        else {
            let sum = 0, incNum;
            for (let i = 0; i < value.length; i++) {
                incNum = Number(value[i]) * ((i % 2) + 1);  // Multiply number by 1 or 2
                sum += (incNum > 9) ? incNum - 9 : incNum;  // Sum the digits up and add to total
            }
            if (sum % 10 !== 0) {
                // שגיאה של תקינות מ.ז
                setErrors({ ...errors, id: 'invalid id!' })
                // ריקון ערך מ.ז
                setPersonalDetails({ ...personalDetails, id: '' })
            }
            else {
                // מ.ז תקין
                // ריקון שגיאה
                setErrors({ ...errors, id: '' })
                // הצבת מ.ז
                setPersonalDetails({ ...personalDetails, id: value })
            }
        }

    }

    const checkFN = (value) => {
        const fnRegex = /[A-Za-z_ א-ת]$/
        // בדיקה של ביטוי רגולרי
        // שתי פונקציות זהות בפעולה שונות בהפעלה
        // 1. match
        // value.match(/regex/)
        if (!value.match(fnRegex)) {
            setErrors({ ...errors, fn: 'invalid firstname!' })
            setPersonalDetails({ ...personalDetails, firstname: '' })
        }
        else {
            setErrors({ ...errors, fn: '' })
            setPersonalDetails({ ...personalDetails, firstname: value })
        }
    }

    const checkLN = (value) => {

    }

    const checkPhone = (value) => {
        // 2. test
        // /regex/i.test(value)
        if (!/[0]8-9[0-9]$/i.test(value)) {
            setErrors({ ...errors, phone: 'invalid phone!' })
            setPersonalDetails({ ...personalDetails, phone: '' })
        }
        else {
            setErrors({ ...errors, phone: '' })
            setPersonalDetails({ ...personalDetails, phone: value })
        }
    }

    const checkEmail = (value) => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value)) {
            setErrors({ ...errors, email: 'invalid email!' })
            setPersonalDetails({ ...personalDetails, email: '' })
        }
        else {
            setErrors({ ...errors, email: '' })
            setPersonalDetails({ ...personalDetails, email: value })
        }
    }

    const checkPW = (value) => {

    }

    return <>
        <label htmlFor="Id">Id:</label><br></br>
        <input id="Id" placeholder="input id" onChange={(e) => checkId(e.target.value)}></input><br></br>
        <p style={{ color: 'red' }}>{errors.id}</p>
        <label htmlFor="FN">Firstname:</label><br></br>
        <input id="FN" placeholder="input firstname" onChange={(e) => checkFN(e.target.value)}></input><br></br>
        <p style={{ color: 'red' }}>{errors.fn}</p>
        <label htmlFor="LN">Lastname:</label><br></br>
        <input id="LN" placeholder="input lastname"></input><br></br>
        <label htmlFor="P">Phone:</label><br></br>
        <input id="P" placeholder="input phone" onChange={(e) => checkPhone(e.target.value)}></input><br></br>
        <p style={{ color: 'red' }}>{errors.phone}</p>
        <label htmlFor="E">Email:</label><br></br>
        <input id="E" placeholder="input email" onChange={(e) => checkEmail(e.target.value)}></input><br></br>
        <p style={{ color: 'red' }}>{errors.email}</p>
        <label htmlFor="PW">Password:</label><br></br>
        <input id="PW" placeholder="input password"></input><br></br>
    </>
}