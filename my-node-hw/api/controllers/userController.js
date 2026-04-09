import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// פונקציה אסינכרונית (async) המטפלת בבקשת רישום משתמש
export const register = async (req, res) => {
    try {
        // שלב 1: שליפת הנתונים שהמשתמש מילא בטופס (מתוך גוף הבקשה - req.body)
        const { id, firstName, lastName, password } = req.body;

        // שלב 2: פנייה למסד הנתונים כדי לבדוק אם כבר קיים משתמש עם אותו ת.ז
        const existingUser = await userModel.findOne({ id });

        // אם מצאנו משתמש כזה (existingUser אינו ריק)
        if (existingUser) {
            // נחזיר הודעת שגיאה בסטטוס 400 (Bad Request) ונעצור את הפונקציה
            return res.status(400).send('משתמש עם תעודת זהות זו כבר קיים במערכת');
        }

        // שלב 3: אבטחה - הפיכת הסיסמה הגלויה לטקסט מוצפן (Hash) בעזרת bcrypt
        // המספר 10 קובע כמה חזקה תהיה ההצפנה
        const hashedPassword = await bcrypt.hash(password.toString(), 10);

        // שלב 4: יצירת "מופע" (אובייקט) חדש של משתמש לפי התבנית (Model) שהגדרנו
        const newUser = new userModel({
            id,
            firstName,
            lastName,
            password: hashedPassword, // שומרים את הגרסה המוצפנת, לא את הסיסמה המקורית
            management: false        // הגדרה אוטומטית כסטודנט (לא מנהל)
        });

        // שלב 5: שמירת האובייקט החדש פיזית בתוך טבלת המשתמשים ב-MongoDB
        await newUser.save();

        // שלב 6: יצירת "טוקן" (JWT) - חתימה דיגיטלית שמאפשרת לסטודנט להישאר מחובר
        // אנחנו מצפינים בתוך הטוקן את ה-ID שלו ואת סוג ההרשאה (ניהול)
        const token = jwt.sign(
            { id: newUser.id, management: newUser.management },
            process.env.SECRET, // המפתח הסודי ששמרנו ב-env לצורך חתימה מאובטחת
            { expiresIn: '1y' }  // הטוקן יפוג ויהפוך ללא תקף אחרי שעה אחת
        );

        // 🍪 [חדש] שליחת הטוקן בתוך עוגייה מאובטחת
        res.cookie('token', token, {
            httpOnly: true, // אבטחה: מונע מה-JavaScript בדפדפן לגשת לעוגייה (הגנה מ-XSS)
            secure: false,  // במצב פיתוח (localhost) נשאיר false. בשרת אמיתי נשנה ל-true (HTTPS)
            maxAge: 3600000 // תוקף העוגייה: שעה אחת במילי-שניות
        });
        // שלב 7: שליחת תשובה מוצלחת (201 - Created) חזרה לצד הלקוח (React)
        // התשובה כוללת את פרטי המשתמש החדש (ללא הסיסמה) ואת הטוקן שלו
        res.status(201).send({ user: newUser });

    } catch (error) {
        // במידה וקרתה תקלה לא צפויה (כמו ניתוק מה-DB), נחזיר שגיאת שרת כללית
        res.status(500).send("שגיאת שרת: " + error.message);
    }
};
/**
 * פונקציית Login - כניסת משתמש רשום
 * הפונקציה בודקת אם הת.ז והסיסמה נכונים ומחזירה טוקן כניסה
 */
export const login = async (req, res) => {
    try {
        // שלב 1: שליפת תעודת זהות וסיסמה מהגוף של הבקשה (req.body)
        const { id, password } = req.body;

        // שלב 2: חיפוש המשתמש במסד הנתונים לפי תעודת הזהות
        const user = await userModel.findOne({ id });

        // שלב 3: אם המשתמש לא נמצא, נחזיר שגיאה 404 (Not Found)
        if (!user) {
            return res.status(404).send('לא נמצא משתמש עם תעודת זהות זו');
        }

        // שלב 4: השוואת הסיסמה שהוזנה לסיסמה המוצפנת בבסיס הנתונים
        // פונקציית compare של bcrypt יודעת לפענח אם הסיסמה הגלויה מתאימה ל-Hash
        const isPasswordCorrect = await bcrypt.compare(password.toString(), user.password);

        // אם הסיסמה לא תואמת, נחזיר שגיאה 401 (Unauthorized)
        if (!isPasswordCorrect) {
            return res.status(401).send('סיסמה שגויה, נסה שוב');
        }

        // שלב 5: יצירת טוקן JWT חדש (זהה למה שעשינו בהרשמה)
        const token = jwt.sign(
            { id: user.id, management: user.management },
            process.env.SECRET, // המפתח הסודי מה-.env
            { expiresIn: '1h' }  // תוקף לשעה אחת
        );
        // 🍪 [חדש] שמירת הטוקן בעוגייה בדפדפן
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000
        });
        // שלב 6: שליחת תשובה מוצלחת עם פרטי המשתמש והטוקן
        // חשוב: לא מחזירים את הסיסמה המוצפנת חזרה לפרונט
        res.status(200).send({
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                management: user.management
            }
        });

    } catch (error) {
        // טיפול בשגיאת שרת כללית
        res.status(500).send("שגיאת שרת בתהליך ההתחברות: " + error.message);
    }
};
// 🍪 [חדש] פונקציית Logout - יציאה מהמערכת
export const logout = (req, res) => {
    // מחיקת העוגייה מהדפדפן על ידי הגדרת תוקף שעבר
    res.clearCookie('token');
    res.status(200).send('התנתקת בהצלחה מהמערכת');
};