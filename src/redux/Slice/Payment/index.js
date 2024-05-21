import { createSlice } from '@reduxjs/toolkit';
import { fetchAllOrder, fetchAllOrderLook } from '../../Action/Payment/index';

const initialState = {
  data: [],
  count: 0,
  loading: false,
  error: null,
};

export const PaymentSlice = createSlice({
  name: 'PaymentSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all order
    builder.addCase(fetchAllOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // fetch all order look
    builder.addCase(fetchAllOrderLook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOrderLook.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllOrderLook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
