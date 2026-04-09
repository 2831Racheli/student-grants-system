import { useState } from "react"
import swal from 'sweetalert'

export const AddProduct = ({ add }) => {

    // const [desc, setDesc] = useState()
    // const [price, setPrice] = useState()
    // const [img, setImg] = useState()

    const [product, setProduct] = useState({})

    const send = () => {
        if (product.desc && product.price && product.img)
            add(product)
        else {
            // swal => npm i sweetalert => import swal from 'sweetalert'
            // 1. טקסט ראשי
            // 2. טקסט משני
            // 3. סוג - error, success, info
            swal('Oopps!', 'all fields are required!', 'info')
            // swal('Oopps!', 'all fields are required!', 'info')
        }

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