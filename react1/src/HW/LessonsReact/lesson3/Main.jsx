import { Inc } from "./Inc"
import { Student } from "./Student"

export const Main = () => {
    return <>
        <Student name={'Dina'} age={15} grade={98}></Student>
        <Student age={20} grade={100}></Student>
        <Student name={'Elisheva'} age={8} grade={90}></Student>

        {/* <Inc></Inc> */}
    </>
}