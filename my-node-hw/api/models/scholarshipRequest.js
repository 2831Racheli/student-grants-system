import mongoose from "mongoose";

// הגדרת התבנית לבקשת מלגה
const requestSchema = new mongoose.Schema({
    // הסטטוס ההתחלתי של כל בקשה הוא "בהמתנה" [cite: 31]
    status: { type: String, default: "waiting" },
    // תאריך הגשת הבקשה שנשמר אוטומטית ברגע היצירה [cite: 31]
    requestDate: { type: Date, default: Date.now },
    
    // אובייקט המכיל את כל פרטי הטופס בחלוקה לקטגוריות
   // נוסיף שדות לנתיבי הקבצים
    documents: {
        idCardPhoto: { type: String },      // נתיב לצילום ת.ז
        studentCertificate: { type: String }, // נתיב לאישור לימודים
        bankConfirmation: { type: String }   // נתיב לאישור ניהול חשבון
    },
    Details: {
        personDetails: {
            id: Number,
            firstName: String,
            lastName: String,
            dateBorn: String,
            address: String,
            phone: String,
            email: String
        },
        familyDetails: {
            father: String,
            mather: String,
            countChild: Number
        },
        studyDetails: {
            trend: String,
            mony: Number,
            countYear: Number
        },
        bankDetails: {
            holder: String,
            nameBank: String,
            branchNumber: Number,
            accountNumber: Number
        }
    }
});

export default mongoose.model('ScholarshipRequest', requestSchema);