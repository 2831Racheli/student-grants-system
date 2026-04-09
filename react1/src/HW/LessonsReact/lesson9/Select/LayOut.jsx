import { InputName } from "./InputName"
import { MultiForm } from "./MultiForm"
import { useState } from 'react'
import { SelectCountry } from "./SelectCountry"
import { SelectCity } from "./SelectCity"
import { Details } from "./Details"

export const LayOut = () => {

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


    const countries = Object.keys(dictionary)
    const cities = dictionary[selectedCountry]

    return <>
        <MultiForm>
            <InputName set={checkName}></InputName>
            <SelectCountry countries={countries} set={setSelectedCountry}></SelectCountry>
            <SelectCity list={cities} setCity={setSelectedCity}></SelectCity>
            <Details name={name} city={selectedCity} country={selectedCountry}></Details>
        </MultiForm>
    </>
}