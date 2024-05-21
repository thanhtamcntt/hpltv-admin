import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCategory = createAsyncThunk(
  'fetchAllCategory',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_CATEGORY +
        '/from-page?limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size,
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const fetchAllCategoryLook = createAsyncThunk(
  'fetchAllCategoryLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_CATEGORY +
        '/fetch-look?' +
        '&name=' +
        data.textLook +
        '&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        data.pageNum,
    );
    const dataJson = await response.json();
    if (!dataJson.success) {
      rejectWithValue(dataJson);
    }
    return dataJson;
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

export const addManyCategory = createAsyncThunk(
  'addManyCategory',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(process.env.REACT_APP_API_ADD_MANY_MOVIES, {
      method: 'POST',
      body: formData,
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
