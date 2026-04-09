import { Card } from "./Card"
import { DynamicForm } from "./DynamicForm"
import { Form } from "./Form"
import { useState } from 'react'

export const Main = () => {

    const [flag, setFlag] = useState(false)
    const [details, setDetails] = useState({})


    return <>
        {/* ממשק ליצירת כרטיס ברכה בעיצוב אישי... */}
        {/* <Form setDetails={setDetails} showCard={setFlag}></Form> */}
        <DynamicForm details={details} setDetails={setDetails} showCard={setFlag}></DynamicForm>
        {flag && <Card details={details}></Card>}
    </>
}