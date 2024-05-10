import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSubscriberBanned = createAsyncThunk(
  'fetchAllSubscriberBanned',
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_GET_ALL_SUBSCRIBER + '?banned=true',
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

export const postRecoverSubscriber = createAsyncThunk(
  'postRecoverSubscriber',
  async (dataUser, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_GET_RECOVER_SUBSCRIBER,
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
