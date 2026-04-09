import express from 'express';
import { createRequest, getMyStatus, getAllRequestsForAdmin,updateRequestStatus,saveDraft} from '../controllers/requestController.js';
import { checkAuth, checkAdmin } from '../middlewares/auth.js'; 
import { upload } from '../middlewares/upload.js';
const router = express.Router();

// רק משתמש מחובר יכול להגיש בקשה
// router.post('/submit', checkAuth, createRequest);
router.post('/submit', checkAuth, upload.fields([
    { name: 'idCardPhoto', maxCount: 1 },
    { name: 'studentCertificate', maxCount: 1 },
    { name: 'bankConfirmation', maxCount: 1 }
]), createRequest);
// 💡 נתיב חדש: שמירת טיוטה (ללא קבצים, רק טקסט)
router.post('/draft', checkAuth, saveDraft);
// רק משתמש מחובר רואה את הסטטוס שלו
router.get('/status/:userId', checkAuth, getMyStatus);
/**
 * נתיב חדש למנהל: http://localhost:4500/requests/admin/all
 * השומרים: 
 * 1. checkAuth - מוודא שהמשתמש מחובר בכלל.
 * 2. checkAdmin - מוודא שהמשתמש הוא מנהל.
 */
router.get('/admin/all', checkAuth, checkAdmin, getAllRequestsForAdmin);
/**
 * נתיב לעדכון סטטוס בקשה: http://localhost:4500/requests/update/:id
 * הגנה כפולה: רק משתמש מחובר (checkAuth) ורק מנהל (checkAdmin)
 */
router.patch('/update/:id', checkAuth, checkAdmin, updateRequestStatus);

export default router;