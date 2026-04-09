export const DynamicStyle = ({ num }) => {

    const s = num > 50 ? { fontSize: '150px', color: 'red' } : { fontSize: '80px', color: 'green' }

    return <>
        {/* <p style={{ fontSize: `${num}px`, color: num > 50 ? 'purple' : 'peachpuff' }}>{num}</p> */}
        {/* <p style={s}>{num}</p> */}
        <p className={`basic ${num > 50 ? 'big' : 'small'}`}>{num}</p>
    </>
}

// let name = 'Sara'
// `hello ${name} Have a good day`
// 'hello ' + name + ' Have a good day'