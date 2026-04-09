
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDraft } from "../redux/requestSlice";
import { FromDinamy } from "./FromDinamy";
import { PrivateDetails } from "./PrivateDetails";
import { FamilyDetails } from "./FamilyDetailss";
import { StudyDetails } from "./LearnDetails";
import { BankDetails } from "./BankDetails";

export const Father = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.users.currentUser);
    
    const [files, setFiles] = useState({
        idCardPhoto: null,
        studentCertificate: null,
        bankConfirmation: null
    });

    // ברגע שהקומפוננטה עולה, נבדוק אם יש טיוטה בשרת
    useEffect(() => {
        if (currentUser?.id) {
            dispatch(loadDraft(currentUser.id));
        }
    }, [dispatch, currentUser]);

    return (
        <FromDinamy>
            <PrivateDetails setFiles={setFiles} />
            <FamilyDetails />
            <StudyDetails setFiles={setFiles} />
            <BankDetails files={files} setFiles={setFiles} />
        </FromDinamy>
    );
};