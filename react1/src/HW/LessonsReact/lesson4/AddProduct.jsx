import { useState } from "react"

export const AddProduct = ({ add }) => {

    const [desc, setDesc] = useState()
    const [price, setPrice] = useState()
    const [img, setImg] = useState()

    const send = () => {
        // אם המפתח והערך בשם זהה - מספיק רק פעם אחת
        const product = {
            desc,
            price,
            img
        }
        add(product)
    }

    return <>
        <label htmlFor='D'>תיאור:</label><br></br>
        <input id='D' placeholder="input desc" onBlur={(e) => setDesc(e.target.value)}></input><br></br>
        <label htmlFor='P'>מחיר:</label><br></br>
        <input id='P' placeholder="input price" onBlur={(e) => setPrice(e.target.value)}></input><br></br>
        <label htmlFor='I'>תמונה</label><br></br>
        <input id='I' placeholder="input image" onBlur={(e) => setImg(e.target.value)}></input><br></br>
        <button onClick={send}>הוסף</button>
    </>
}