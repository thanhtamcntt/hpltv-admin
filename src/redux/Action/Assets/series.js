import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSeries = createAsyncThunk(
  'fetchAllSeries',
  async (args, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_SERIES);
    const data = await response.json();

    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const createSeries = createAsyncThunk(
  'createSeries',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(process.env.REACT_APP_API_CREATE_SERIES, {
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

export const deleteSeries = createAsyncThunk(
  'deleteSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_DELETE_SERIES + '/' + data,
      {
        method: 'POST',
        headers: {
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

export const updateSeries = createAsyncThunk(
  'updateSeries',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_UPDATE_SERIES + '/' + data.Id,
      {
        method: 'PATCH',
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
