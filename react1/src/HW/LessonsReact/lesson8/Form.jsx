import { useRef, useState } from "react"
import { Card } from "./Card"

export const Form = () => {

    const [back, setBack] = useState('white')
    const [flag, setFlag] = useState(false)
    // ref - reference - ייחוס, מצביע
    // יצירת המצביע
    const textRef = useRef()
    const btnRef = useRef()

    const send = () => {
        setFlag(!flag)
        btnRef.current.innerText = !flag ? 'הסתר' : 'הצג'
        btnRef.current.style.backgroundColor = !flag ? 'red' : 'green'
    }

    return <>
        {console.log(textRef)}


        <label>backgroud color:</label><br></br>
        <input type="color" onBlur={(e) => setBack(e.target.value)}></input><br></br>
        <label>text color:</label><br></br>
        {/* הגדרת המצביע - על איזה אלמנט המשתנה מצביע */}
        <input type="color" ref={textRef}></input><br></br>
        <button ref={btnRef} onClick={() => send()}>הצג</button>

        {/* current - האלמנט שעליו הוא מצביע */}
        {/* יש אפשרות לגשת לכל מאפייני האלמנט */}
        {flag && <Card backgroundColor={back} textColor={textRef.current ? textRef.current.value : null}></Card>}
    </>
}