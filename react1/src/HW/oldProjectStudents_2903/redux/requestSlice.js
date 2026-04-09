
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../api"; 
// import Swal from "sweetalert2";

// // 1. הגשת בקשה סופית לשרת
// export const submitApplication = createAsyncThunk("request/submit", async (formData, thunkAPI) => {
//     try {
//         const response = await API.post('/requests/submit', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data || "שגיאה בשליחה");
//     }
// });

// // 2. משיכת בקשות למנהל עם סינונים 
// export const fetchRequestsForAdmin = createAsyncThunk("request/fetchAll", async (filters = {}) => {
//     const params = new URLSearchParams(filters).toString();
//     const response = await API.get(`/requests/admin/all?${params}`);
//     return response.data;
// });

// // 3. שמירת טיוטה (Draft) 
// export const saveDraftAction = createAsyncThunk("request/saveDraft", async (details, thunkAPI) => {
//     try {
//         const response = await API.post('/requests/draft', { Details: details });
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response?.data);
//     }
// });

// // 4. עדכון סטטוס בקשה (אישור/דחייה)
// export const updateRequestStatus = createAsyncThunk("request/updateStatus", async ({ id, status }) => {
//     const response = await API.patch(`/requests/update/${id}`, { status });
//     return { id, status };
// });

// const requestSlice = createSlice({
//     name: 'request',
//     initialState: {
//         list: [], 
//         current: { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} },
//         status: 'idle'
//     },
//     reducers: {
//         addPersonal: (state, action) => { state.current.personDetails = action.payload; },
//         addFamily: (state, action) => { state.current.familyDetails = action.payload; },
//         addCourse: (state, action) => { state.current.studyDetails = action.payload; },
//         addBank: (state, action) => { state.current.bankDetails = action.payload; }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(submitApplication.fulfilled, (state) => {
//                 state.current = { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} };
//                 Swal.fire({ icon: "success", title: "הבקשה נשלחה!", text: "מייל אישור נשלח אליך" });
//             })
//             .addCase(fetchRequestsForAdmin.fulfilled, (state, action) => {
//                 state.list = action.payload;
//             })
//             .addCase(saveDraftAction.fulfilled, () => {
//                 Swal.fire({ icon: "info", title: "הטיוטה נשמרה", timer: 1500, showConfirmButton: false });
//             })
//             .addCase(updateRequestStatus.fulfilled, (state, action) => {
//                 const index = state.list.findIndex(r => r._id === action.payload.id);
//                 if (index !== -1) state.list[index].status = action.payload.status;
//             });
//     }
// });

// export const { addPersonal, addFamily, addCourse, addBank } = requestSlice.actions;
// export const selectNotAllowed = state => state.request.list;
// export const selectAllRequest = state => state.request.list;
// export const currentRequest = state => state.request.current;
// export default requestSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api"; 
import Swal from "sweetalert2";

// 1. משיכת טיוטה קיימת למשתמש (חדש!)
export const loadDraft = createAsyncThunk("request/loadDraft", async (userId, thunkAPI) => {
    try {
        const response = await API.get(`/requests/status/${userId}`);
        // רק אם הסטטוס הוא draft, נחזיר את הנתונים
        if (response.data && response.data.status === "draft") {
            return response.data.Details;
        }
        return null;
    } catch (error) {
        return null; // אם אין טיוטה, פשוט נמשיך עם טופס ריק
    }
});

// 2. שמירת טיוטה (Draft)
export const saveDraftAction = createAsyncThunk("request/saveDraft", async (details, thunkAPI) => {
    try {
        const response = await API.post('/requests/draft', { Details: details });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

// 3. הגשת בקשה סופית
export const submitApplication = createAsyncThunk("request/submit", async (formData, thunkAPI) => {
    try {
        const response = await API.post('/requests/submit', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data);
    }
});

// 4. משיכת בקשות למנהל ועדכון סטטוס (נשאר כפי שהיה)
export const fetchRequestsForAdmin = createAsyncThunk("request/fetchAll", async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await API.get(`/requests/admin/all?${params}`);
    return response.data;
});

export const updateRequestStatus = createAsyncThunk("request/updateStatus", async ({ id, status }) => {
    await API.patch(`/requests/update/${id}`, { status });
    return { id, status };
});

const requestSlice = createSlice({
    name: 'request',
    initialState: {
        list: [], 
        current: { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} },
        myRequest: null,
        status: 'idle'
    },
    reducers: {
        addPersonal: (state, action) => { state.current.personDetails = action.payload; },
        addFamily: (state, action) => { state.current.familyDetails = action.payload; },
        addCourse: (state, action) => { state.current.studyDetails = action.payload; },
        addBank: (state, action) => { state.current.bankDetails = action.payload; },
        allow: (state) => {}, reject: (state) => {} // placeholders
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDraft.fulfilled, (state, action) => {
                if (action.payload) state.current = action.payload; // טעינת הטיוטה לתוך הטופס
            })
            .addCase(submitApplication.fulfilled, (state) => {
                state.current = { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} };
            })
            .addCase(fetchRequestsForAdmin.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(updateRequestStatus.fulfilled, (state, action) => {
                const index = state.list.findIndex(r => r._id === action.payload.id);
                if (index !== -1) state.list[index].status = action.payload.status;
            });
    }
});

export const { addPersonal, addFamily, addCourse, addBank, allow, reject } = requestSlice.actions;
export const selectNotAllowed = state => state.request.list.filter(x => x.status === "waiting");
export const selectAllRequest = state => state.request.list;
export const currentRequest = state => state.request.current;
export default requestSlice.reducer;