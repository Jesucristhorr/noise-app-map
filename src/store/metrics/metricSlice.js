import { createSlice } from "@reduxjs/toolkit";

export const metricSlice = createSlice({
  name: "metric",
  initialState: {
    isLoading: true,
    metrics: [],
    metric: null,
  },
  reducers: {
    setMetrics: (state, action) => {
      state.metrics = action.payload;
      state.isLoading = false;
    },

    setMetric: (state, action) => {
      state.metric = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMetrics, setMetric } = metricSlice.actions;
