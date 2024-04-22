import { configureStore } from '@reduxjs/toolkit';
import { SeriesSlice } from './Slice/Assets/series';
import { MoviesSlice } from './Slice/Assets/movies';
import { CategorySlice } from './Slice/Setting/category';
import { SubscriberSlice } from './Slice/Manage/subscriber';
import { UserSlice } from './Slice/Manage/user';

export const store = configureStore({
  reducer: {
    seriesSlice: SeriesSlice.reducer,
    moviesSlice: MoviesSlice.reducer,
    categorySlice: CategorySlice.reducer,
    subscriberSlice: SubscriberSlice.reducer,
    userSlice: UserSlice.reducer,
  },
});
