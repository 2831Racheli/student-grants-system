import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userModel from './api/models/user.js';
import dotenv from 'dotenv';
dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        const hashedPassword = await bcrypt.hash("admin123", 10);
        
        const admin = new userModel({
            id: 1, // תעודת זהות של מנהל
            firstName: "Admin",
            lastName: "System",
            password: hashedPassword,
            management: true // כאן אנחנו קובעים שהוא מנהל!
        });

        await admin.save();
        console.log("✅ מנהל מערכת נוצר בהצלחה!");
        process.exit();
    } catch (error) {
        console.error("❌ שגיאה:", error.message);
        process.exit(1);
    }
};

createAdmin();