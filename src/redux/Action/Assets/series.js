import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllSeries = createAsyncThunk(
  'fetchAllSeries',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERIES +
        '/from-page?trash=false&limit=' +
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

export const fetchAllSeriesLook = createAsyncThunk(
  'fetchAllSeriesLook',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_SERIES +
        '/fetch-look?trash=false&country=' +
        data.valueCountries +
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
    console.log(data);
    const response = await fetch(
      process.env.REACT_APP_API_DELETE_SERIES + '/' + data.dataId,
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

export const addManySeries = createAsyncThunk(
  'addManySeries',
  async (data, { rejectWithValue }) => {
    console.log(data);
    const formData = new FormData();
    formData.append('file', data);
    const response = await fetch(process.env.REACT_APP_API_ADD_MANY_SERIES, {
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
