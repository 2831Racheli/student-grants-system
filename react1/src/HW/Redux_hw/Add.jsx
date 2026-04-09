// import { useState } from "react"
// import { Add } from "./redux"
import { useDispatch } from "react-redux"
import { DeceaseBy, IncreaseBy,Increase,Decease } from "./numSlice"

export const Add = () => {

    //const [num, setNum] = useState()
    // יצירת משגר - dispatch
    // useDispatch
    const dispatch = useDispatch()

    const Increase1 = () => {
        dispatch(Increase())
    }
    const Decease1 = () => {
        dispatch(Decease())
    }
    const IncreaseNum = () => {
        dispatch(IncreaseBy())
    }
    const DeceaseNum = () => {
        dispatch(DeceaseBy())
    }
    return <>
        <button onClick={Increase1}>הוסף 1</button>
        <button onClick={Decease1}>הורד 1</button>
       {/* <input type="number"  placeholder="input num" onBlur={(e) => (setNum(e.currentTarget))}></input> */}
       <button onClick={IncreaseNum}>הוסף מספר</button>
       {/* <input type="number"  placeholder="input num" onBlur={(e) => (setNum(e.currentTarget))}></input> */}
       <button onClick={DeceaseNum}>הורד מספר</button>
    </>
}