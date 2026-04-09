import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateRequestStatus, selectAllRequest, fetchRequestsForAdmin } from "../redux/requestSlice";
import { useEffect } from "react";
import '../style.css'; 

export const DisplayDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // שליפת כל הבקשות מה-Redux ומציאת הבקשה הספציפית לפי ה-_id של MongoDB
  const allRequests = useSelector(selectAllRequest);
  const request = allRequests.find((x) => x._id === id);

  // טעינת נתונים כשהקומפוננטה נטענת
  useEffect(() => {
    if (allRequests.length === 0) {
      dispatch(fetchRequestsForAdmin());
    }
  }, [dispatch, allRequests.length]);

  // פונקציות לאישור ודחייה - מעדכנות את השרת ושולחות מייל
  const handleApprove = () => {
    dispatch(updateRequestStatus({ id: request._id, status: "allow" }));
    navigate("/viewRequests");
  };

  const handleReject = () => {
    dispatch(updateRequestStatus({ id: request._id, status: "reject" }));
    navigate("/viewRequests");
  };

  if (!request) {
    return (
      <div className="details-page-container">
        <h2>טוען נתוני בקשה...</h2>
      </div>
    );
  }

  // פירוק האובייקטים מתוך ה-Details של הבקשה
  const { personDetails: person, studyDetails: study, bankDetails: bank, familyDetails: family } = request.Details;
  const docs = request.documents;

  return (
    <div className="details-page-container">
      <div className="details-card">
        <h1 className="main-title">פרטי בקשה מלאים - {person?.firstName} {person?.lastName}</h1>
        
        <div className="details-content-grid">
          
          {/* ----- פרטים אישיים ----- */}
          <div className="details-section">
            <h2 className="section-title">👤 פרטים אישיים</h2>
            <div className="details-grid">
              <div className="detail-item"><span className="detail-label">תעודת זהות:</span> <span className="detail-value">{person?.id}</span></div>
              <div className="detail-item"><span className="detail-label">תאריך לידה:</span> <span className="detail-value">{person?.dateBorn}</span></div>
              <div className="detail-item"><span className="detail-label">עיר וכתובת:</span> <span className="detail-value">{person?.address}</span></div>
              <div className="detail-item"><span className="detail-label">טלפון:</span> <span className="detail-value">{person?.phone}</span></div>
              <div className="detail-item"><span className="detail-label">אימייל:</span> <span className="detail-value">{person?.email}</span></div>
            </div>
          </div>

          {/* ----- פרטי לימודים ----- */}
          <div className="details-section">
            <h2 className="section-title">🎓 פרטי לימודים</h2>
            <div className="details-grid">
              <div className="detail-item"><span className="detail-label">מגמה:</span> <span className="detail-value">{study?.trend}</span></div>
              <div className="detail-item"><span className="detail-label">שכר לימוד:</span> <span className="detail-value">{study?.mony} ₪</span></div>
              <div className="detail-item"><span className="detail-label">שנת לימוד:</span> <span className="detail-value">{study?.countYear}</span></div>
            </div>
          </div>

          {/* ----- פרטי משפחה ----- */}
          <div className="details-section">
            <h2 className="section-title">👪 פרטי משפחה</h2>
            <div className="details-grid">
              <div className="detail-item"><span className="detail-label">שם האב:</span> <span className="detail-value">{family?.father}</span></div>
              <div className="detail-item"><span className="detail-label">שם האם:</span> <span className="detail-value">{family?.mather}</span></div>
              <div className="detail-item"><span className="detail-label">מספר אחים:</span> <span className="detail-value">{family?.countChild}</span></div>
            </div>
          </div>

          {/* ----- פרטי חשבון בנק ----- */}
          <div className="details-section">
            <h2 className="section-title">🏦 פרטי חשבון בנק</h2>
            <div className="details-grid">
              <div className="detail-item"><span className="detail-label">בעל החשבון:</span> <span className="detail-value">{bank?.holder}</span></div>
              <div className="detail-item"><span className="detail-label">שם הבנק:</span> <span className="detail-value">{bank?.nameBank}</span></div>
              <div className="detail-item"><span className="detail-label">סניף:</span> <span className="detail-value">{bank?.branchNumber}</span></div>
              <div className="detail-item"><span className="detail-label">מספר חשבון:</span> <span className="detail-value">{bank?.accountNumber}</span></div>
            </div>
          </div>
        </div>

        {/* ----- מסמכים מצורפים ----- */}
        <div className="details-section docs-section">
          <h2 className="section-title">📂 מסמכים מצורפים</h2>
          <div className="docs-buttons-container" style={{display: 'flex', gap: '15px', marginTop: '10px'}}>
            
            {docs?.idCardPhoto ? (
              <a href={`http://localhost:4500/${docs.idCardPhoto}`} target="_blank" rel="noreferrer" className="accent-button" style={{textDecoration: 'none', padding: '10px 15px'}}>
                צילום תעודת זהות
              </a>
            ) : <span className="no-file">לא הועלה צילום ת"ז</span>}

            {docs?.studentCertificate ? (
              <a href={`http://localhost:4500/${docs.studentCertificate}`} target="_blank" rel="noreferrer" className="accent-button" style={{textDecoration: 'none', padding: '10px 15px'}}>
                אישור לימודים
              </a>
            ) : <span className="no-file">לא הועלה אישור לימודים</span>}

            {docs?.bankConfirmation ? (
              <a href={`http://localhost:4500/${docs.bankConfirmation}`} target="_blank" rel="noreferrer" className="accent-button" style={{textDecoration: 'none', padding: '10px 15px'}}>
                אישור ניהול חשבון
              </a>
            ) : <span className="no-file">לא הועלה אישור בנק</span>}
            
          </div>
        </div>

        {/* ----- כפתורי פעולה למנהל ----- */}
        <div className="details-action-container" style={{marginTop: '40px', borderTop: '1px solid #444', paddingTop: '20px'}}>
          <button className="details-action-btn btn-approve" onClick={handleApprove}>אשר בקשה</button>
          <button className="details-action-btn btn-reject" onClick={handleReject}>דחה בקשה</button>
        </div>
      </div>
    </div>
  );
};