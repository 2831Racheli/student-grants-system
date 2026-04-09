import { useState, useEffect } from 'react'
import { useSizeScreen } from './useSizeScreen'

export const Message = () => {

    // const [width, setWidth] = useState(window.innerWidth)

    // useEffect(() => {
    //     window.addEventListener('resize', () => setWidth(window.innerWidth))
    // }, [])

    const width = useSizeScreen()
    return <>
        {width < 600
            ? <h4>small screen</h4>
            : <h1>big screen</h1>}
    </>
}