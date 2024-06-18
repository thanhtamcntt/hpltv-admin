import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_ALL_USER,
  API_RESET_PASSWORD,
  API_DELETE_USER,
} from '../../../configs/apis';

export const fetchAllUser = createAsyncThunk(
  'fetchAllUser',
  async (args, { rejectWithValue }) => {
    const response = await fetch(API_GET_ALL_USER, {
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

export const resetPasswordUser = createAsyncThunk(
  'resetPasswordUser',
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

export const deleteUser = createAsyncThunk(
  'deleteUser',
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
