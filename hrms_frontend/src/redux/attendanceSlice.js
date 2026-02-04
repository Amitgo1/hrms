import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const markAttendance = createAsyncThunk(
  "attendance/mark",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("attendance/", data);
      return res.data;
    } catch {
      return rejectWithValue("Attendance failed");
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(markAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(markAttendance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(markAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = attendanceSlice.actions;
export default attendanceSlice.reducer;
