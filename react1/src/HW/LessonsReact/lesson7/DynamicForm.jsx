import './style.css'

export const DynamicForm = ({ setDetails, showCard, details }) => {

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
            <select onChange={(e) => setDetails({ ...details, type: e.target.value })}>
                <option disabled selected>בחר סוג כרטיס ברכה</option>
                {types.map((t, i) => <option key={i} value={t.desc}>{t.text}</option>)}
            </select>
            <br></br>
            <label htmlFor='S'>שם המוען:</label><br></br>
            <input id='S' placeholder='הכנס את שם המוען' onBlur={(e) => setDetails({ ...details, sender: e.target.value })}></input><br></br><br></br>
            <label htmlFor='A'>פניה לנמען:</label><br></br>
            <input id='A' placeholder='הכנס פניה לנמען' onBlur={(e) => setDetails({ ...details, addressee: e.target.value })}></input><br></br><br></br>
            <label htmlFor='Mtext'>טקסט ראשי:</label><br></br>
            <input id='Mtext' placeholder='הכנס טקסט ראשי' onBlur={(e) => setDetails({ ...details, mainText: e.target.value })}></input><br></br><br></br>
            <label htmlFor='Stext'>טקסט משני:</label><br></br>
            <input id='Stext' placeholder='הכנס טקסט משני' onBlur={(e) => setDetails({ ...details, semiText: e.target.value })}></input><br></br><br></br>
            <label htmlFor='C'>צבע טקסט:</label><br></br>
            <input id='C' type={'color'} onBlur={(e) => setDetails({ ...details, color: e.target.value })}></input><br></br><br></br>
            <input type='submit' value='צור כרטיס'></input>
        </form >
    </>
}