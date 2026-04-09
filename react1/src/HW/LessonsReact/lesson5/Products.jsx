import { AddProduct } from "./AddProduct"
import { useState } from 'react'
import swal from "sweetalert"
import { AddProductForm } from "./AddProductForm"

export const Products = () => {

    const [list, setList] = useState([
        { desc: 'לחם', price: 7, img: '🍞' },
        { desc: 'חלב', price: 7.1, img: '🥛' },
        { desc: 'גבינה צהובה', price: 30, img: '🧀' },
        { desc: 'שוקולד ציפס', price: 12, img: '🍫' },
        { desc: 'סוכריה', price: 2, img: '🍬' }
    ])

    const addProduct = (p) => {
        setList([...list, p])
        console.log(list);
        swal('Success', `add product ${p.desc} successfully!`, 'success')
    }

    return <>
        {/* <AddProduct add={addProduct}></AddProduct> */}
        <AddProductForm add={addProduct}></AddProductForm>
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