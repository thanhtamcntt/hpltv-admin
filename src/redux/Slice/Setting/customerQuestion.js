import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCustomerQuestions } from '../../Action/Setting/customerQuestion';

const initialState = {
  data: [],
  loading: false,
  error: null,
  count: 0,
};

export const CustomerQuestionsSlice = createSlice({
  name: 'CustomerQuestionsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all common questions
    builder.addCase(fetchAllCustomerQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCustomerQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.count = action.payload.count;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllCustomerQuestions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});
