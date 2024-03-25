import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllMovies,
  createMovies,
  deleteMovies,
  updateMovies,
} from '../../Action/Assets/movies';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const MoviesSlice = createSlice({
  name: 'MoviesSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch all movies
    builder.addCase(fetchAllMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.data = [...action.payload.data];
    });
    builder.addCase(fetchAllMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    // create a new movies
    builder.addCase(createMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createMovies.fulfilled, (state, action) => {
      console.log('action: ', action.payload.data);
      state.loading = false;
      state.data.unshift(action.payload.data);
    });
    builder.addCase(createMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // delete movies
    builder.addCase(deleteMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMovies.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data = state.data.filter((data) => data._id !== action.payload);
    });
    builder.addCase(deleteMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // update a  movies
    builder.addCase(updateMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMovies.fulfilled, (state, action) => {
      console.log('action: ', action.payload);
      state.loading = false;
      state.data.map((data) => {
        if (data._id === action.payload.data._id) {
          data.title = action.payload.data.title;
          data.releaseDate = action.payload.data.releaseDate;
          data.description = action.payload.data.description;
          data.director = action.payload.data.director;
          data.cast = action.payload.data.cast;
          data.country = action.payload.data.country;
          data.productCompany = action.payload.data.productCompany;
          data.duration = action.payload.data.duration;
          data.imageUrl = action.payload.data.imageUrl;
          data.videoUrl = action.payload.data.videoUrl;
          data.updateAt = action.payload.data.updateAt;
          data.listCategoryId = action.payload.data.listCategoryId;
        }
      });
    });
    builder.addCase(updateMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
