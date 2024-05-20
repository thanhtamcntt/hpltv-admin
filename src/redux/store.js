import { configureStore } from '@reduxjs/toolkit';
import { SeriesSlice } from './Slice/Assets/series';
import { TrashSeriesSlice } from './Slice/Assets/trashSeries';
import { MoviesSlice } from './Slice/Assets/movies';
import { FilmForSeriesSlice } from './Slice/Assets/filmForSeries';
import { TrashMoviesSlice } from './Slice/Assets/trashMovies';
import { TrashFilmForSeriesSlice } from './Slice/Assets/trashFilmForSeries';
import { CategorySlice } from './Slice/Setting/category';
import { SubscriberSlice } from './Slice/Manage/subscriber';
import { SubscriberBannedSlice } from './Slice/Manage/bannedAccount';
import { UserSlice } from './Slice/Manage/user';
import { PaymentSlice } from './Slice/Payment/index';

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
    filmForSeriesSlice: FilmForSeriesSlice.reducer,
    trashFilmForSeriesSlice: TrashFilmForSeriesSlice.reducer,
    paymentSlice: PaymentSlice.reducer,
  },
});
