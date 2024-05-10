import { configureStore } from '@reduxjs/toolkit';
import { SeriesSlice } from './Slice/Assets/series';
import { TrashSeriesSlice } from './Slice/Assets/trashSeries';
import { MoviesSlice } from './Slice/Assets/movies';
import { TrashMoviesSlice } from './Slice/Assets/trashMovies';
import { CategorySlice } from './Slice/Setting/category';
import { SubscriberSlice } from './Slice/Manage/subscriber';
import { SubscriberBannedSlice } from './Slice/Manage/bannedAccount';
import { UserSlice } from './Slice/Manage/user';

export const store = configureStore({
  reducer: {
    seriesSlice: SeriesSlice.reducer,
    trashSeriesSlice: TrashSeriesSlice.reducer,
    moviesSlice: MoviesSlice.reducer,
    trashMoviesSlice: TrashMoviesSlice.reducer,
    categorySlice: CategorySlice.reducer,
    subscriberSlice: SubscriberSlice.reducer,
    subscriberBannedSlice: SubscriberBannedSlice.reducer,
    userSlice: UserSlice.reducer,
  },
});
