// import { useDispatch, useSelector } from "react-redux"
// import { add, addBank } from "../redux/requestSlice"
// import { useState, useEffect } from "react";
// import Swal from "sweetalert2";
// //  הוספנו props כדי לקבל פונקציית אימות מהאב (FromDinamy) 
// export const BankDetails = (props) => {
//     const dispatch = useDispatch();
//     const current = useSelector(state => state.request.current)
//     const savedBank = useSelector(state => state.request.current.bankDetails); // שם מפתח תוקן
//     const banks = ["דיסקונט", "פועלים", "מזרחי", "פאגי", "בנק הדואר", "ירושלים"]
//     const [errors, setErrors] = useState({})
//     const [bank, setBank] = useState({ holder: "", nameBank: "", branchNumber: "", accountNumber: "" })
//     // פונקציה כללית לשינוי State - מעדכנת מיד
//     const handleChange = (e) => { setBank({ ...bank, [e.target.name]: e.target.value }); };

//     // ---------------------בדיקות תקינות--------------------

//     //      פונקציה ששולחת ושומרת את כל הפרטים של הטופס ומודיע למשתמש שזה נשמר
//     const end = () => {
//         dispatch(add(current))
//         Swal.fire({ icon: "success", title: "הטופס נשלח בהצלחה!", text: "הבקשה הוגשה למעקב אחרי סטטוס הבקשה הכנס ללשונית:צפיה בסטטוס" });
//     }
//     // בדיקת תקינות - בעל חשבון (שמות בלבד)
//     const getHolderError = (value) => {
//         const nameRegex = /^[A-Za-z_ א-ת]+$/;
//         if (!value || !value.match(nameRegex)) {
//             return "חובה להשתמש באותיות בלבד!";
//         }
//         return "";
//     };
//     // בדיקת תקינות - מספרים (סניף/חשבון)
//     const getNumberError = (value, fieldName) => {
//         const minLength = fieldName === 'branchNumber' ? 2 : 4; // הנחה מינימלית
//         if (!value || isNaN(value) || Number(value) <= 0 || value.length < minLength) {
//             return `מספר ${fieldName === 'branchNumber' ? 'סניף' : 'חשבון'} לא חוקי!`;
//         }
//         return "";
//     };
//     // --- פונקציית האימות המרכזית לשלב הנוכחי ---
//     const validateStep = () => {
//         const newErrors = {};
//         let isValid = true;
//         // 1. בדיקת בעל חשבון
//         const holderError = bank.holder === "" ? 'בעל חשבון הוא שדה חובה!' : getHolderError(bank.holder);
//         if (holderError) {
//             newErrors.holder = holderError;
//             isValid = false;
//         }
//         // 2. בדיקת שם הבנק (שדה חובה)
//         if (bank.nameBank === "") {
//             newErrors.nameBank = 'חובה לבחור בנק!';
//             isValid = false;
//         } else {
//             newErrors.nameBank = '';
//         }
//         // 3. בדיקת מספר סניף
//         const branchError = bank.branchNumber === "" ? 'מספר סניף הוא שדה חובה!' : getNumberError(bank.branchNumber, 'branchNumber');
//         if (branchError) {
//             newErrors.branchNumber = branchError;
//             isValid = false;
//         }
//         // 4. בדיקת מספר חשבון
//         const accountError = bank.accountNumber === "" ? 'מספר חשבון הוא שדה חובה!' : getNumberError(bank.accountNumber, 'accountNumber');
//         if (accountError) {
//             newErrors.accountNumber = accountError;
//             isValid = false;
//         }
//         // עדכון State השגיאות
//         setErrors(newErrors);
//         return isValid;
//     }
//     // --- אפקט שמעביר את פונקציית האימות לאב (FromDinamy) ---
//     useEffect(() => {
//         if (props.setIsValid) {
//             // מעבירים את הפונקציה validateStep
//             props.setIsValid(() => validateStep);
//         }
//     }, [props.setIsValid, bank]);
//     // *** מונע dispatch אם הנתונים זהים ***
//     useEffect(() => {
//         if (savedBank)
//             setBank(savedBank)
//     }, [])
//     useEffect(() => {
//         dispatch(addBank(bank))
//     }, [bank, dispatch])
//     // --- handler לאימות מיידי בעת עזיבת שדה (onBlur) ---
//     const handleBlurValidation = (e) => {
//         const { name, value } = e.target;
//         let error = '';
//         if (name === 'holder') {
//             error = value === "" ? 'בעל חשבון הוא שדה חובה!' : getHolderError(value);
//         } else if (name === 'branchNumber') {
//             error = value === "" ? 'מספר סניף הוא שדה חובה!' : getNumberError(value, name);
//         } else if (name === 'accountNumber') {
//             error = value === "" ? 'מספר חשבון הוא שדה חובה!' : getNumberError(value, name);
//         }
//         // עדכון state השגיאות עבור השדה הספציפי
//         setErrors(prev => ({ ...prev, [name]: error }));
//     }
//     // handler מיוחד ל-select
//     const handleBankSelectChange = (e) => {
//         const { name, value } = e.target;
//         setBank({ ...bank, [name]: value });
//         // אימות מיידי
//         if (value === "") {
//             setErrors(prev => ({ ...prev, nameBank: 'חובה לבחור בנק!' }));
//         } else {
//             setErrors(prev => ({ ...prev, nameBank: '' }));
//         }
//     };
//     //    ראינו שכששולחים את הטופס ורק העמוד האחרון לא עובד הוא תמיד ישלח
//     //  כי שלחנו לדיספאטש בכל מקרה, ולכן הפרדנו לפונקציה שרק אם מלא זה נשלח

//     const checkSubmit = () => {
//         if (!validateStep()) {
//             Swal.fire({ icon: "error", title: "יש טעויות בטופס", text: "נא תקני את השדות המסומנים לפני השליחה" });
//             return;
//         }
//         end(); // הכול תקין → שולחים
//     };
//     return <>
//         <h1>פרטי חשבון</h1>
//         <label>בעל חשבון</label><br />
//         <input placeholder="בעל חשבון" name="holder" value={bank.holder} onChange={handleChange} onBlur={handleBlurValidation} /><br />
//         <p style={{ color: 'red' }}>{errors.holder}</p>
//         <label>בחר בנק </label><br />
//         {/* שימוש ב-handleBankSelectChange החדש */}
//         <select name="nameBank" value={bank.nameBank} onChange={handleBankSelectChange}>
//             <option value="" >בחר בנק </option>
//             {
//                 banks.map((i, j) =>
//                     <option value={i} key={i}>{i}</option>
//                 )
//             }
//         </select><br />
//         <p style={{ color: 'red' }}>{errors.nameBank}</p> {/* הוספת הצגת שגיאה לבנק */}
//         <label>מספר סניף</label><br />
//         <input type="number" required placeholder="מספר סניף" name="branchNumber" value={savedBank?.branchNumber || bank.holder} onChange={handleChange} onBlur={handleBlurValidation} /><br />
//         <p style={{ color: 'red' }}>{errors.branchNumber}</p>
//         <label>מספר חשבון</label><br />
//         <input type="number" required placeholder="מספר חשבון" name="accountNumber" value={savedBank?.accountNumber || bank.accountNumber} onChange={handleChange} onBlur={handleBlurValidation} /><br />
//         <p style={{ color: 'red' }}>{errors.accountNumber}</p>
//         {<button className="btn" onClick={checkSubmit}>האם כל הפרטים שמלאת נכונים?</button>}
//     </>
// }
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitApplication, addBank } from "../redux/requestSlice";
import Swal from "sweetalert2";

export const BankDetails = (props) => {
    const dispatch = useDispatch();
    const currentData = useSelector(state => state.request.current);
    const currentUser = useSelector(state => state.users.currentUser); // משתמש מחובר
    
    const [bank, setBank] = useState({ 
        holder: currentData.bankDetails?.holder || "", 
        nameBank: currentData.bankDetails?.nameBank || "", 
        accountNumber: currentData.bankDetails?.accountNumber || "" 
    });

    useEffect(() => {
        dispatch(addBank(bank));
    }, [bank, dispatch]);

    const handleFinalSubmit = () => {
        // 1. בדיקת תקינות: חובה להעלות אישור ניהול חשבון
        if (!props.files.bankConfirmation) {
            Swal.fire({
                icon: "warning",
                title: "חסר מסמך",
                text: "חובה להעלות צילום אישור ניהול חשבון כדי להמשיך"
            });
            return;
        }

        // 2. בניית האובייקט המלא כולל השם והת"ז מהמערכת (פותר את ה-undefined במייל)
        const finalDetails = {
            ...currentData,
            personDetails: {
                ...currentData.personDetails,
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
            },
            bankDetails: bank
        };

        const formData = new FormData();
        formData.append("Details", JSON.stringify(finalDetails));
        
        if (props.files.idCardPhoto) formData.append("idCardPhoto", props.files.idCardPhoto);
        if (props.files.studentCertificate) formData.append("studentCertificate", props.files.studentCertificate);
        if (props.files.bankConfirmation) formData.append("bankConfirmation", props.files.bankConfirmation);

        Swal.fire({
            title: 'אישור שליחה',
            text: "האם ברצונך לשלוח את הבקשה כעת?",
            showCancelButton: true,
            confirmButtonText: 'כן, שלח בקשה'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(submitApplication(formData));
            }
        });
    };

    return (
        <div className="frmDiv">
            <h1>פרטי בנק</h1>
            <input placeholder="בעל החשבון" value={bank.holder} onChange={(e) => setBank({...bank, holder: e.target.value})} />
            <input placeholder="מספר חשבון" type="number" value={bank.accountNumber} onChange={(e) => setBank({...bank, accountNumber: e.target.value})} />
            
            <label style={{fontWeight: 'bold', color: props.files.bankConfirmation ? 'green' : 'red'}}>
                {props.files.bankConfirmation ? "✓ אישור ניהול חשבון צורף" : "* חובה להעלות אישור ניהול חשבון"}
            </label>
            <input type="file" onChange={(e) => props.setFiles(prev => ({...prev, bankConfirmation: e.target.files[0]}))} />
            
            <button className="btn" onClick={handleFinalSubmit} style={{marginTop: '30px'}}>שלח בקשה סופית</button>
        </div>
    );
};