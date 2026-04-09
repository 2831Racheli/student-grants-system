import react, { useState } from "react"

export const MultiForm = (props) => {

    let steps = react.Children.toArray(props.children)

    const [num, setNum] = useState(0)

    const prev = () => {
        if (num > 0) {
            setNum(num - 1)
        }
    }

    const next = () => {
        if (num < steps.length - 1) {
            setNum(num + 1)
        }
    }

    const currentChild = () => {
        // פונקציה שטוענת קומפוננטה
        // הפרמטר הראשון - הקומפוננטה
        // הפרמטר השני - פרופס ששולחים לה
        return react.cloneElement(steps[num], {})
    }

    return <>
        <div className={'mainDiv'}>
            <div className='stpDiv'>
                {steps.map((x, i) => <button onClick={() => setNum(i)} className='step'>{i + 1}</button>)}
            </div>
            <div className='frmDiv'>
                {/* {steps[num]} */}
                {currentChild()}
            </div>
            <button className='btn' onClick={prev}>חזור</button>
            <button className='btn' onClick={next}>הבא</button>
        </div>
    </>
}