import { configureStore } from '@reduxjs/toolkit';
import { SeriesSlice } from './Slice/Assets/series';
import { MoviesSlice } from './Slice/Assets/movies';
import { CategorySlice } from './Slice/Setting/category';

export const store = configureStore({
  reducer: {
    seriesSlice: SeriesSlice.reducer,
    moviesSlice: MoviesSlice.reducer,
    categorySlice: CategorySlice.reducer,
  },
});
