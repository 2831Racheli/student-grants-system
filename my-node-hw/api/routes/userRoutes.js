import express from 'express';
// ייבוא פונקציות ההרשמה וההתחברות מהקונטרולר
import { register, login,logout } from '../controllers/userController.js';

const router = express.Router();

// נתיב להרשמה (כבר קיים אצלך)
router.post('/register', register);

// נתיב חדש להתחברות - הכתובת תהיה: http://localhost:4500/users/login
router.post('/login', login);
// 🍪 [חדש] נתיב ליציאה - ימחק את העוגייה מהדפדפן
router.post('/logout', logout);
export default router;