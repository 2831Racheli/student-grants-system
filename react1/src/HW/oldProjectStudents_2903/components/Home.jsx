import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'; 

// רכיב מונה שרץ בלופ עם השהייה בסוף
const Counter = ({ target, duration = 2000, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const end = parseInt(String(target).replace(/,/g, ''));
        const totalSteps = duration / 20; // עדכון כל 20 מילישניות
        const increment = Math.ceil(end / totalSteps);
        let timer;

        const runCounter = () => {
            current += increment;
            
            if (current >= end) {
                // הגענו ליעד
                setCount(end);
                
                // כאן הקסם: ממתינים 2 שניות (2000ms) ואז מתחילים מחדש
                timer = setTimeout(() => {
                    current = 0;
                    setCount(0);
                    runCounter(); // קריאה רקורסיבית להתחלה מחדש
                }, 4000); 
                
            } else {
                // עדיין סופרים
                setCount(current);
                timer = setTimeout(runCounter, 20);
            }
        };

        runCounter();

        // ניקוי הזיכרון אם המשתמש יוצא מהדף באמצע
        return () => clearTimeout(timer);
    }, [target, duration]);

    // פונקציה להוספת פסיקים (1,000,000)
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <span>
            {prefix}{formatNumber(count)}{suffix}
        </span>
    );
};

export const Home = () => {
    return (
        <div className="home-container">
            {/* סקשן פתיחה */}
            <section className="hero-section">
                <h1>מצא את **המענק המושלם** ללימודים שלך</h1>
                <p>הכלי המוביל לאיתור, מיון והגשת בקשות למענקי סטודנטים בישראל.</p>
                <div className="cta-buttons">
                    <Link to="/login" className="accent-button primary large secondary-accent">כניסה למשתמשים רשומים</Link>
                    <Link to="/add-user" className="accent-button large">הרשמה חדשה</Link>
                </div>
            </section>

            {/* סקשן איך זה עובד */}
            <section className="how-it-works-section">
                <h2 className="secondary-accent-title">תהליך פשוט, תוצאות מהירות</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <span className="step-number">1</span>
                        <h3>הרשמה ואפיון</h3>
                        <p>צור פרופיל אישי ומלא נתונים רלוונטיים.</p>
                    </div>
                    <div className="step-card">
                        <span className="step-number">2</span>
                        <h3>התאמה וסינון</h3>
                        <p>המערכת מציגה אוטומטית מענקים מתאימים.</p>
                    </div>
                    <div className="step-card">
                        <span className="step-number">3</span>
                        <h3 className="secondary-accent-title">הגשה ומעקב</h3>
                        <p>הגש בקשה בקלות ועקוב אחר הסטטוס.</p>
                    </div>
                </div>
            </section>

            {/* סקשן סטטיסטיקות - המספרים ירוצו בלופ */}
            <section className="stats-section">
                <h2>הצלחה במספרים</h2>
                <div className="stats-grid">
                    <div className="stat-box secondary-accent-border">
                        <div className="stat-number secondary-accent-text">
                            <Counter target={150} suffix="+" duration={1500} />
                        </div>
                        <p className="stat-label">מענקים זמינים</p>
                    </div>
                    <div className="stat-box">
                        <div className="stat-number">
                            <Counter target={98} suffix="%" duration={2000} />
                        </div>
                        <p className="stat-label">שביעות רצון</p>
                    </div>
                    <div className="stat-box secondary-accent-border">
                        <div className="stat-number secondary-accent-text">
                            <Counter target={15000000} prefix="₪" duration={3000} />
                        </div>
                        <p className="stat-label">סכום כולל שהוענק</p>
                    </div>
                </div>
            </section>

            <section className="call-to-action-section secondary-accent-border">
                <h2>מוכן לחסוך זמן?</h2>
                <p>הצטרף לסטודנטים שכבר מוצאים מימון ללימודים.</p>
                <Link to="/login" className="accent-button primary large">התחל עכשיו!</Link>
            </section>
        </div>
    );
};