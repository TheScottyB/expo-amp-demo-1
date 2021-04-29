import { IMedia, FETCH_LISTING_MEDIA, MediaActionTypes } from '../types';
import { listingsService } from '../../services';
import { request, failure } from './common.actions';
import type { ActionCreator } from 'redux';

const fetchListingMediaSuccess: ActionCreator<MediaActionTypes> = (
  listingId: string,
  media: IMedia[]
) => {
  return { type: FETCH_LISTING_MEDIA, payload: media, listingId: listingId };
};

// The back-end has a 'media' entity - entity records have a field that is the
// ID or key of the listing associated with the media. ('ResourceRecordKey') This
// query will return ALL media records for the given listingID.
export function fetchListingMedia(listingId: string) {
  return (dispatch: any) => {
    // async action: uses Redux-Thunk middleware to return a function instead of an action creator
    dispatch(request());
    return listingsService
      .fetchMedia({ ResourceRecordKey: listingId, Order: 0 })
      .then(
        (response: any) => {
          dispatch(fetchListingMediaSuccess(listingId, response.data));
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error: any) => {
          dispatch(failure('Server error.'));
        }
      );
  };
}
