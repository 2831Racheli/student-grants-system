import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api"; 
import Swal from "sweetalert2";

// משיכת סטטוס אישי למשתמש
export const fetchMyStatus = createAsyncThunk("request/fetchMyStatus", async (userId) => {
    const response = await API.get(`/requests/status/${userId}`);
    return response.data;
});

export const loadDraft = createAsyncThunk("request/loadDraft", async (userId) => {
    try {
        const response = await API.get(`/requests/status/${userId}`);
        if (response.data && response.data.status === "draft") return response.data.Details;
        return null;
    } catch (error) { return null; }
});

export const saveDraftAction = createAsyncThunk("request/saveDraft", async (details) => {
    const response = await API.post('/requests/draft', { Details: details });
    return response.data;
});

export const submitApplication = createAsyncThunk("request/submit", async (formData) => {
    const response = await API.post('/requests/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
});

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
        myRequest: null,
        current: { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} }
    },
    reducers: {
        addPersonal: (state, action) => { state.current.personDetails = action.payload; },
        addFamily: (state, action) => { state.current.familyDetails = action.payload; },
        addCourse: (state, action) => { state.current.studyDetails = action.payload; },
        addBank: (state, action) => { state.current.bankDetails = action.payload; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDraft.fulfilled, (state, action) => { if (action.payload) state.current = action.payload; })
            .addCase(fetchMyStatus.fulfilled, (state, action) => { state.myRequest = action.payload; })
            .addCase(submitApplication.fulfilled, (state) => {
                state.current = { personDetails: {}, familyDetails: {}, studyDetails: {}, bankDetails: {} };
                Swal.fire({ icon: "success", title: "הבקשה הוגשה בהצלחה!" });
            })
            .addCase(saveDraftAction.fulfilled, () => {
                Swal.fire({ icon: "info", title: "טיוטה נשמרה", timer: 1500, showConfirmButton: false });
            })
            .addCase(fetchRequestsForAdmin.fulfilled, (state, action) => { state.list = action.payload; })
            .addCase(updateRequestStatus.fulfilled, (state, action) => {
                const index = state.list.findIndex(r => r._id === action.payload.id);
                if (index !== -1) state.list[index].status = action.payload.status;
            });
    }
});

export const { addPersonal, addFamily, addCourse, addBank } = requestSlice.actions;
export const selectNotAllowed = state => state.request.list.filter(x => x.status === "waiting");
export const selectAllRequest = state => state.request.list;
export default requestSlice.reducer;