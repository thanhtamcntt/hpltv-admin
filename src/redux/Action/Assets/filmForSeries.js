import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllFilmForSeries = createAsyncThunk(
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
