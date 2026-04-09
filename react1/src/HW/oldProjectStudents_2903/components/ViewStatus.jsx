import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectAllRequest, currentRequest } from "../redux/requestSlice";

export const ViewStatus = () => {
    const currentUser = useSelector((state) => state.users.currentUser);
    const listAllRequest1 = useSelector(selectAllRequest);
    const currentRequest1 = useSelector(currentRequest);
    const [statusR, setStatusR] = useState("");
    const [statusType, setStatusType] = useState("");

    useEffect(() => {
        const found = listAllRequest1.findLast(
            (c) => c?.Details?.personDetails?.id == currentUser?.id
        );

        let statusValue = "";
        let type = "";

        if ((!found && currentRequest1.personDetails.address) ||
            (found && currentRequest1.personDetails.address)) {
            statusValue = "הבקשה שלך בטיפול";
            type = "waiting";
        } else if (!found) {
            statusValue = "לא נמצאה בקשה עבור המשתמש";
            type = "none";
        } else {
            if (found.status === "waiting") {
                statusValue = "הבקשה שלך בטיפול";
                type = "waiting";
            } else if (found.status === "allow") {
                statusValue = "הבקשה אושרה בהצלחה";
                type = "allow";
            } else if (found.status === "reject") {
                statusValue = "הבקשה נדחתה";
                type = "reject";
            }
        }

        setStatusR(statusValue);
        setStatusType(type);
    }, [listAllRequest1, currentRequest1, currentUser]);

    return (
        <div className="page-container status-display">
            <div className={`status-card ${statusType}`}>
                
                <div className="status-icon">
                    {statusType === "allow" && "🤩"}
                    {statusType === "waiting" && "⏳"}
                    {statusType === "reject" && "❌"}
                    {statusType === "none" && "ℹ️"}
                </div>

                <h1 className={`status-${statusType}`}>{statusR}</h1>

                <p className="status-text">
                    {statusType === "waiting" && "הבקשה נבדקת כעת על ידי המערכת. נעדכן אותך בהקדם."}
                    {statusType === "allow" && "מזל טוב! ניצור איתך קשר לקבלת המלגה"}
                    {statusType === "reject" && "ניתן להגיש בקשה חדשה או לפנות לתמיכה."}
                    {statusType === "none" && "טרם הוגשה בקשה במערכת."}
                </p>

            </div>
        </div>
    );
};
