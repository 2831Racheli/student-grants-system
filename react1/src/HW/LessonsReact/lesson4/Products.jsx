import { AddProduct } from "./AddProduct"

export const Products = () => {

    // הוספת המוצר הצליחה
    // אבל לא ראינו את השינוי על המסך
    // useState יש צורך להגדיר את המערך כ 
    const list = [
        { desc: 'לחם', price: 7, img: '🍞' },
        { desc: 'חלב', price: 7.1, img: '🥛' },
        { desc: 'גבינה צהובה', price: 30, img: '🧀' },
        { desc: 'שוקולד ציפס', price: 12, img: '🍫' },
        { desc: 'סוכריה', price: 2, img: '🍬' }
    ]

    const addProduct = (p) => {
        // useState להשלים הוספה למערך שמוגדר כ
        list.push(p)
        console.log(list);
        
    }

    return <>
        <AddProduct add={addProduct}></AddProduct>
        {list.map(p => <Product key={p.desc} product={p}></Product>)}
    </>
}

const Product = ({ product }) => {

    const { desc, price, img } = product

    return <>
        <p>{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}</p>
        <p>{desc}</p>
        <p>מחיר: {price}</p>
        <p>{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}{img}</p>
    </>
}