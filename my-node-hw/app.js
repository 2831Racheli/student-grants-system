import dotenv from 'dotenv'; // ייבוא ראשון
dotenv.config();           // הפעלה מיד בשורה השנייה!

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'; // 🍪 [חדש] ייבוא ספרייה לקריאת עוגיות מהדפדפן
import userRouter from './api/routes/userRoutes.js'; 
import requestRouter from './api/routes/requestRoutes.js'; 

const app = express();

// Middlewares - פונקציות ביניים שרצות בכל בקשה
// 🛡️ עדכון CORS: כדי להעביר עוגיות, חייבים לציין origin מדויק ו-credentials: true
app.use(cors({
    origin: 'http://localhost:3000', // כתובת הפרונט-אנד שלך
    credentials: true               // מאפשר קבלת עוגיות מהדפדפן
})); 

app.use(express.json()); // מאפשר לשרת לקרוא מידע שנשלח בפורמט JSON בתוך ה-Body
app.use(cookieParser()); // 🍪 [חדש] Middleware המנתח עוגיות שהגיעו מהדפדפן ושם אותן ב-req.cookies

// חיבור הראוטר: כל בקשה שתתחיל ב- /users תועבר לטיפול ב-userRouter
app.use('/users', userRouter);
app.use('/requests', requestRouter); 
app.use('/uploads', express.static('uploads'));
// התחברות למסד הנתונים MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ הצלחנו להתחבר ל-MongoDB!'))
    .catch(error => console.error('❌ שגיאת חיבור למסד הנתונים:', error));

// נתיב בדיקה פשוט
app.get('/hello', (req, res) => {
    res.send('HELLO!!! השרת שלך חי ובועט 😍');
});

const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});