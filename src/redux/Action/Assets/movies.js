import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllMovies = createAsyncThunk(
  'fetchAllMovies',
  async (args, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_MOVIES);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const createMovies = createAsyncThunk(
  'createMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_CREATE_MOVIES, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const deleteMovies = createAsyncThunk(
  'deleteMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_DELETE_MOVIES + '/' + data,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return data;
  },
);

export const updateMovies = createAsyncThunk(
  'updateMovies',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_UPDATE_MOVIES + '/' + data.Id,
      {
        method: 'POST',
        body: data.formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
        },
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);
