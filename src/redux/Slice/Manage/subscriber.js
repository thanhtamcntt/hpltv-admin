import { createSlice } from '@reduxjs/toolkit';
import {
  deleteSubscriber,
  fetchAllSubscriber,
  resetPasswordSubscriber,
  postBannedSubscriber,
} from '../../Action/Manage/subscriber';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const SubscriberSlice = createSlice({
  name: 'SubscriberSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all subscriber
    builder.addCase(fetchAllSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSubscriber.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // reset password subscriber
    builder.addCase(resetPasswordSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordSubscriber.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.userId) {
          data.password = action.payload.newPassword;
        }
      });
    });
    builder.addCase(resetPasswordSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete subscriber
    builder.addCase(deleteSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSubscriber.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // banned subscriber
    builder.addCase(postBannedSubscriber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postBannedSubscriber.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(postBannedSubscriber.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
