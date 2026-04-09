// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { selectNotAllowed } from "../redux/requestSlice";

// export const ViewRequests = () => {
//     // רשימת בקשות שאינן מאושרות
//     const listNotAllowed = useSelector(selectNotAllowed);
//     const navigate = useNavigate()

//     return (
//         <>
//             <div className="page-container">
//                 <h1>הי, מנהל! הנה כל הבקשות שעוד לא טיפלת... </h1>

//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>ת.ז</th>
//                             <th>שם פרטי</th>
//                             <th>שם משפחה</th>
//                             <th>מגמה</th>
//                             <th>סטטוס</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {listNotAllowed.map((req) => (
//                             <tr key={req.id} onClick={() => navigate(`/displayDetails/${req.id}`)}>
//                                 <td>{req.Details?.personDetails?.id}</td>
//                                 <td>{req.Details?.personDetails?.firstName}</td>
//                                 <td>{req.Details?.personDetails?.lastName}</td>
//                                 <td>{req.Details?.studyDetails?.trend}</td>
//                                 <td>{req.status}</td>
//                             </tr>
//                         ))}

//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRequestsForAdmin, selectNotAllowed } from "../redux/requestSlice";

export const ViewRequests = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const list = useSelector(selectNotAllowed);
    
    // Debug: נראה מה מגיע מהשרת
    console.log("List from Redux:", list);
    console.log("List length:", list.length);
    
    // State לניהול הסינונים [cite: 42]
    const [filters, setFilters] = useState({ id: "", city: "" });

    useEffect(() => {
        dispatch(fetchRequestsForAdmin());
    }, [dispatch]);

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(fetchRequestsForAdmin(filters)); // שליחת בקשת סינון לשרת [cite: 48]
    };

    return (
        <div className="page-container">
            <h1>ניהול בקשות - ממתינות לטיפול [cite: 39]</h1>

            {/* טופס סינון [cite: 42] */}
            <form onSubmit={handleFilter} style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                <input 
                    placeholder="חפש לפי ת.ז" 
                    value={filters.id} 
                    onChange={(e) => setFilters({...filters, id: e.target.value})} 
                />
                <input 
                    placeholder="עיר מגורים" 
                    value={filters.city} 
                    onChange={(e) => setFilters({...filters, city: e.target.value})} 
                />
                <button type="submit" className="btn" style={{margin: 0, width: 'auto'}}>סנן</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>ת.ז</th>
                        <th>שם מלא</th>
                        <th>עיר</th>
                        <th>מגמה</th>
                        <th>מלגה מבוקשת</th>
                        <th>סטטוס</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((req) => (
                        <tr key={req._id} onClick={() => navigate(`/displayDetails/${req._id}`)} style={{cursor: 'pointer'}}>
                            <td>{req.Details?.personDetails?.id || 'לא צוין'}</td>
                            <td>
                                {req.Details?.personDetails?.firstName || '...'} {req.Details?.personDetails?.lastName || '...'}
                            </td>
                            <td>{req.Details?.personDetails?.address?.split(' ')[0] || 'לא צוין'}</td>
                            <td>{req.Details?.studyDetails?.trend || 'לא צוין'}</td>
                            <td>{req.Details?.studyDetails?.mony ? `₪${req.Details.studyDetails.mony}` : 'לא צוין'}</td>
                            <td className={`status-${req.status}`}>
                                {req.status === 'waiting' ? 'ממתין' : 
                                 req.status === 'allow' ? 'אושר' : 
                                 req.status === 'reject' ? 'נדחה' : req.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {list.length === 0 && <p style={{textAlign: 'center', marginTop: '20px'}}>אין בקשות התואמות לחיפוש</p>}
        </div>
    );
};