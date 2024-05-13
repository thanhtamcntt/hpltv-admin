import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSubscriber = createAsyncThunk(
  'fetchAllSubscriber',
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_GET_ALL_SUBSCRIBER + '?banned=false',
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const resetPasswordSubscriber = createAsyncThunk(
  'resetPasswordSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_RESET_PASSWORD, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    const newData = {
      userId: dataUser.userId,
      newPassword: data.newPassword,
    };
    return newData;
  },
);

export const deleteSubscriber = createAsyncThunk(
  'deleteSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_DELETE_USER, {
      method: 'POST',
      body: JSON.stringify(dataUser),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }

    return dataUser.userId;
  },
);

export const postBannedSubscriber = createAsyncThunk(
  'postBannedSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_GET_BANNED_SUBSCRIBER,
      {
        method: 'POST',
        body: JSON.stringify(dataUser),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return dataUser.userId;
  },
);
