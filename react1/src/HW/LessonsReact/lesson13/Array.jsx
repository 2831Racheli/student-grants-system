import { useState, useEffect } from 'react'
import { useSizeScreen } from './useSizeScreen'

export const Array = () => {

    const arr = ['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff']

    // const [width, setWidth] = useState(window.innerWidth)

    // useEffect(() => {
    //     window.addEventListener('resize', () => setWidth(window.innerWidth))
    // }, [])

    const width = useSizeScreen()

    return <>
        {width > 600 ?
            arr.map(x => <p key={x}>{x}</p>)
            : <>
                <p>{arr[0]}</p>
                <p>{arr[1]}</p>
            </>}
    </>
}