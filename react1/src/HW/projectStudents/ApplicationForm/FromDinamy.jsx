import React, { useState, useMemo } from "react"
import Swal from "sweetalert2";

export const FromDinamy = (props) => {
    // 🔥 שים לב: הסרנו את ה-useSelector של currentData כדי לשחרר את הניתובים!
    const details = useMemo(() => React.Children.toArray(props.children), [props.children]);
    const [num, setNum] = useState(0)
    const [currentStepValidator, setCurrentStepValidator] = useState(null);

    const goToStep = (i) => {
        if (i > num) {
            const isValid = currentStepValidator ? currentStepValidator() : true;
            if (!isValid) {
                Swal.fire({ icon: "warning", title: "חסרים פרטים", text: "חובה למלא את כל השדות והמסמכים בשלב זה" });
                return;
            }
        }
        setNum(i);
    }

    return (
        <div className={'mainDiv'}>
            <div className='stpDiv'>
                {details.map((x, i) => (
                    <button key={i} onClick={() => goToStep(i)} className={`step ${num === i ? 'active' : ''}`}>{i + 1}</button>
                ))}
                {/* כפתור השמירה מועבר לאחריות ה-Father כדי לא לתקוע את הרינדור כאן */}
                {props.saveButton} 
            </div>
            <div className='frmDiv'>
                {/* הוספת key=num מכריחה את ריאקט לנקות זיכרון במעבר שלב */}
                {React.cloneElement(details[num], { key: num, setIsValid: setCurrentStepValidator })}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px'}}>
                <button className='btn' onClick={() => num > 0 && setNum(num - 1)} disabled={num === 0}>חזור</button>
                {num < details.length - 1 && <button className='btn' onClick={() => goToStep(num + 1)}>הבא</button>}
            </div>
        </div>
    )
}