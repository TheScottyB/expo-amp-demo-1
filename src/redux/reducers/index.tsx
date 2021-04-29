import { combineReducers } from 'redux';
import { listingsReducer } from './listings.reducer';
import { mediaReducer } from './media.reducer';

export const rootReducer = combineReducers({
  listings: listingsReducer,
  media: mediaReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
