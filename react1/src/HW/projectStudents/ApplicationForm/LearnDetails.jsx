import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/requestSlice";

export const StudyDetails = (props) => {
    const dispatch = useDispatch();
    const savedLearn = useSelector(state => state.request.current.studyDetails);
    
    const [study, setStudy] = useState({ 
        trend: savedLearn?.trend || "", 
        mony: savedLearn?.mony || "", 
        countYear: savedLearn?.countYear || "" 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...study, [name]: value };
        setStudy(updated);
        dispatch(addCourse(updated));
    };

    useEffect(() => {
        if (props.setIsValid) {
            // 🔥 כל השדות חובה + קובץ
            props.setIsValid(() => () => 
                study.trend && study.mony && study.countYear && props.files.studentCertificate
            );
        }
    }, [study, props.files.studentCertificate, props.setIsValid]);

    return (
        <div className="frmDiv">
            <h1>לימודים</h1>
            <label>מגמה:</label>
            <input name="trend" placeholder="מגמה" value={study.trend} onChange={handleChange} />
            
            <label>שכר לימוד שנתי:</label>
            <input name="mony" type="number" value={study.mony} onChange={handleChange} />
            
            <label>שנת לימוד (א/ב/ג):</label>
            <input name="countYear" type="number" value={study.countYear} onChange={handleChange} />
            
            {/* 🔥 חיווי ויזואלי לקובץ */}
            <label style={{marginTop: '20px', display: 'block', fontWeight: 'bold', color: props.files.studentCertificate ? 'green' : 'red'}}>
                {props.files.studentCertificate ? "✓ אישור לימודים צורף" : "* חובה לצרף אישור לימודים"}
            </label>
            <input type="file" onChange={(e) => props.setFiles(prev => ({...prev, studentCertificate: e.target.files[0]}))} />
        </div>
    );
}