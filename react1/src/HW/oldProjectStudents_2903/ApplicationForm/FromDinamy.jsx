// import { useDispatch, useSelector } from "react-redux"
// import React, { useState } from "react"
// import Swal from "sweetalert2";
// // import './style.css'
// export const FromDinamy = (props) => {
//     let details = React.Children.toArray(props.children)
//     const [num, setNum] = useState(0)
//     // *** State לאחסון פונקציית האימות של הקומפוננטה הנוכחית ***
//     const [currentStepValidator, setCurrentStepValidator] = useState(null);
//     const prev = () => {
//         if (num > 0) {
//             setNum(num - 1)
//         }
//     }
//     const next = () => {
//         // *** הפעלת פונקציית האימות ***
//         let isValid = true;
//         if (currentStepValidator) {
//             // מפעילים את הפונקציה המאמת(validateStep)
//             isValid = currentStepValidator();
//         }
//         if (isValid) {
//             if (num < details.length - 1) {
//                 setNum(num + 1)
//             }
//         } else {
//             // אם האימות נכשל, מציג הודעת שגיאה
//             Swal.fire({ icon: "warning", title: "שגיאה", text: "חובה למלא את כל השדות בצורה תקינה לפני המעבר לשלב הבא!" });
//         }
//     }
//     const currentChild = () => {
//         // *** העברת פונקציית הקריאה החוזרת לילד הנוכחי ***
//         return React.cloneElement(details[num], {
//             setIsValid: setCurrentStepValidator // הוספת Prop
//         })
//     }
//     const goToStep = (i) => {
//         // *** אימות במעבר דרך הלחצנים של הצעדים ***
//         if (i > num) { // מונע קפיצה קדימה ללא אימות
//             let isValid = true;
//             if (currentStepValidator) {
//                 isValid = currentStepValidator();
//             }
//             if (!isValid) {
//                 Swal.fire({ icon: "warning", title: "שגיאה", text: "חובה למלא את כל השדות בצורה תקינה לפני המעבר לשלב הבא!" });
//                 return;
//             }
//         }
//         setNum(i);
//     }
//     return <>
//         <div className={'mainDiv'}>
//             <div className='stpDiv'>
//                 {details.map((x, i) => <button onClick={() => goToStep(i)} className='step' key={i}>{i + 1}</button>)}
//             </div>
//             <div className='frmDiv'>
//                 {currentChild()}
//             </div>
//             <button className='btn' onClick={prev} >חזור</button>
//             {num < details.length - 1 && <button className='btn' onClick={next}>הבא</button>}
//         </div>
//     </>
// }
import { useDispatch, useSelector } from "react-redux"
import React, { useState } from "react"
import Swal from "sweetalert2";
import { saveDraftAction } from "../redux/requestSlice";

export const FromDinamy = (props) => {
    const dispatch = useDispatch();
    const currentData = useSelector(state => state.request.current);
    let details = React.Children.toArray(props.children)
    const [num, setNum] = useState(0)
    const [currentStepValidator, setCurrentStepValidator] = useState(null);

    const saveDraft = () => {
        dispatch(saveDraftAction(currentData)); // שליחה לשרת 
    };

    const next = () => {
        let isValid = currentStepValidator ? currentStepValidator() : true;
        if (isValid) {
            if (num < details.length - 1) setNum(num + 1)
        } else {
            Swal.fire({ icon: "warning", title: "שגיאה", text: "נא למלא שדות חובה [cite: 28]" });
        }
    }

    return (
        <div className={'mainDiv'}>
            <div className='stpDiv'>
                {details.map((x, i) => (
                    <button onClick={() => setNum(i)} className={`step ${num === i ? 'active' : ''}`} key={i}>{i + 1}</button>
                ))}
                {/* כפתור שמירת טיוטה  */}
                <button onClick={saveDraft} style={{marginTop: '20px', background: '#555', color: 'white', borderRadius: '5px', cursor: 'pointer', padding: '5px'}}>💾 שמור טיוטה</button>
            </div>
            <div className='frmDiv'>
                {React.cloneElement(details[num], { setIsValid: setCurrentStepValidator })}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                <button className='btn' onClick={() => num > 0 && setNum(num - 1)}>חזור</button>
                {num < details.length - 1 && <button className='btn' onClick={next}>הבא</button>}
            </div>
        </div>
    )
}