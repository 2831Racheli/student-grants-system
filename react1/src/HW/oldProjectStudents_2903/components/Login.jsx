import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const [user, setUser] = useState({ id: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!user.id || !user.password) {
      Swal.fire({ icon: "warning", title: "שגיאה", text: "חובה למלא תעודת זהות וסיסמה" });
      return;
    }
    
    // שליחה לשרת דרך ה-Redux
    const resultAction = await dispatch(loginUser(user));
    
    // אם ההתחברות הצליחה, נעבור לדף הבית
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return (
    <div className="form-container">
      <h2>כניסה למערכת</h2>
      <label>תעודת זהות:</label><br />
      <input 
        type="number" 
        onChange={(e) => setUser({ ...user, id: e.target.value })} 
        placeholder="הכנס תעודת זהות"
      /><br />
      
      <label>סיסמה:</label><br />
      <input 
        type="password" 
        onChange={(e) => setUser({ ...user, password: e.target.value })} 
        placeholder="הכנס סיסמה"
      /><br />
      
      <button onClick={handleLogin}>התחברות</button>
      <p> אין לך חשבון? <Link to="/add-user">צור אחד עכשיו</Link></p>
    </div>
  );
};