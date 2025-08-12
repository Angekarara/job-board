import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const submitApplication = createAsyncThunk(
  "applications/submitApplication",
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error("failed to submit application");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchApplications = createAsyncThunk(
  "applications/fetchApplications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("api/applications");

      if (!response.ok) {
        throw new Error("failed to fetch applications");
      }
      const data = await response.json();
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
