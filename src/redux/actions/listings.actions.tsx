import { IListing, FETCH_LISTINGS, ListingsActionTypes } from '../types';
import { listingsService } from '../../services';
import { request, failure } from './common.actions';
import type { ActionCreator } from 'redux';
import { fetchListingMedia } from '.';

const fetchListingsSuccess: ActionCreator<ListingsActionTypes> = (
  listings: IListing[]
) => {
  return { type: FETCH_LISTINGS, payload: listings };
};

export function fetchListings() {
  return (dispatch: any) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return listingsService.fetchListings().then(
      (response: any) => {
        dispatch(fetchListingsSuccess(response.data));
        response.data.forEach((listing: IListing) => {
          dispatch(fetchListingMedia(listing._id));
        });
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: any) => {
        dispatch(failure('Server error.'));
      }
    );
  };
}
