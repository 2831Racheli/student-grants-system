import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import Swal from 'sweetalert2';

// פונקציית התחברות מול השרת
export const loginUser = createAsyncThunk("user/login", async (userData, thunkAPI) => {
    try {
        const response = await API.post('/users/login', userData); //
        return response.data.user; // מחזיר את פרטי המשתמש
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// פונקציית הרשמה מול השרת
export const registerUser = createAsyncThunk("user/register", async (userData, thunkAPI) => {
    try {
        const response = await API.post('/users/register', userData); //
        return response.data.user;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        currentUser: null, 
        status: 'idle', // 'loading' | 'succeeded' | 'failed'
        error: null 
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            API.post('/users/logout'); // קריאה לשרת למחיקת העוגייה
        }
    },
    extraReducers: (builder) => {
        builder
            // טיפול בהתחברות
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = 'succeeded';
                Swal.fire({ icon: "success", title: "התחברת בהצלחה!", timer: 1500, showConfirmButton: false });
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                Swal.fire({ icon: "error", title: "שגיאה", text: action.payload || "פרטי התחברות שגויים" });
            })
            // טיפול בהרשמה
            .addCase(registerUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.status = 'succeeded';
                Swal.fire("החשבון נוצר בהצלחה!");
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                Swal.fire({ icon: "error", title: "שגיאה", text: action.payload || "קיימת שגיאה ברישום" });
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;