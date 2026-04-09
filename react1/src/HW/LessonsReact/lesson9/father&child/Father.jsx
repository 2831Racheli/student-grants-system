import React from 'react'
import { Child2 } from './Child'
import { Child1 } from './Child1'
import '../style.css'

export const Father = (props) => {

    // props.children - הילדים של הקומפוננטה
    // let children = React.Children.toArray(props.children)
    let child = React.Children.toArray(props.children)[0]
    let num = React.Children.count(props.children)

    const loadChild = () => {
        // cloneElement - פונקציה שטוענת קומפוננטה אחרת
        // לילד props אפשרות לשלוח 
        return React.cloneElement(child, { color: 'green' })
    }

    return <>
        {console.log(props)}

        {/* <div className='div'>
            <Child1></Child1>
        </div>
        <div className='div'>
            <Child2></Child2>
        </div> */}
        <h1>{num}</h1>
        {/* <div className={'div'} style={{ color: child.props.color }}> */}
        <div className={'div'}>
            {/* {children[0]} */}
            {/* מעבר על מערך של קומפוננטות הילדים */}
            {/* לכן הפונקציה מחזירה את האיבר עצמו ללא תגית */}
            {/* {children.map(x => x)} */}
            {/* {child} */}
            {loadChild()}
        </div>
    </>
}