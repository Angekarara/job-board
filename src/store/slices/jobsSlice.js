import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jobsService } from "../../services/jobsService";

const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await jobsService.getJobs(params);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId, { rejectWithValue }) => {
    try {
      const data = await jobsService.getJobById(jobId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    currentJob: null,
    total: 0,
    currentPage: 1,
    totalPages: 0,
    isLoading: false,
    error: null,
    filters: {
      search: "",
      location: "",
      type: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        location: "",
        type: "",
      };
    },
    clearCurrentJob: (state) => {
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobs = action.payload;
        state.total = action.payload.length;
        state.totalPages = Math.ceil(action.payload.length / 10);
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentJob = action.payload;
        state.error = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearCurrentJob, clearError } =
  jobSlice.actions;
export { fetchJobs, fetchJobById };
export default jobSlice.reducer;
