import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const Products = () => {

    const [list, setList] = useState([
        { desc: 'לחם', price: 7, img: '🍞' },
        { desc: 'חלב', price: 7.1, img: '🥛' },
        { desc: 'גבינה צהובה', price: 30, img: '🧀' },
        { desc: 'שוקולד ציפס', price: 12, img: '🍫' },
        { desc: 'סוכריה', price: 2, img: '🍬' }
    ])

    let nav = useNavigate()

    const show = (product) => {
        // שליחת פרמטרים בפועל - ללא נקודתיים
        // שרשור של ערך הפרמטר עם סלש
        // nav(`/details/${product.desc}/${product.price}/${product.img}`)
        // שליחת אובייקט כפרמטר בניתוב
        // מוצפן - לא רואים בניתוב שיש פרמטרים
        // nav(`/details`, { state: { data: product } })
        // ניתוב לבן - בלי סלש
        nav(`details`, { state: { data: product } })
    }

    return <>
        {/* <Outlet></Outlet> */}
        <div className={'list'}>
            {list.map(p =>
                <>
                    <p>{p.desc} {p.img}</p>
                    <button onClick={() => show(p)}>show details</button>
                </>
            )}
        </div>
        {/* טעינה בפועל של קומפוננטת הבן */}
        {/* היכן שנטען את קומפוונטת האאוטלט - שם תטען קומפוננטת הבן */}
        <Outlet></Outlet>
    </>
}