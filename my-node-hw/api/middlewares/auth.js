import jwt from 'jsonwebtoken';

// בדיקה אם המשתמש מחובר (באמצעות העוגייה)
export const checkAuth = (req, res, next) => {
    // 🍪 [חדש] שליפת הטוקן מתוך req.cookies במקום req.headers
    const token = req.cookies.token;

    if (!token) {
        // אם אין עוגייה עם טוקן, המשתמש לא מחובר
        return res.status(401).send('גישה נדחתה: עליך להתחבר למערכת');
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('הטוקן לא תקין או שפג תוקפו');
        }
        req.user = user; 
        next();
    });
};

// בדיקה האם המשתמש הוא מנהל (ללא שינוי, רק הערות נוספות)
export const checkAdmin = (req, res, next) => {
    // req.user נוצר בשלב הקודם (checkAuth) מתוך פיענוח הטוקן
    if (req.user && req.user.management === true) {
        next(); // הוא מנהל - אפשר להמשיך לפונקציה הבאה
    } else {
        res.status(403).send('גישה נדחתה: פעולה זו מיועדת למנהלים בלבד');
    }
};