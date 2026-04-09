import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerUser } from "../redux/userSlice"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AddUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // user state לנתוני הטופס
    const [user, setUser] = useState({ id: '', firstName: '', lastName: '', password: '' })
    
    // errors state לשמירת הודעות שגיאה לתצוגה
    const [errors, setErrors] = useState({})

    // פונקציה לשליחת הטופס לשרת
    const handleRegister = async () => {
        // בדיקה בסיסית שכל השדות מלאים לפני השליחה
        if (!user.id || !user.password || !user.firstName || !user.lastName) {
            Swal.fire({ icon: "warning", title: "שגיאה", text: "חובה למלא את כל השדות בצורה תקינה" });
            return; 
        }

        // שליחה לשרת דרך ה-Thunk שיצרנו ב-userSlice
        const resultAction = await dispatch(registerUser(user));

        // בדיקה אם הרישום הצליח בשרת
        if (registerUser.fulfilled.match(resultAction)) {
            navigate("/home"); // מעבר לדף הבית לאחר הצלחה
        }
    }

    // ---------------------בדיקות תקינות (Validation)--------------------

    const checkId = (value) => {
        if (value.length !== 9 || isNaN(value)) {
            setErrors(prev => ({ ...prev, id: 'תעודת זהות חייבת להכיל 9 ספרות!' }))
        } else {
            setErrors(prev => ({ ...prev, id: '' }))
            setUser(prev => ({ ...prev, id: Number(value) }))
        }
    }

    const checkFN = (value) => {
        const fnRegex = /^[A-Za-z\sא-ת]+$/
        if (!value.match(fnRegex)) {
            setErrors(prev => ({ ...prev, fn: 'שם פרטי יכול להכיל רק אותיות!' }))
        } else {
            setErrors(prev => ({ ...prev, fn: '' }))
            setUser(prev => ({ ...prev, firstName: value }))
        }
    }

    const checkLN = (value) => {
        const lnRegex = /^[A-Za-z\sא-ת]+$/
        if (!value.match(lnRegex)) {
            setErrors(prev => ({ ...prev, ln: 'שם משפחה יכול להכיל רק אותיות!' }))
        } else {
            setErrors(prev => ({ ...prev, ln: '' }))
            setUser(prev => ({ ...prev, lastName: value }))
        }
    }

    const checkPW = (value) => {
        if (value.length < 8) {
            setErrors(prev => ({ ...prev, password: 'הסיסמה חייבת להיות לפחות 8 תווים!' }))
        } else {
            setErrors(prev => ({ ...prev, password: '' }))
            setUser(prev => ({ ...prev, password: value })) // השרת מצפה לסיסמה (נשלח כטקסט להצפנה)
        }
    }

    return (
        <div className="form-container">
            <h2>יצירת חשבון חדש</h2>
            
            <label htmlFor='D'>תעודת זהות:</label><br />
            <input id='D' placeholder="הכנס תעודת זהות" type="number" onBlur={(e) => checkId(e.target.value)} />
            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.id}</p>

            <label htmlFor='P'>שם פרטי:</label><br />
            <input id='P' placeholder="הכנס שם פרטי" onBlur={(e) => checkFN(e.target.value)} />
            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.fn}</p>

            <label htmlFor='I'>שם משפחה:</label><br />
            <input id='I' placeholder="הכנס שם משפחה" onBlur={(e) => checkLN(e.target.value)} />
            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.ln}</p>

            <label htmlFor='t'>סיסמה:</label><br />
            <input id='t' placeholder="הכנס סיסמה" type="password" onBlur={(e) => checkPW(e.target.value)} />
            <p style={{ color: 'red', fontSize: '0.8em' }}>{errors.password}</p>
            
            <button onClick={handleRegister}>הירשם עכשיו</button>
        </div>
    )
}