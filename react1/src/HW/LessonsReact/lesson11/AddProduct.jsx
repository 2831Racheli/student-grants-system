import { useState } from "react"
import { useDispatch } from "react-redux"
import { add } from "./redux/productSlice"

export const AddProduct = () => {

    const [product, setProduct] = useState({})

    // יצירת משגר - dispatch
    // useDispatch
    const dispatch = useDispatch()

    const send = () => {
        // הפעלת פעולה - שיגור לחלל
        // הפעלנו את פעולת ההוספה
        // שלחנו את המוצר החדש
        // action.payload המוצר יכנס כ
        dispatch(add(product))
    }

    return <>
        <label htmlFor='D'>תיאור:</label><br></br>
        <input id='D' placeholder="input desc" onBlur={(e) => setProduct({ ...product, desc: e.target.value })}></input><br></br>
        <label htmlFor='P'>מחיר:</label><br></br>
        <input id='P' placeholder="input price" onBlur={(e) => setProduct({ ...product, price: e.target.value })}></input><br></br>
        <label htmlFor='I'>תמונה</label><br></br>
        <input id='I' placeholder="input image" onBlur={(e) => setProduct({ ...product, img: e.target.value })}></input><br></br>
        <button onClick={send}>הוסף</button>
    </>
}