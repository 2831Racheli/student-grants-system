import { createSlice } from "@reduxjs/toolkit";

const initialState ={num:0}

// slice - חתיכה של רדיוסר
const numSlice = createSlice({
    // שם הסלייס
    name: 'num',  //product

    // initialState - הסטייט שהסלייס הנוכחי מטפל בו
    // initialState: state,
    // אם הפתח והערך בשם זהה - ניתן לכתוב רק פעם אחת
    // initialState: initialState,

    initialState,

    reducers: {
    
        Increase: (state, action) => {
            
             state.num=state.num+1
             console.log(state.num);
             
        },
        Decease: (state, action) => {
         
           state.num=state.num-1
           console.log(state.num);

        },
        IncreaseBy:(state, action)=>{
        state.num=state.num+action.payload
        console.log(state.num);

        },
        DeceaseBy: (state, action) => {
           state.num=action.payload
                        console.log(state.num);

        },

    }
})

// ייצוא הפעולות
// actions
export const {Increase,Decease,IncreaseBy,DeceaseBy } = numSlice.actions
export default numSlice.reducer


// יצירת פונקציות שליפה
// בעיקר לסינון
// התנאי לסינון חייב להיות מוגדר מראש
// אין אפשרות לשלוח פרמטרים
// שליפת כל המוצרים שיש מהם במלאי
// state => state.product - ניגש לסלייס לפי שם הסלייס שהגדרנו


// export const selectAvailableProducts = state => state.product.list.filter(x => x.amount > 0)


// ייצוא הסלייס
// reducer
