import { useState } from 'react'
import { useNavigate } from 'react-router'
import swal from 'sweetalert'

export const Login = () => {

    const [user, setUser] = useState({})

    const navigate = useNavigate()

    const send = () => {
        if (user.username && user.password) {
            swal(`Hello ${user.username}`, 'login successfully!', 'success')
            // / - נכנס
            // לאח - עם סלש
            // לילד - בלי סלש
            navigate('/welcome')
        }
        else {
            swal(`Oopps!`, 'login failed!', 'error')
        }
    }

    return <>
        <label htmlFor='UN'>שם משתמש:</label><br></br>
        <input id='UN' placeholder="input username" onBlur={(e) => setUser({ ...user, username: e.target.value })}></input><br></br>
        <label htmlFor='PW'>סיסמה:</label><br></br>
        <input type={'password'} id='PW' placeholder="input password" onBlur={(e) => setUser({ ...user, password: e.target.value })}></input><br></br>
        <button onClick={send}>שלח</button>
    </>
}