// state - ניתן לקרוא לו בכל שם מתאים

import { createSlice } from "@reduxjs/toolkit"

// initialState - סטייט מאותחל
// const state = {
const initialState = {
    list: [
        { desc: 'לחם', price: 7, img: '🍞', amount: 10 },
        { desc: 'חלב', price: 7.1, img: '🥛', amount: 17 },
        { desc: 'גבינה צהובה', price: 30, img: '🧀', amount: 8 },
        { desc: 'שוקולד ציפס', price: 12, img: '🍫', amount: 0 },
        { desc: 'סוכריה', price: 2, img: '🍬', amount: 3 }
    ]
}
// slice - חתיכה של רדיוסר
const productSlice = createSlice({
    // שם הסלייס
    name: 'product',
    // initialState - הסטייט שהסלייס הנוכחי מטפל בו
    // initialState: state,
    // אם הפתח והערך בשם זהה - ניתן לכתוב רק פעם אחת
    // initialState: initialState,
    initialState,
    // אובייקט שיכיל את כל הפעולות - ביצוע בפועל
    // רק פעולות של שינוי
    reducers: {
        // כל פעולה - מקבלת שני פרמטרים:
        // 1. state - initialState מתקבל אוטומטית לפי הסטייט שנשלח ב 
        // 2. action - אובייקט שמכיל פרטים על הפעולה שנשלחה לחלל

        // לכל פעולה יש שני מאפיינים
        // type - שם הפעולה - אין לו אזכור ישיר בגירסה החדשה
        // payload - מילה שמורה - פרמטרים שהפעולה מקבלת בהפעלה
        // action.payload ע"מ לגשת לפרמטרים שנשלחו לפעולה:
        add: (state, action) => {
            // הוספת מוצר
            // נקבל אובייקט חדש של מוצר payload ב
            state.list.push(action.payload)
        },
        remove: (state, action) => {
            // מחיקת מוצר
            // נקבל אינדקס של מוצר payload ב
            state.list.splice(action.payload, 1)
        }
    }
})

// ייצוא הפעולות
// actions
export const { add, remove } = productSlice.actions

// יצירת פונקציות שליפה
// בעיקר לסינון
// התנאי לסינון חייב להיות מוגדר מראש
// אין אפשרות לשלוח פרמטרים
// שליפת כל המוצרים שיש מהם במלאי
// state => state.product - ניגש לסלייס לפי שם הסלייס שהגדרנו
export const selectAvailableProducts = state => state.product.list.filter(x => x.amount > 0)

// ייצוא הסלייס
// reducer
export default productSlice.reducer