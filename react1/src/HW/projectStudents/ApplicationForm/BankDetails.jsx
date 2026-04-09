import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitApplication, addBank } from "../redux/requestSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const BankDetails = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentData = useSelector(state => state.request.current);
    const currentUser = useSelector(state => state.users.currentUser);
    
    const [bank, setBank] = useState({ 
        holder: currentData.bankDetails?.holder || "", 
        nameBank: currentData.bankDetails?.nameBank || "", 
        branchNumber: currentData.bankDetails?.branchNumber || "",
        accountNumber: currentData.bankDetails?.accountNumber || "" 
    });

    useEffect(() => { dispatch(addBank(bank)); }, [bank, dispatch]);

    const handleFinalSubmit = async () => {
        // 🔥 בדיקת חובה לכל שדות הבנק
        if (!bank.holder || !bank.nameBank || !bank.branchNumber || !bank.accountNumber) {
            Swal.fire({ icon: "warning", title: "חסרים פרטים", text: "חובה למלא את כל פרטי הבנק" });
            return;
        }

        if (!props.files.bankConfirmation) {
            Swal.fire({ icon: "warning", text: "חובה להעלות אישור ניהול חשבון" });
            return;
        }

        const finalDetails = {
            ...currentData,
            personDetails: { ...currentData.personDetails, id: currentUser.id, firstName: currentUser.firstName, lastName: currentUser.lastName },
            bankDetails: bank
        };

        const formData = new FormData();
        formData.append("Details", JSON.stringify(finalDetails));
        if (props.files.idCardPhoto) formData.append("idCardPhoto", props.files.idCardPhoto);
        if (props.files.studentCertificate) formData.append("studentCertificate", props.files.studentCertificate);
        if (props.files.bankConfirmation) formData.append("bankConfirmation", props.files.bankConfirmation);

        Swal.fire({
            title: 'אישור שליחה',
            text: "האם לשלוח את הבקשה הסופית?",
            showCancelButton: true,
            confirmButtonText: 'כן, שלח',
            confirmButtonColor: '#236753'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const actionResult = await dispatch(submitApplication(formData));
                if (submitApplication.fulfilled.match(actionResult)) {
                    navigate("/home"); 
                }
            }
        });
    };

    return (
        <div className="frmDiv">
            <h1>פרטי בנק ומסמכים</h1>
            <input placeholder="בעל החשבון" value={bank.holder} onChange={(e) => setBank({...bank, holder: e.target.value})} />
            <input placeholder="שם הבנק" value={bank.nameBank} onChange={(e) => setBank({...bank, nameBank: e.target.value})} />
            <input placeholder="מספר סניף" type="number" value={bank.branchNumber} onChange={(e) => setBank({...bank, branchNumber: e.target.value})} />
            <input placeholder="מספר חשבון" type="number" value={bank.accountNumber} onChange={(e) => setBank({...bank, accountNumber: e.target.value})} />
            
            <label style={{marginTop: '15px', display: 'block', fontWeight: 'bold', color: props.files.bankConfirmation ? 'green' : 'red'}}>
                {props.files.bankConfirmation ? "✓ אישור ניהול חשבון צורף" : "* חובה להעלות אישור בנק"}
            </label>
            <input type="file" onChange={(e) => props.setFiles(prev => ({...prev, bankConfirmation: e.target.files[0]}))} />
            
            <button className="btn" onClick={handleFinalSubmit} style={{marginTop: '30px', background: '#28a745'}}>שלח בקשה סופית</button>
        </div>
    );
};