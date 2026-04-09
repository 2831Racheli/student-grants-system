import mongoose from "mongoose";

// הגדרת הסכמה - איך נראה "משתמש" במסד הנתונים
const userSchema = new mongoose.Schema({
    // תעודת זהות - חייבת להיות ייחודית (unique) ולא יכולה לחזור על עצמה
    id: { type: Number, required: true, unique: true }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }, // הסיסמה תישמר כאן אחרי הצפנה
    management: { type: Boolean, default: false } // האם המשתמש הוא מנהל
});

// יצירת המודל וייצוא שלו
export default mongoose.model('User', userSchema);