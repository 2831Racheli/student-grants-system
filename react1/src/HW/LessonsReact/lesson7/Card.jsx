import './style.css'

// ייבוא של קובץ התמונה
// בדרך זו קשה מאוד להסתדר עם דינמיות
// בטעינה של אובייקטים רציפים - לא נוכל לטעון עבור כל אחד תמונה שונה
import barMitzva from './images/תפילין1.jpg'
import shanaTova from './images/רימון.jpg'
import newBorn from './images/5.jpg'

export const Card = ({ details }) => {

    const { color, mainText, semiText, addressee, sender, type } = details

    return <>
        {console.log('card')}
        {console.log(details)}
        {/* <div className={`card ${type}`} style={{ color }}> */}
        <div className={`card`} style={{ color }}>
            <p>{addressee}</p>
            <p className='mainText'>{mainText}</p>
            <p>{semiText}</p>
            <p>{sender}</p>
            {/* אם יבאנו את הקובץ - נטען בצורה זו - שם הקובץ */}
            <img src={shanaTova} width={'100vw'} height={'auto'} alt={type}></img>
            {/* public אם שמרנו את התמונות בתיקיית ה */}
            {/* ניגש אליה בדרך זו - process.env.PUBLIC_URL */}
            {/* ואח"כ נוכל לגשת למיקום הקובץ שלנו */}
            <img src={`${process.env.PUBLIC_URL}/images/${type}.jpg`} width={'100vw'} height={'auto'} alt={type}></img>
        </div>
    </>
}

// process.env.PUBLIC_URL + '/images/shanaTova.jpg'
// `${process.env.PUBLIC_URL}/images/shanaTova.jpg`