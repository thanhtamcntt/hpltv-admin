import { createSlice } from '@reduxjs/toolkit';
import {
  deleteUser,
  fetchAllUser,
  resetPasswordUser,
} from '../../Action/Manage/user';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all users
    builder.addCase(fetchAllUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    // reset password user
    builder.addCase(resetPasswordUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.userId) {
          data.password = action.payload.newPassword;
        }
      });
    });
    builder.addCase(resetPasswordUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // delete user
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
