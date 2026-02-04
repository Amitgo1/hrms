import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("employees/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetch failed");
    }
  }
);

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("employees/", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Add failed");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`employees/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue("Delete failed");
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp.id !== action.payload);
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
