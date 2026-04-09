import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFamily } from "../redux/requestSlice";

// *** הוספנו props כדי לקבל פונקציית אימות מהאב (FromDinamy) ***
export const FamilyDetails = (props) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const [family, setFamily] = useState({ father: "", mather: "", countChild: "" })
    const savedFamily = useSelector(state => state.request.current.familyDetails);
    // פונקציה כללית לשינוי State - מעדכנת מיד
    const handleChange = (e) => {setFamily({ ...family, [e.target.name]: e.target.value });};
    
  // ---------------------בדיקות תקינות--------------------

    // בדיקת תקינות - שמות (אותיות בלבד, כולל עברית)
    const getNameError = (value) => {
        const nameRegex = /^[A-Za-z_ א-ת]+$/;
        if (!value ||!value.match(nameRegex)) {
            return "חובה להשתמש באותיות בלבד!";
        }
        return "";
    };
    // בדיקת תקינות - מספר ילדים
    const getCountChildError = (value) => {
        if (!value ||isNaN(value) || Number(value) < 0 || value === "") {
            return "חובה למלא מספר חיובי או 0!";
        }
        return "";
    };
    // --- פונקציית האימות המרכזית לשלב הנוכחי ---
    const validateStep = () => {
        const newErrors = {};
        let isValid = true;
        // 1. בדיקת שם האב
        const fatherError = family.father === "" ? 'שם האב הוא שדה חובה!' : getNameError(family.father);
        if (fatherError) {
            newErrors.father = fatherError;
            isValid = false;
        }
        // 2. בדיקת שם האם
        const matherError = family.mather === "" ? 'שם האם הוא שדה חובה!' : getNameError(family.mather);
        if (matherError) {
            newErrors.mather = matherError;
            isValid = false;
        }
        // 3. בדיקת מספר ילדים
        const countChildError = getCountChildError(family.countChild);
        if (countChildError) {
            newErrors.countChild = countChildError;
            isValid = false;
        }
        // עדכון State השגיאות
        setErrors(newErrors);
        return isValid;
    }
    // --- אפקט שמעביר את פונקציית האימות לאב (FromDinamy) ---
    useEffect(() => {
        if (props.setIsValid) {
            // מעבירים את הפונקציה validateStep
            props.setIsValid(() => validateStep);
        }
    }, [props.setIsValid, family]);

    // *** מונע dispatch אם הנתונים זהים ***
    useEffect(() => {
        if (savedFamily)
            setFamily(savedFamily)
    }, [])
    useEffect(() => {
        dispatch(addFamily(family))
    }, [family, dispatch])
    // --- handler לאימות מיידי בעת עזיבת שדה (onBlur) ---
    const handleBlurValidation = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'father') {
            error = value === "" ? 'שם האב הוא שדה חובה!' : getNameError(value);
        } else if (name === 'mather') {
            error = value === "" ? 'שם האם הוא שדה חובה!' : getNameError(value);
        } else if (name === 'countChild') {
            error = getCountChildError(value);
        }
        // עדכון state השגיאות עבור השדה הספציפי
        setErrors(prev => ({ ...prev, [name]: error }));
    }
    return (
        <>
            <h1>משפחה</h1>
            <label>שם האב</label><br />
            <input placeholder="שם האב" name="father" value={savedFamily?.father ||family.father} onChange={handleChange} onBlur={handleBlurValidation} />
            <p style={{ color: "red" }}>{errors.father}</p>
            <label>שם האם</label><br />
            <input placeholder="שם האם" name="mather" value={savedFamily?.mather ||family.mather} onChange={handleChange} onBlur={handleBlurValidation} />
            <p style={{ color: "red" }}>{errors.mather}</p>
            <label>מספר ילדים</label><br />
            <input type="number" placeholder="מספר ילדים" name="countChild" value={savedFamily?.countChild||family.countChild} onChange={handleChange} onBlur={handleBlurValidation} />
            <p style={{ color: "red" }}>{errors.countChild}</p>
        </>
    );
}