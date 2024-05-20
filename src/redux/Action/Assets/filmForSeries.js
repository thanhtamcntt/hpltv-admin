import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllFilmForSeries = createAsyncThunk(
  'fetchAllFilmForSeries',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERIES +
        '/' +
        size.value +
        '/from-page?trash=false&limit=' +
        process.env.REACT_APP_SIZE_PAGE +
        '&page=' +
        size.pageNum,
    );
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return data;
  },
);

export const createFilmForSeries = createAsyncThunk(
  'createFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERIES_ADMIN +
        '/' +
        data.seriesId +
        '/create-film',
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

export const deleteFilmForSeries = createAsyncThunk(
  'deleteFilmForSeries',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERIES_ADMIN +
        '/' +
        data.seriesId +
        '/delete-film/' +
        data.dataId,
      {
        method: 'POST',
        body: JSON.stringify({ type: data.type }),
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
    return data.dataId;
  },
);

export const updateFilmForSeries = createAsyncThunk(
  'updateFilmForSeries',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_SERIES_ADMIN +
        '/' +
        data.seriesId +
        '/update-film/' +
        data.Id,
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

export const addManyFilmForSeries = createAsyncThunk(
  'addManyFilmForSeries',
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
