import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDraft, saveDraftAction } from "../redux/requestSlice";
import { FromDinamy } from "./FromDinamy";
import { PrivateDetails } from "./PrivateDetails";
import { FamilyDetails } from "./FamilyDetailss";
import { StudyDetails } from "./LearnDetails";
import { BankDetails } from "./BankDetails";

export const Father = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    const currentData = useSelector(state => state.request.current); // השמירה מאוזנת כאן
    
    const [files, setFiles] = useState({ idCardPhoto: null, studentCertificate: null, bankConfirmation: null });

    useEffect(() => {
        if (currentUser?.id) { dispatch(loadDraft(currentUser.id)); }
    }, [dispatch, currentUser]);

    // כפתור שמירה יציב
    const saveBtn = (
        <button onClick={() => dispatch(saveDraftAction(currentData))} 
                style={{marginTop: '20px', background: '#555', color: 'white', borderRadius: '5px', padding: '5px', cursor: 'pointer'}}>
            💾 שמור טיוטה
        </button>
    );

    return (
        <FromDinamy saveButton={saveBtn}>
            <PrivateDetails files={files} setFiles={setFiles} />
            <FamilyDetails />
            <StudyDetails files={files} setFiles={setFiles} />
            <BankDetails files={files} setFiles={setFiles} />
        </FromDinamy>
    );
};