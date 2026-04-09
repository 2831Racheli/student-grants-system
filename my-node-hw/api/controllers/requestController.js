
// // ייבוא המודל של בקשת המלגה
// import requestModel from '../models/scholarshipRequest.js';
// // ייבוא שירות המיילים 
// import { sendStatusEmail } from '../utils/emailService.js';

// /**
//  * פונקציה להגשת בקשה חדשה
//  * הפונקציה מקבלת את כל האובייקט Details מהפרונט-אנד
//  */
// export const createRequest = async (req, res) => {
//     try {
//         // המידע הטקסטואלי מגיע כטקסט בגלל ה-form-data (בגלל השימוש ב-Multer)
//         const Details = JSON.parse(req.body.Details); 

//         // 💡 בדיקה אם קיימת טיוטה קודמת למשתמש זה כדי להפוך אותה לבקשה רשמית
//         let existingRequest = await requestModel.findOne({ 
//             "Details.personDetails.id": Details.personDetails.id, 
//             status: "draft" 
//         });

//         if (existingRequest) {
//             // אם הייתה טיוטה, נעדכן אותה לבקשה רשמית בסטטוס "waiting"
//             existingRequest.Details = Details;
//             existingRequest.status = "waiting";
//             existingRequest.requestDate = Date.now();
            
//             // עדכון קבצים אם נשלחו בבקשה הנוכחית
//             if (req.files) {
//                 if (req.files['idCardPhoto']) existingRequest.documents.idCardPhoto = req.files['idCardPhoto'][0].path;
//                 if (req.files['studentCertificate']) existingRequest.documents.studentCertificate = req.files['studentCertificate'][0].path;
//                 if (req.files['bankConfirmation']) existingRequest.documents.bankConfirmation = req.files['bankConfirmation'][0].path;
//             }
            
//             await existingRequest.save();

//             // 📧 שליחת מייל אישור קליטה לכתובת r0548411399@gmail.com (או המייל שבטופס)
//             await sendStatusEmail(Details.personDetails.email, Details.personDetails.firstName, "waiting");

//             return res.status(200).send({ message: "הטיוטה הפכה לבקשה רשמית!", request: existingRequest });
//         }

//         // יצירת מופע חדש של בקשה (אם לא הייתה טיוטה קודמת)
//         const newRequest = new requestModel({
//             Details: Details,
//             documents: {
//                 idCardPhoto: (req.files && req.files['idCardPhoto']) ? req.files['idCardPhoto'][0].path : null,
//                 studentCertificate: (req.files && req.files['studentCertificate']) ? req.files['studentCertificate'][0].path : null,
//                 bankConfirmation: (req.files && req.files['bankConfirmation']) ? req.files['bankConfirmation'][0].path : null
//             }
//         });

//         // שמירה במסד הנתונים
//         await newRequest.save();

//         // 📧 שליחת מייל אישור קליטה מיד לאחר השמירה
//         await sendStatusEmail(Details.personDetails.email, Details.personDetails.firstName, "waiting");

//         res.status(201).send({ message: "הבקשה עם המסמכים נקלטה בהצלחה!", request: newRequest });
//     } catch (error) {
//         res.status(500).send("שגיאה בשמירת הבקשה: " + error.message);
//     }
// };

// /**
//  * פונקציה חדשה: שמירת טיוטה (Draft)
//  * מאפשרת למשתמש לשמור את ההתקדמות שלו בלי להגיש סופית
//  */
// export const saveDraft = async (req, res) => {
//     try {
//         const { Details } = req.body;
//         const userId = Details.personDetails.id;

//         // חיפוש טיוטה קיימת (status: draft) כדי לעדכן אותה או ליצור חדשה
//         let draft = await requestModel.findOne({ "Details.personDetails.id": userId, status: "draft" });

//         if (draft) {
//             draft.Details = Details;
//             await draft.save();
//         } else {
//             draft = new requestModel({
//                 Details: Details,
//                 status: "draft"
//             });
//             await draft.save();
//         }

//         res.status(200).send({ message: "הטיוטה נשמרה בהצלחה", draft });
//     } catch (error) {
//         res.status(500).send("שגיאה בשמירת הטיוטה: " + error.message);
//     }
// };

// /**
//  * פונקציה לשליפת הבקשה האחרונה של משתמש ספציפי
//  * נשתמש בזה עבור דף "צפייה בסטטוס" [cite: 36]
//  */
// export const getMyStatus = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // חיפוש הבקשה האחרונה (ממוין לפי תאריך יורד)
//         const lastRequest = await requestModel.findOne({ "Details.personDetails.id": userId })
//             .sort({ requestDate: -1 }); 

//         if (!lastRequest) {
//             return res.status(404).send("לא נמצאה בקשה עבור משתמש זה");
//         }

//         res.status(200).send(lastRequest);
//     } catch (error) {
//         res.status(500).send("שגיאה בשליפת הסטטוס: " + error.message);
//     }
// };

// /**
//  * פונקציה לשליפת כל הבקשות עבור המנהל כולל סינון ומיון
//  */
// export const getAllRequestsForAdmin = async (req, res) => {
//     try {
//         // שליפת פרמטרי הסינון מה-Query String
//         const { id, city, minSiblings, maxSiblings, minMony, maxMony, startDate, endDate, sortBy, order } = req.query;

//         // בניית אובייקט השאילתה - נשלוף בקשות שאינן מאושרות ואינן טיוטות
//         let query = { status: { $nin: ["allow", "draft"] } };

//         if (id) query["Details.personDetails.id"] = id;
//         if (city) query["Details.personDetails.address"] = { $regex: city, $options: 'i' };

//         if (minSiblings || maxSiblings) {
//             query["Details.familyDetails.countChild"] = {};
//             if (minSiblings) query["Details.familyDetails.countChild"].$gte = Number(minSiblings);
//             if (maxSiblings) query["Details.familyDetails.countChild"].$lte = Number(maxSiblings);
//         }

//         if (minMony || maxMony) {
//             query["Details.studyDetails.mony"] = {};
//             if (minMony) query["Details.studyDetails.mony"].$gte = Number(minMony);
//             if (maxMony) query["Details.studyDetails.mony"].$lte = Number(maxMony);
//         }

//         if (startDate || endDate) {
//             query.requestDate = {};
//             if (startDate) query.requestDate.$gte = new Date(startDate);
//             if (endDate) query.requestDate.$lte = new Date(endDate);
//         }

//         let sortOptions = {};
//         if (sortBy) {
//             sortOptions[sortBy] = order === 'desc' ? -1 : 1;
//         } else {
//             sortOptions.requestDate = -1; // ברירת מחדל: החדשים ביותר למעלה
//         }

//         // שליפת נתונים נבחרים בלבד לייעול התצוגה בטבלה
//         const requests = await requestModel.find(query)
//             .select('Details.personDetails.id Details.personDetails.firstName Details.personDetails.lastName Details.studyDetails.trend status requestDate')
//             .sort(sortOptions);

//         res.status(200).send(requests);
//     } catch (error) {
//         res.status(500).send("שגיאה בשליפת בקשות למנהל: " + error.message);
//     }
// };

// /**
//  * פונקציה לעדכון סטטוס בקשה (אישור או דחייה) ע"י מנהל
//  * תואמת ללוגיקה של DisplayDetails.jsx בפרונט
//  */
// export const updateRequestStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; // "allow" או "reject"

//         if (!['allow', 'reject'].includes(status)) {
//             return res.status(400).send("סטטוס לא חוקי. ניתן רק לאשר (allow) או לדחות (reject)");
//         }

//         const updatedRequest = await requestModel.findByIdAndUpdate(
//             id,
//             { status: status },
//             { new: true }
//         );

//         if (!updatedRequest) {
//             return res.status(404).send("לא נמצאה בקשה עם מזהה זה");
//         }

//         // 📧 שליחת מייל עדכון לסטודנט על החלטת המנהל
//         await sendStatusEmail(
//             updatedRequest.Details.personDetails.email, 
//             updatedRequest.Details.personDetails.firstName, 
//             status
//         );

//         res.status(200).send({
//             message: `סטטוס הבקשה עודכן בהצלחה ל-${status}`,
//             request: updatedRequest
//         });

//     } catch (error) {
//         res.status(500).send("שגיאה בעדכון סטטוס הבקשה: " + error.message);
//     }
// };
import requestModel from '../models/scholarshipRequest.js';
import { sendStatusEmail } from '../utils/emailService.js';

export const createRequest = async (req, res) => {
    try {
        const Details = JSON.parse(req.body.Details); 
        let existingRequest = await requestModel.findOne({ 
            "Details.personDetails.id": Details.personDetails.id, 
            status: "draft" 
        });

        if (existingRequest) {
            existingRequest.Details = Details;
            existingRequest.status = "waiting";
            existingRequest.requestDate = Date.now();
            if (req.files) {
                if (req.files['idCardPhoto']) existingRequest.documents.idCardPhoto = req.files['idCardPhoto'][0].path;
                if (req.files['studentCertificate']) existingRequest.documents.studentCertificate = req.files['studentCertificate'][0].path;
                if (req.files['bankConfirmation']) existingRequest.documents.bankConfirmation = req.files['bankConfirmation'][0].path;
            }
            await existingRequest.save();
            await sendStatusEmail(Details.personDetails.email, Details.personDetails.firstName, "waiting");
            return res.status(200).send({ message: "הטיוטה הפכה לבקשה רשמית!", request: existingRequest });
        }

        const newRequest = new requestModel({
            Details: Details,
            documents: {
                idCardPhoto: (req.files && req.files['idCardPhoto']) ? req.files['idCardPhoto'][0].path : null,
                studentCertificate: (req.files && req.files['studentCertificate']) ? req.files['studentCertificate'][0].path : null,
                bankConfirmation: (req.files && req.files['bankConfirmation']) ? req.files['bankConfirmation'][0].path : null
            }
        });
        await newRequest.save();
        await sendStatusEmail(Details.personDetails.email, Details.personDetails.firstName, "waiting");
        res.status(201).send({ message: "הבקשה נקלטה!", request: newRequest });
    } catch (error) {
        res.status(500).send("שגיאה בשמירה: " + error.message);
    }
};

export const saveDraft = async (req, res) => {
    try {
        const { Details } = req.body;
        const userId = Details.personDetails.id;
        let draft = await requestModel.findOne({ "Details.personDetails.id": userId, status: "draft" });
        if (draft) {
            draft.Details = Details;
            await draft.save();
        } else {
            draft = new requestModel({ Details: Details, status: "draft" });
            await draft.save();
        }
        res.status(200).send({ message: "הטיוטה נשמרה", draft });
    } catch (error) {
        res.status(500).send("שגיאה בשמירת טיוטה: " + error.message);
    }
};

export const getMyStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const lastRequest = await requestModel.findOne({ "Details.personDetails.id": userId }).sort({ requestDate: -1 }); 
        if (!lastRequest) return res.status(404).send("לא נמצאה בקשה");
        res.status(200).send(lastRequest);
    } catch (error) {
        res.status(500).send("שגיאה בשליפת סטטוס: " + error.message);
    }
};

export const getAllRequestsForAdmin = async (req, res) => {
    try {
        const { id, city } = req.query;
        let query = { status: { $nin: ["allow", "draft"] } };
        if (id) query["Details.personDetails.id"] = id;
        if (city) query["Details.personDetails.address"] = { $regex: city, $options: 'i' };

        // 🔥 התיקון: הסרתי את ה-.select() כדי שהמנהל יראה הכל
        const requests = await requestModel.find(query).sort({ requestDate: -1 });
        res.status(200).send(requests);
    } catch (error) {
        res.status(500).send("שגיאה למנהל: " + error.message);
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedRequest = await requestModel.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!updatedRequest) return res.status(404).send("לא נמצאה בקשה");
        await sendStatusEmail(updatedRequest.Details.personDetails.email, updatedRequest.Details.personDetails.firstName, status);
        res.status(200).send({ message: "עודכן!", request: updatedRequest });
    } catch (error) {
        res.status(500).send("שגיאה בעדכון: " + error.message);
    }
};