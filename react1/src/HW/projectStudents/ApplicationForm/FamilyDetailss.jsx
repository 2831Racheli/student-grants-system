import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFamily } from "../redux/requestSlice";

export const FamilyDetails = (props) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({})
    const savedFamily = useSelector(state => state.request.current.familyDetails);
    
    const [family, setFamily] = useState({ 
        father: savedFamily?.father || "", 
        mather: savedFamily?.mather || "", 
        countChild: savedFamily?.countChild || "" 
    });

    const handleChange = (e) => { setFamily({ ...family, [e.target.name]: e.target.value }); };

    const validateStep = () => {
        const newErrors = {};
        let isValid = true;
        
        // 🔥 בדיקת חובה לכל השדות
        if (!family.father) { newErrors.father = "שם האב חובה"; isValid = false; }
        if (!family.mather) { newErrors.mather = "שם האם חובה"; isValid = false; }
        if (family.countChild === "" || family.countChild === null) { 
            newErrors.countChild = "חובה לציין מספר ילדים"; 
            isValid = false; 
        }
        
        setErrors(newErrors);
        return isValid;
    }

    useEffect(() => {
        if (props.setIsValid) {
            props.setIsValid(() => validateStep);
        }
    }, [family, props.setIsValid]);

    useEffect(() => {
        dispatch(addFamily(family))
    }, [family, dispatch])

    return (
        <div className="frmDiv">
            <h1>משפחה</h1>
            <label>שם האב:</label>
            <input name="father" value={family.father} onChange={handleChange} />
            <p style={{ color: "red", fontSize: '0.8em' }}>{errors.father}</p>
            
            <label>שם האם:</label>
            <input name="mather" value={family.mather} onChange={handleChange} />
            <p style={{ color: "red", fontSize: '0.8em' }}>{errors.mather}</p>
            
            <label>מספר ילדים:</label>
            <input type="number" name="countChild" value={family.countChild} onChange={handleChange} />
            <p style={{ color: "red", fontSize: '0.8em' }}>{errors.countChild}</p>
        </div>
    );
}