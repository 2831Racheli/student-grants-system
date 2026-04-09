import swal from 'sweetalert'

export const AddProductForm = ({ add }) => {

    const send = (event) => {
        // כברירת מחדל - אירוע של סבמיט מנסה לנתב לדף אחר
        // ע"מ לבטל זאת - נכתוב
        event.preventDefault()

        console.log(event);

        let p = {
            desc: event.target[0].value,
            price: event.target[1].value,
            img: event.target[2].value
        }

        add(p)
    }

    return <>
        {/* אם פונקציה רוצה לקבל פרמטר - נעטוף אותה בפונקציה אנונימית */}
        {/* אם הפונקציה האנונימית תקבל פרמטר - ישלח אליה אוטומטית אובייקט שמכיל נתונים על האירוע */}
        {/* אם לא נשלח פרמטר ובהגדרת הפונקציה נקבל פרמטר */}
        {/* הפונקציה תקבל אוטומטית את אובייקט האירוע */}
        {/* <form onSubmit={(e) => send(e)}> */}
        <form onSubmit={send}>
            <label htmlFor='D'>תיאור:</label><br></br>
            <input id='D' placeholder="input desc"></input><br></br>
            <label htmlFor='P'>מחיר:</label><br></br>
            <input id='P' placeholder="input price"></input><br></br>
            <label htmlFor='I'>תמונה</label><br></br>
            <input id='I' placeholder="input image"></input><br></br>
            <input type='submit' value={'send'}></input>
        </form>
    </>
}