import multer from 'multer';
import path from 'path';

// הגדרת מקום האחסון ושם הקובץ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // כל הקבצים יישמרו בתיקיית uploads בשרת
    },
    filename: (req, file, cb) => {
        // יצירת שם ייחודי: תאריך + שם מקורי כדי למנוע דריסת קבצים
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// פילטר: רק תמונות או PDF
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('סוג קובץ לא נתמך. מותר רק JPG, PNG או PDF'), false);
    }
};

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // הגבלה ל-5MB
});