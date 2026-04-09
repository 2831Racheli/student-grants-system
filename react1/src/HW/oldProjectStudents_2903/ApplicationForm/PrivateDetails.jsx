
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPersonal } from "../redux/requestSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PrivateDetails = (props) => {
    const currentUser = useSelector(state => state.users.currentUser); 
    const savedPrivate = useSelector(state => state.request.current.personDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({});
    
    // הגנה: אם אין משתמש, נאתחל אובייקט ריק כדי למנוע קריסה
    const [person, setPerson] = useState({ 
        id: currentUser?.id || "", 
        firstName: currentUser?.firstName || "", 
        lastName: currentUser?.lastName || "",
        dateBorn: savedPrivate?.dateBorn || "", 
        address: savedPrivate?.address || "", 
        phone: savedPrivate?.phone || "", 
        email: savedPrivate?.email || "" 
    });

    // בדיקה אם המשתמש מחובר - אם לא, הפניה ללוגין עם הודעה
    useEffect(() => {
        if (!currentUser) {
            Swal.fire({
                icon: "info",
                title: "נדרשת התחברות",
                text: "כדי להגיש בקשה, עלייך להיות מחובר למערכת",
                confirmButtonText: "עבור להתחברות"
            }).then(() => navigate("/login"));
        }
    }, [currentUser, navigate]);
  // אזין לשינויים בטיוטה ועדכן את ה-state המקומי
    // useEffect(() => {
    //     if (savedPrivate) {
    //         setPerson(prev => ({
    //             ...prev,
    //             dateBorn: savedPrivate.dateBorn || "",
    //             address: savedPrivate.address || "",
    //             phone: savedPrivate.phone || "",
    //             email: savedPrivate.email || ""
    //         }));
    //     }
    // }, [savedPrivate]);

    useEffect(() => {
        dispatch(addPersonal(person));
        if (props.setIsValid) {
            props.setIsValid(() => () => person.dateBorn && person.address && person.phone);
        }
    }, [person, dispatch, props]);

    if (!currentUser) return <div className="page-container"><h2>טוען נתונים...</h2></div>;

    return (
        <div className="frmDiv">
            <h1>פרטים אישיים</h1>
            <p style={{background: '#333', padding: '10px', borderRadius: '5px'}}>
                מגיש הבקשה: <strong>{currentUser.firstName} {currentUser.lastName}</strong> (ת"ז: {currentUser.id})
            </p>
            
            <label>תאריך לידה:</label>
            <input type="date" value={person.dateBorn} onChange={(e) => setPerson({...person, dateBorn: e.target.value})} />
            
            <label>כתובת:</label>
            <input value={person.address} onChange={(e) => setPerson({...person, address: e.target.value})} />
            
            <label>טלפון:</label>
            <input value={person.phone} onChange={(e) => setPerson({...person, phone: e.target.value})} />

            <label>אימייל לעדכונים:</label>
            <input type="email" value={person.email} onChange={(e) => setPerson({...person, email: e.target.value})} />
            
            <label>צילום תעודת זהות:</label>
            <input type="file" onChange={(e) => props.setFiles(prev => ({...prev, idCardPhoto: e.target.files[0]}))} />
        </div>
    );
};