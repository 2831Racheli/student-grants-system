import './style.css'

export const Card = ({ backgroundColor, textColor }) => {
    return <>
        <div className="div" style={{ backgroundColor, color: textColor }}>
            <p className="p1">היום יום שישי</p>
            <p className="p1">היום יום שישי</p>
            <p className="p2">מחר שבת</p>
            <p className="p2">מחר שבת</p>
            <p className="p3">שבת קודש!</p>
        </div>
    </>
}