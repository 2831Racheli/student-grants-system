import './style.css'

export const Form = ({ setDetails, showCard }) => {

    const types = [
        { desc: 'wedding', text: 'חתונה' },
        { desc: 'barMitzva', text: 'בר מצוה' },
        { desc: 'test', text: 'מבחן' },
        { desc: 'chalake', text: 'חלאקה' },
        { desc: 'newBorn', text: 'ניו בורן' },
        { desc: 'shanaTova', text: 'שנה טובה' },
        { desc: 'refuaShlema', text: 'רפואה שלמה' }
    ]

    const create = (e) => {
        e.preventDefault();
        const form = {
            type: e.target[0].value,
            sender: e.target[1].value,
            addressee: e.target[2].value,
            mainText: e.target[3].value,
            semiText: e.target[4].value,
            color: e.target[5].value
        }
        console.log(form);

        setDetails(form)
        showCard(true)
    }

    return <>
        {/* טופס */}
        {/* סוג - חתונה, בר מצוה, ניו בורן, חלאקה, רפואה שלמה, בהצלחה במבחן, שנה טובה  */}
        {/* מוען */}
        {/* נמען - פניה */}
        {/* טקסט ראשי */}
        {/* טקסט משני */}
        {/* צבע טקסט */}
        <form className='form' onSubmit={create}>
            <label>בחר סוג כרטיס</label>
            <select onChange={(e) => console.log(e.target.value)}>
                <option disabled selected>בחר סוג כרטיס ברכה</option>
                {types.map((t, i) => <option key={i} value={t.desc}>{t.text}</option>)}
            </select>
            <br></br>
            <label htmlFor='S'>שם המוען:</label><br></br>
            <input id='S' placeholder='הכנס את שם המוען'></input><br></br><br></br>
            <label htmlFor='A'>פניה לנמען:</label><br></br>
            <input id='A' placeholder='הכנס פניה לנמען'></input><br></br><br></br>
            <label htmlFor='Mtext'>טקסט ראשי:</label><br></br>
            <input id='Mtext' placeholder='הכנס טקסט ראשי'></input><br></br><br></br>
            <label htmlFor='Stext'>טקסט משני:</label><br></br>
            <input id='Stext' placeholder='הכנס טקסט משני'></input><br></br><br></br>
            <label htmlFor='C'>צבע טקסט:</label><br></br>
            <input id='C' type={'color'}></input><br></br><br></br>
            <input type='submit' value='צור כרטיס'></input>
        </form>
    </>
}