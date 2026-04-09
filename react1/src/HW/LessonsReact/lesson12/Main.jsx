import { Comp } from "./Comp"
import { useState } from 'react'

export const Main = () => {

    const [flag, setFlag] = useState(false)

    return <>
        <button onClick={(e) => setFlag(!flag)}>show / hide</button>
        {flag && <Comp></Comp>}
    </>
}