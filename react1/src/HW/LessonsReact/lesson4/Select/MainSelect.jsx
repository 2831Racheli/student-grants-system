import { useState } from "react"
import { Details } from "./Details"
import { InputName } from "./InputName"
import { SelectCity } from "./SelectCity"
import { SelectCountry } from "./SelectCountry"
import { Select } from "./Select"

export const MainSelect = () => {

    // useState - כל הקומפוננטות יכירו אותם
    const [name, setName] = useState('אנונימי')
    const [selectedCountry, setSelectedCountry] = useState()
    const [selectedCity, setSelectedCity] = useState()

    const checkName = (value) => {
        if (value.length > 1) {
            setName(value)
        }
    }

    const dictionary = {
        ישראל: ['ירושלים', 'ירוחם', 'בית שמש', 'דימונה', 'טבריה', 'דלתון'],
        ארהב: ['ניו יורק', 'ניו גרסי', 'לייקווד', 'בולטימור', 'מיאמי'],
        צרפת: ['בורדו', 'וורסי', 'פריז', 'ניס'],
        שוויץ: ['ציריך', 'ארוזה', 'סנט מוריץ'],
        אנגליה: ['לונדון', 'מנשסטר', 'גייטסהד']
    }

    // יצירת מערך של כל המפתחות
    // Object, Dictionary
    const countries = Object.keys(dictionary)
    const cities = dictionary[selectedCountry]
    // const cities = dictionary['ישראל']
    // const cities = dictionary.ישראל

    return <>
        {/* הכנסת שם */}
        {/* === השוואת סוג וערך */}
        {/* ==  השוואת ערך בלבד */}
        {/* {name === 'אנונימי' && <InputName set={setName}></InputName>} */}
        {name === 'אנונימי' && <InputName set={checkName}></InputName>}
        {/* בחירת ארץ */}
        {/* {name !== 'אנונימי' && !selectedCountry && <SelectCountry countries={countries} set={setSelectedCountry}></SelectCountry>} */}
        {name !== 'אנונימי' && !selectedCountry && <Select></Select>}
        {/* בחירת עיר */}
        {/* {selectedCountry && !selectedCity && <SelectCity list={cities} setCity={setSelectedCity}></SelectCity>} */}
        {selectedCountry && !selectedCity && <Select></Select>}
        {/* פרטים - שלום פלוני, אתה גם בעיר, ארץ */}
        {selectedCity && <Details name={name} city={selectedCity} country={selectedCountry}></Details>}
    </>
}

// const obj = { name: 'AAAA', age: 20 }
// obj.name // 'AAAA'
// obj['name'] // 'AAAA'
// // אם שם המפתח מוצב במשתנה
// let k = name
// obj[k] // 'AAAA'
// for (const key in obj) {
//     console.log(key);
//     console.log(obj[key]);
// }