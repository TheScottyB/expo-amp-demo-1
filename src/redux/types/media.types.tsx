export interface IMedia {
  _id: string;
  ResourceRecordKey: string; // the listing ID
  MediaKey: string;
  ImageWidth: number;
  ImageHeight: number;
  MediaURL: string;
  ModificationTimestamp: Date;
  ImageSizeDescription: string;
  OriginatingSystemName: string;
  ResourceRecordID: string;
}

export const FETCH_LISTING_MEDIA = 'FETCH_LISTING_MEDIA';

export interface FetchListingMediaAction {
  type: typeof FETCH_LISTING_MEDIA;
  payload: IMedia[];
  listingId: string;
}

export type MediaActionTypes = FetchListingMediaAction;
