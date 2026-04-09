export const SelectCity = ({ list, setCity }) => {
    return <>
        <h2>בחר עיר:</h2>
        <select onChange={(e) => setCity(e.target.value)}>
            <option selected disabled>בחר עיר</option>
            {list.map((c, i) => <option key={i}>{c}</option>)}
        </select>
    </>
}