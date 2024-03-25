import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCategory = createAsyncThunk(
  'fetchAllCategory',
  async (args, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_CATEGORY);
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const createCategory = createAsyncThunk(
  'createCategory',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(process.env.REACT_APP_API_CREATE_CATEGORY, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);

export const deleteCategory = createAsyncThunk(
  'deleteCategory',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_DELETE_CATEGORY + '/' + data,
      {
        method: 'POST',
      },
    );
    const json = await response.json();
    if (!json.success) {
      rejectWithValue(json);
    }
    return data;
  },
);

export const updateCategory = createAsyncThunk(
  'updateCategory',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_UPDATE_CATEGORY + '/' + data.Id,
      {
        method: 'PATCH',
        body: JSON.stringify(data.formData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await response.json();
    console.log(json);
    if (!json.success) {
      rejectWithValue(json);
    }
    return json;
  },
);
