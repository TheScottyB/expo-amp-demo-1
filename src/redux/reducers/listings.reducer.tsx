import { IListing, ListingsActionTypes, FETCH_LISTINGS } from '../types';

export interface ListingsState {
  listings: IListing[];
}

const initialState: ListingsState = {
  listings: [],
};

export function listingsReducer(
  state: ListingsState = initialState,
  action: ListingsActionTypes
): ListingsState {
  switch (action.type) {
    case FETCH_LISTINGS: {
      return {
        ...state,
        listings: action.payload,
      };
    }
    default:
      return state;
  }
}
