import type { ImageSourcePropType } from 'react-native';
export interface IListing {
  _id: string;
  ListingKey: string;
  ListingId: string;
  ListPrice: number;
  StandardStatus: string;

  StreetNumber: string;
  StreetName: string;
  StreetSuffix: string;
  City: string;
  Township: string;
  StateOrProvince: string;
  PostalCode: string;
  CountyOrParish: string;

  // Buying Agent
  BuyerAgentEmail: string;
  BuyerAgentFax: string;
  BuyerAgentFirstName: string;
  BuyerAgentMlsId: string;
  BuyerAgentKey: string;
  BuyerAgentLastName: string;
  BuyerAgentOfficePhone: string;

  // listing agent
  ListAgentEmail: string;
  ListAgentKey: string;
  ListAgentMlsId: string;
  ListAgentFirstName: string;
  ListAgentLastName: string;

  // Office stuff
  ListOfficeEmail: string;
  ListOfficeFax: string;
  ListOfficeMlsId: string;
  ListOfficeKey: string;
  ListOfficeName: string;
  ListOfficePhone: string;
  photo?: ImageSourcePropType;
}

export const FETCH_LISTINGS = 'FETCH_LISTINGS';
export const FETCH_PRIMARY_PHOTO = 'FETCH_PRIMARY_PHOTO';

export interface FetchListingsAction {
  type: typeof FETCH_LISTINGS;
  payload: IListing[];
}

export interface FetchPrimaryPhotoAction {
  type: typeof FETCH_PRIMARY_PHOTO;
  payload: any;
}

export type ListingsActionTypes = FetchListingsAction | FetchPrimaryPhotoAction;
