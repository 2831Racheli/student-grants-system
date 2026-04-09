import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchMyStatus } from "../redux/requestSlice";

export const ViewStatus = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.users.currentUser);
    const myRequest = useSelector((state) => state.request.myRequest);

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(fetchMyStatus(currentUser.id));
        }
    }, [dispatch, currentUser]);

    // הגדרת המידע להצגה לפי הסטטוס
    const getStatusInfo = () => {
        if (!myRequest) return { 
            text: "אין בקשה עבור המשתמש", 
            icon: "ℹ️", 
            class: "none", 
            desc: "טרם הוגשה בקשה למלגה במערכת עבורך." 
        };

        const s = myRequest.status;
        if (s === "waiting") return { text: "הבקשה בטיפול", icon: "⏳", class: "waiting", desc: "הבקשה נבדקת כעת. נעדכן אותך במייל." };
        if (s === "allow") return { text: "הבקשה אושרה!", icon: "🤩", class: "allow", desc: "מזל טוב! ניצור איתך קשר לקבלת המענק." };
        if (s === "reject") return { text: "הבקשה נדחתה", icon: "❌", class: "reject", desc: "לצערנו לא ניתן לאשר את הבקשה כרגע." };
        return { text: "טיוטה", icon: "💾", class: "draft", desc: "הבקשה נשמרה כטיוטה וטרם הוגשה." };
    };

    const info = getStatusInfo();

    return (
        <div className="page-container status-display">
            <div className={`status-card ${info.class}`}>
                <div className="status-icon">{info.icon}</div>
                <h1 className={`status-${info.class}`}>{info.text}</h1>
                <p className="status-text">{info.desc}</p>
                {myRequest && (
                    <small>עודכן לאחרונה: {new Date(myRequest.requestDate).toLocaleDateString()}</small>
                )}
            </div>
        </div>
    );
};