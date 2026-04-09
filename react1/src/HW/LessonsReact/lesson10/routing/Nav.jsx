import { Link, NavLink } from 'react-router'
import '../style.css'

export const Nav = () => {
    // alert('nav')
    return <>
        <div className={'div'}>
            {/* a - html תגית קישור של */}
            {/* ניגשת לשרת ההטמל ומבקשת את דף האינטרנט הבא */}
            {/* <a href='home' className='link'>Home</a> */}
            {/* <a href='login' className='link'>Login</a> */}
            {/* <a href='products' className='link'>Products</a> */}

            {/* בריאקט כל הקומפוננטות נטענות לוקאלית על מחשב הלקוח */}
            {/* לכן אין צורך לגשת לשרת מחדש */}
            {/* וכן גישה מחדש - מרעננת את כל הדף - כל הפרויקט */}
            {/* ממילא כל המשתנים מתאפסים */}
            {/* Link - לכן נשתמש בתגית קישור של ריאקט */}
            {/* <Link to='home' className='link'>Home</Link> */}
            {/* <Link to='login' className='link'>Login</Link> */}
            {/* <Link to='products' className='link'>Products</Link> */}

            {/* NavLink - תגית קישור של ריאקט */}
            {/* אבל עם יכולת עיצובית Link כמו */}
            {/* active ריאקט מזהה את הלינק הפעיל ומפעילה עליו קלאס שנקרא */}
            {/* אם תמצא כזה קלאס יעבוד אם לא - לא יעבוד */}
            <NavLink to='home' className='link'>Home</NavLink>
            <NavLink to='login' className='link'>Login</NavLink>
            <NavLink to='products' className='link'>Products</NavLink>
        </div>
    </>
}