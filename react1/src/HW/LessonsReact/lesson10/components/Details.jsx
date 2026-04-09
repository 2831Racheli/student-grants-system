import { useLocation, useParams } from "react-router"

export const Details = () => {

    // params - פרמטרים שמגיעים בניתוב
    // let params = useParams()
    // useParams - פונקציה שאוספת את כל הפרמטרים שנשלחו בניתוב לאובייקט
    // שמות המפתחות יהיו כשמות הפרמטרים שהוגדו בניתוב
    // let { desc, price, image } = useParams()

    // useLocation שליפת האובייקט שנשלח כפרמטר באמצעות
    // const location = useLocation()
    // data ובתוכו state האובייקט נמצא תחת מפתח 
    // כמו בשליחה
    // const product = location.state?.data
    // let { desc, price, img } = useLocation().state?.data
    // js object
    // שליפה של ערכי אובייקט לתוך מפתחות באמתעות הגדרת אובייקט שמכיל מפתחות זהים
    // src_name: new_name ניתן לשנות את שם המשתנה לשם חדש באמצעות 
    let { desc: description, price, img: image } = useLocation().state?.data


    return <div className={'details'}>
        {/* {console.log(params)} */}
        {/* {console.log({ location })} */}
        {/* {console.log({ product })} */}
        <h1>Details</h1>

        <p>{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}</p>
        <p>{description}</p>
        <p>מחיר: {price}</p>
        <p>{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}{image}</p>
    </div>
}