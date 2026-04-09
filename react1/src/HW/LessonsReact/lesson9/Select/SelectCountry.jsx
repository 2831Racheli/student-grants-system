export const SelectCountry = ({ countries, set }) => {
    return <>
        <h2>בחר ארץ</h2>
        <select onChange={(event) => set(event.target.value)}>
            <option disabled selected>בחר ארץ</option>
            {countries.map((c, i) =>
                <option key={i}>{c}</option>
            )}
        </select>
    </>
}