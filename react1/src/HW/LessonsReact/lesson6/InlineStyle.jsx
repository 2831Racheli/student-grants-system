import './style.css'

export const InlineStyle = () => {

    const s = {
        backgroundColor: 'chocolate',
        fontSize: '50px',
        color: 'wheat',
        border: '5px black double'
    }

    return <>
        {/* camelCase */}
        {/* class => className */}
        <p className={'pHello'}>Hello</p>
        {/* background-color => backgroundColor */}
        {/* font-size => fontSize */}
        {/* styel = attribute */}
        {/* יכול לקבל מחרוזת או כל סוג אחר עטוף בסוגריים מסולסלות attribute */}
        {/* לכן נעטוף את אובייקט הסטייל בסוגריים נוספות */}
        <p style={{ backgroundColor: 'orange', fontSize: '100px', color: 'white' }}>Have an amazing day!!</p>
        <p style={s}>Enjoy your life!</p>
    </>
}