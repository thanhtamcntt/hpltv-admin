import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_ALL_SUBSCRIBER,
  API_RESET_PASSWORD,
  API_DELETE_USER,
  API_GET_BANNED_SUBSCRIBER,
} from '../../../configs/apis';

export const fetchAllSubscriber = createAsyncThunk(
  'fetchAllSubscriber',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_GET_ALL_SUBSCRIBER + '?banned=false', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
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
    const response = await fetch(API_RESET_PASSWORD, {
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
    const response = await fetch(API_DELETE_USER, {
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
    const response = await fetch(API_GET_BANNED_SUBSCRIBER, {
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
