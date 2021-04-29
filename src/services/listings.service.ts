import type { IListing } from '../redux/types';
import { getFromServer } from './helpers.service';

export const listingsService = {
  fetchListings,
  fetchMedia,
};

async function fetchListings(): Promise<IListing[]> {
  return getFromServer('http://192.168.0.18:3000/listings', {
    ListAgentKey: 'MRD51259',
  });
}

async function fetchMedia(filter: any): Promise<any[]> {
  return getFromServer('http://192.168.0.18:3000/media', filter);
}
