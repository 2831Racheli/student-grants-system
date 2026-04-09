import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
/**
 * הגדרת ה"טרנספורטר" - הצינור שדרכו עוברים המיילים
 */
const transporter = nodemailer.createTransport({
    service: 'gmail', // ניתן להשתמש ב-Gmail או בשירות אחר
    auth: {
        user: process.env.EMAIL_USER, // כתובת המייל שלך (להגדיר ב-.env)
        pass: process.env.EMAIL_PASS  // סיסמת אפליקציה (להגדיר ב-.env)
    }
});

/**
 * פונקציה גנרית לשליחת מייל
 */
export const sendStatusEmail = async (toEmail, userName, status) => {
    let subject = '';
    let htmlContent = '';

    // התאמת התוכן לפי הסטטוס 
    if (status === 'waiting') {
        subject = 'בקשת המלגה שלך נקלטה במערכת';
        htmlContent = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 0;">
                <div style="background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%); padding: 40px 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
                    <div style="font-size: 48px; margin-bottom: 15px;">📚</div>
                    <h1 style="margin: 0; font-size: 32px; font-weight: 300; letter-spacing: 1px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">מערכת מענקים</h1>
                    <p style="margin: 8px 0 0 0; opacity: 0.95; font-size: 16px; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">אישור קליטת בקשה</p>
                </div>
                
                <div style="background: #ffffff; padding: 40px 30px; border-radius: 0 0 8px 8px; border: 1px solid #e1e5e9; border-top: none;">
                    <h2 style="color: #2c3e50; margin-top: 0; font-size: 24px; font-weight: 400;">שלום ${userName},</h2>
                    <div style="background: #e8f5e8; border-left: 4px solid #4CAF50; padding: 20px; margin: 25px 0; border-radius: 4px; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1);">
                        <div style="color: #2e7d32; font-size: 18px; font-weight: 500; display: flex; align-items: center;">
                            <span style="margin-left: 10px; font-size: 20px;">✓</span>
                            <span>בקשתך נקלטה בהצלחה במערכת</span>
                        </div>
                    </div>
                    <p style="color: #5a6c7d; line-height: 1.7; font-size: 16px; margin: 25px 0; text-align: right;">
                        אנו מאשרים כי קיבלנו את בקשתך למלגה והיא נמצאת כעת בשלב הבדיקה הראשונית.
                        <br><br>
                        תעדכונים נוספים יישלחו אליך במהלך התהליך.
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin-top: 30px; border: 1px solid #e9ecef; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                        <p style="margin: 0; color: #6c757d; font-size: 14px; text-align: center;">
                            <strong>מספר ייחוד:</strong> ${toEmail}<br>
                            ניתן לפנות אלינו בכל שאלה
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; padding: 25px; background: #f8f9fa; border-radius: 8px; margin-top: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <p style="margin: 0; color: #6c757d; font-size: 13px;">
                        2024 מערכת מענקים | כל הזכויות שמורות
                    </p>
                </div>
            </div>
        `;
    } else if (status === 'allow') {
        subject = '🎉 חדשות טובות! בקשת המלגה שלך אושרה';
        htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 28px;">🎉 מערכת מענקים</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">ברכות! הבקשה אושרה</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #333; margin-top: 0;">שלום ${userName},</h2>
                    <div style="color: #28a745; font-weight: bold; font-size: 18px; margin: 20px 0;">
                        🎊 שמחים לעדכן שבקשתך אושרה!
                    </div>
                    <p style="color: #666; line-height: 1.6; font-size: 16px;">
                        ניצור איתך קשר בהקדם להמשך תהליך קבלת המלגה.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #d4edda; border-radius: 10px; border: 1px solid #c3e6cb;">
                    <p style="margin: 0; color: #155724; font-size: 14px; font-weight: bold;">
                        המלצה: הכן את המסמכים הנדרשים להמשך התהליך
                    </p>
                </div>
            </div>
        `;
    } else if (status === 'reject') {
        subject = 'עדכון לגבי בקשת המלגה שלך';
        htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 28px;">📚 מערכת מענקים</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">עדכון סטטוס בקשה</p>
                </div>
                
                <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-top: 20px;">
                    <h2 style="color: #333; margin-top: 0;">שלום ${userName},</h2>
                    <div style="color: #dc3545; font-weight: bold; font-size: 18px; margin: 20px 0;">
                        ❌ לצערנו, בקשתך לא אושרה הפעם
                    </div>
                    <p style="color: #666; line-height: 1.6; font-size: 16px;">
                        ניתן לעיין בפרטים המלאים באתר המערכת. אל תוותר - אפשר להגיש בקשה חדשה בעתיד.
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px; padding: 20px; background: #f8d7da; border-radius: 10px; border: 1px solid #f5c6cb;">
                    <p style="margin: 0; color: #721c24; font-size: 14px;">
                        צוות מערכת המענקים עומד לרשותך לכל שאלה
                    </p>
                </div>
            </div>
        `;
    }

    try {
        await transporter.sendMail({
            from: `"מערכת מענקים" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: subject,
            html: htmlContent
        });
        console.log(`✅ מייל צבעוני נשלח בהצלחה ל-${toEmail}`);
    } catch (error) {
        console.error("❌ שגיאה בשליחת המייל:", error.message);
    }
};