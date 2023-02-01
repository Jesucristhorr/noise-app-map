import { createSlice } from "@reduxjs/toolkit";

export const metricSlice = createSlice({
  name: "metric",
  initialState: {
    isLoading: true,
    metrics: [],
  },
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics } = metricSlice.actions;
