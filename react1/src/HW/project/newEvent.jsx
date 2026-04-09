
import { useRef, useState } from "react";
import "./style.css";

export const NewEvent = ({ basicCalender, setBasicCalender ,name }) => {
  const [thisM, setThisM] = useState("");
  const [thisD, setThisD] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const newEventRef = useRef();

  const addEvent = () => {
    const month = [...basicCalender.Mounths];
    const days = [...month[thisM].Days];
    const even = [...days[thisD].events];
    even.push({ type: "😝😝😆", text: newEventRef.current.value });
    days[thisD].events = even;
    month[thisM].Days = days;

  const updatedCalender = { ...basicCalender, Mounths: month };
  setBasicCalender(updatedCalender);
  const str = JSON.stringify(updatedCalender)
  localStorage.setItem(name,str);
    setShowPopup(true);
    newEventRef.current.value = "";
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="event-form">
      <h2>✨ הוספת אירוע חדש ✨</h2>
      <label>בחרי חודש:</label>
      <select value={thisM} onChange={(e) => { setThisM(e.target.value); setThisD(""); }}>
        <option disabled value="">בחרי חודש</option>
        {basicCalender.Mounths.map((m, i) => (
          <option value={i} key={i}>{m.name}</option>
        ))}
      </select>

      <label>בחרי יום:</label>
      <select value={thisD} onChange={(e) => setThisD(e.target.value)} disabled={thisM === ""}>
        <option disabled value="">בחרי יום</option>
        {thisM !== "" &&
          basicCalender.Mounths[thisM].Days.map((d, i) => (
            <option value={i} key={i}>{d.name}</option>
          ))}
      </select>

      <input placeholder="הכנסי אירוע" ref={newEventRef} />
      <button onClick={addEvent}>הוספה</button>

      {showPopup && <div className="popup">🎉 האירוע נוסף בהצלחה!</div>}
    </div>
  );
};
