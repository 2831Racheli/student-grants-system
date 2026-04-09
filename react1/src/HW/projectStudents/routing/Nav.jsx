import { Link, NavLink } from 'react-router-dom'
import '../style.css'
import {useSelector } from "react-redux";
export const Nav = () => {
    // alert('nav')
    const currentUser = useSelector(state => state.users.currentUser);
    return <>
        <div className={'div'}>
            < nav>👋 שלום {currentUser ? currentUser.firstName : "אורח"}</nav>
            <NavLink to='/home' className='link'>דף הבית</NavLink>
             <NavLink to='/login' className='link'>התחברות</NavLink>
            <NavLink to='/main' className='link'>הגשת בקשה</NavLink>
            <NavLink to='/viewStatus' className='link'>צפיה בסטטוס </NavLink>
             {currentUser?.management &&
             <NavLink to='/viewRequests' className='link'>הצגת הבקשות</NavLink>}
             {/* לא רוצה שיראו בתפריט את המישהו החדש ולכן נמצא רק בניתובים */}
             {/* <NavLink  to='add-user' className='link'>add-user</NavLink> */}
        </div>
    </>
}