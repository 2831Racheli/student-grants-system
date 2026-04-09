import { useDispatch, useSelector } from "react-redux"
import { remove, selectAvailableProducts } from "./redux/productSlice"

export const Products = () => {
    // useSelector - שליפה מהסטור
    // מקבל פונקציית חץ שמקבלת מהספק את הסטור
    // state - store
    // state.product - תואם לשם הסלייס שברדיוסר הראשי
    // state.product.list - מפתח בתוך הסטייט  שהסלייס מטפל בו
    // const list = useSelector(state => state.product.list)
    // שליפה מוגדרת מראש
    // שליפת כל המוצרים שהכמות גדולה מאפס
    const list = useSelector(selectAvailableProducts)

    return <>
        <div>
            {list.map((p, i) => <Product key={i} product={p} index={i}></Product>)}
        </div>
    </>
}

const Product = ({ product, index }) => {

    const { desc, price, img } = product

    const dispatch = useDispatch()

    return <>
        <p>{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}</p>
        <p>{desc}</p>
        <p>מחיר: {price}</p>
        <p>{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}</p>
        <button onClick={() => dispatch(remove(index))}>remove</button>
    </>
}