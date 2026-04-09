import { useState } from "react"
import "./style.css"
export const NewCalander=({mysetName,mysetBacColor,mysetColor,add,setBasicCalender,setflag})=>{
 const getC=(n)=>{
  setBasicCalender(JSON.parse(localStorage.getItem(n)))
  setflag(true)
 }
 return <>
 <div className="new-calander-form" >
 <h1>הכנס שם לוח</h1>
 <input type="text" onBlur={(e)=>mysetName(e.target.value)} />
 <h1>מה הצבע שתרצי לרקע?</h1>
 <input type="color" name="" id="" onBlur={(e)=>mysetBacColor(e.target.value)}/>
 <h1 >מה הצבע שתרצי לאותיות</h1>
 <input type="color" name="" id="" onBlur={(e)=>mysetColor(e.target.value)}/><br></br>
 <button onClick={add}>יצירת לוח</button>
<select onChange={(e) => getC(e.target.value)}> 
  <option disabled selected hidden>לבחירת לוח שנה</option>
  {
    Object.keys(localStorage).map((key, index) => (
      <option key={index} value={key}>{key}</option>
    ))
  }
</select>
 </div>
 </>  
  }
