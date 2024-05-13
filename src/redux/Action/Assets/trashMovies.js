import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllMoviesTrash = createAsyncThunk(
  'fetchAllMoviesTrash',
  async (size, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_MOVIES +
        '/from-page?trash=true&limit=' +
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

export const deleteTrashMovies = createAsyncThunk(
  'deleteTrashMovies',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      process.env.REACT_APP_API_DELETE_MOVIES + '/' + data.dataId,
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

export const postRecoverMovies = createAsyncThunk(
  'postRecoverMovies',
  async (Data, { rejectWithValue }) => {
    const response = await fetch(process.env.REACT_APP_API_RECOVER_MOVIES, {
      method: 'POST',
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('tokenManager'),
      },
    });
    const data = await response.json();
    if (!data.success) {
      rejectWithValue(data);
    }
    return Data.dataId;
  },
);
