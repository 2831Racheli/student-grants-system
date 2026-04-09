import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/requestSlice";

//  הוספנו props כדי לקבל פונקציית אימות מהאב (FromDinamy)
export const StudyDetails = (props) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const savedLearn = useSelector(state => state.request.current.studyDetails);
    const [curse, setCurse] =useState({ trend: "", mony: "", countYear: ""})
    // פונקציה כללית לשינוי State - מעדכנת מיד
    const handleChange = (e) => {setCurse(prev => ({ ...prev, [e.target.name]: e.target.value }));};
    
      // ---------------------בדיקות תקינות--------------------

    // --- פונקציות עזר לאימות שמחזירות את הודעת השגיאה
    const getTrendError = (value) => {
        const trendRegex = /^[A-Za-z_ א-ת]+$/;
        if (!value || !value.match(trendRegex)) {
            return 'חובה להשתמש באותיות בלבד!';}
        return '';};
    // בדיקת תקינות - שכר לימוד (מספר חיובי)
    const getMonyError = (value) => {
        if (!value  ||isNaN(value) || Number(value) <= 0 || value === "") {
            return 'חובה למלא מספר חיובי!';}
        return '';};
    // בדיקת תקינות - שנות לימוד (מספר חיובי)
    const getCountYearError = (value) => {
        if (!value || isNaN(value) || Number(value) <= 0 || value === "") {
             return 'חובה למלא מספר חיובי!'; }
        return '';};
    // --- פונקציית האימות המרכזית לשלב הנוכחי ---
    const validateStep = () => {
        const newErrors = {};
        let isValid = true;
        // 1. בדיקת מגמה
        const trendError = curse.trend === "" ? 'המגמה היא שדה חובה!' : getTrendError(curse.trend);
        if (trendError) {
            newErrors.trend = trendError;
            isValid = false;
        }
        // 2. בדיקת שכר לימוד
        const monyError = getMonyError(curse.mony);
        if (monyError) {
            newErrors.mony = monyError;
            isValid = false;
        }
        // 3. בדיקת שנות לימוד
        const countYearError = getCountYearError(curse.countYear);
        if (countYearError) {
            newErrors.countYear = countYearError;
            isValid = false;
        }
        // עדכון State השגיאות
        setErrors(newErrors);
        return isValid;
    }
    // מעביר את פונקציית האימות לאב (FromDinamy) ---
    useEffect(() => {
        if (props.setIsValid) {
            // מעבירים את הפונקציה validateStep
            props.setIsValid(() => validateStep);
        }
    }, [props.setIsValid, curse]);
    useEffect(() => {
        if (savedLearn)
            setCurse(savedLearn)
    }, [])
    useEffect(() => {
        dispatch(addCourse(curse))
    }, [curse, dispatch])
    const handleBlurValidation = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'trend') {
            error = value === "" ? 'המגמה היא שדה חובה!' : getTrendError(value);
        } else if (name === 'mony') {
            error = getMonyError(value);
        } else if (name === 'countYear') {
            error = getCountYearError(value);
        }
        // עדכון state השגיאות עבור השדה הספציפי
        setErrors(prev => ({ ...prev, [name]: error }));
    }
    return (
        <>
            <h1>לימודים</h1>
            <label>מגמה</label><br />
            <input placeholder="מגמה" name="trend" value={savedLearn?.curse ||curse.trend} onChange={handleChange} onBlur={handleBlurValidation} /><br />
            <p style={{ color: 'red' }}>{errors.trend}</p>
            <label>שכר לימוד</label><br />
            <input type="number" placeholder="שכר לימוד" name="mony" value={savedLearn?.curse ||curse.mony} onChange={handleChange} onBlur={handleBlurValidation} /><br />
            <p style={{ color: 'red' }}>{errors.mony}</p>
            <label>שנות לימוד</label><br />
            <input type="number" placeholder="שנות לימוד" name="countYear" value={savedLearn?.countYear||curse.countYear} onChange={handleChange} onBlur={handleBlurValidation} /><br />
            <p style={{ color: 'red' }}>{errors.countYear}</p>
        </>
    );
}