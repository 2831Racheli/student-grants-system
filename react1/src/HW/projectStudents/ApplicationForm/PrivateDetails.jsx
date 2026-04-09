import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPersonal } from "../redux/requestSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PrivateDetails = (props) => {
    const currentUser = useSelector(state => state.users.currentUser); 
    const savedPrivate = useSelector(state => state.request.current.personDetails);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [person, setPerson] = useState({ 
        id: currentUser?.id || "", firstName: currentUser?.firstName || "", lastName: currentUser?.lastName || "",
        dateBorn: savedPrivate?.dateBorn || "", address: savedPrivate?.address || "", 
        phone: savedPrivate?.phone || "", email: savedPrivate?.email || "" 
    });

    // 🔥 עדכון Redux רק בזמן שינוי אמיתי - מונע לולאות ניתוב!
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...person, [name]: value };
        setPerson(updated);
        dispatch(addPersonal(updated));
    };

    useEffect(() => {
        if (props.setIsValid) {
            props.setIsValid(() => () => 
                person.dateBorn && person.address && person.phone && person.email && props.files.idCardPhoto
            );
        }
    }, [person, props.files.idCardPhoto, props.setIsValid]);

    if (!currentUser) return <h2>טוען...</h2>;

    return (
        <div className="frmDiv">
            <h1>פרטים אישיים</h1>
            <p style={{background: '#333', padding: '10px', borderRadius: '5px'}}>
                מגיש: <strong>{currentUser.firstName} {currentUser.lastName}</strong>
            </p>
            <label>תאריך לידה:</label>
            <input type="date" name="dateBorn" value={person.dateBorn} onChange={handleChange} />
            <label>עיר מגורים:</label>
            <input name="address" value={person.address} onChange={handleChange} />
            <label>טלפון:</label>
            <input name="phone" value={person.phone} onChange={handleChange} />
            <label>אימייל:</label>
            <input type="email" name="email" value={person.email} onChange={handleChange} />
            
            <label style={{marginTop: '20px', display: 'block', fontWeight: 'bold', color: props.files.idCardPhoto ? 'green' : 'red'}}>
                {props.files.idCardPhoto ? "✓ צילום תעודת זהות צורף" : "* חובה לצרף צילום תעודת זהות"}
            </label>
            <input type="file" onChange={(e) => props.setFiles(prev => ({...prev, idCardPhoto: e.target.files[0]}))} />
        </div>
    );
};