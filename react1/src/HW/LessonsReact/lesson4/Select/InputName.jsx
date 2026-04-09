export const InputName = ({ set }) => {

    // const checkName = (value) => {
    //     if (value.length > 1) {
    //         set(value)
    //     }
    // }

    return <>
        <h2>הכנס שם:</h2>
        <input placeholder="הכנס שם" onBlur={(e) => set(e.target.value)}></input>
    </>
}