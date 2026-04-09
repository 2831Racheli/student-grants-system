import { Child2 } from "./Child"
import { Child1 } from "./Child1"
import { Father } from "./Father"

export const FatherAndChildren = () => {
    return <>
        {/* טעינה של קומפוננטה כילד בין שתי התגיות של האב */}
        {/* <Father name='gvjhgbk'>
            <Child1 color='red'></Child1>
        </Father> */}

        {/* <Father>
            <Child2 color='blue'></Child2>
        </Father> */}

        <Father>
            <Child1></Child1>
        </Father>
        
        <Father>
            <Child2></Child2>
        </Father>

        {/* <Father></Father> */}
    </>
}