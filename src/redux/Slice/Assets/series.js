import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllSeries,
  createSeries,
  deleteSeries,
  updateSeries,
} from '../../Action/Assets/series';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const SeriesSlice = createSlice({
  name: 'SeriesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllSeries.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // create a new series
    builder.addCase(createSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createSeries.fulfilled, (state, action) => {
      console.log('action: ', action.payload.data);
      state.loading = false;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete series
    builder.addCase(deleteSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSeries.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update a  series
    builder.addCase(updateSeries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSeries.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.data._id) {
          data.title = action.payload.data.title;
          data.description = action.payload.data.description;
          data.imageUrl = action.payload.data.imageUrl;
          data.listSeriesId = action.payload.data.listSeriesId;
          data.updateAt = action.payload.data.updateAt;
        }
      });
    });
    builder.addCase(updateSeries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
