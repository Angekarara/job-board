import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { applicationsService } from "../../services/applicationsService";

const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async (applicationData, { rejectWithValue }) => {
    try {
      const data = await applicationsService.submitApplication(applicationData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await applicationsService.getApplications(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applicationsSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications.push(action.payload);
        state.success = "Application submitted successfully!";
        state.error = null;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      })
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { clearError, clearSuccess } = applicationsSlice.actions;
export { submitApplication, fetchApplications };
export default applicationsSlice.reducer;
