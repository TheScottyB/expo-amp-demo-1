import { MediaActionTypes, FETCH_LISTING_MEDIA } from '../types';

export interface MediaState {
  lookup: any;
}

const initialState: MediaState = {
  lookup: {},
};

export function mediaReducer(
  state: MediaState = initialState,
  action: MediaActionTypes
): MediaState {
  switch (action.type) {
    case FETCH_LISTING_MEDIA: {
      const newState = { ...state };
      newState.lookup[action.listingId] = action.payload;
      // action.payload.forEach((media: IMedia) => {
      //   newState.lookup[media._id] = media;
      // });
      return newState;
    }
    default:
      return state;
  }
}
/*
id
:
"5dc1f775949c043ee17850a8"
@odata.id
:
"https://api.mlsgrid.com/Media('5dc1f775949c043ee17850a8')"
ImageHeight
:
1080
Order
:
0
ImageWidth
:
1883
ImageSizeDescription
:
"1883x1080"
MediaURL
:
"https://s3.amazonaws.com/mlsgrid/images/f6af3ebb-ccfb-4a6b-b7ea-2cc008..."
MediaModificationTimestamp
:
"2019-11-05T22:28:04.949Z"
ModificationTimestamp
:
"2019-11-05T22:28:06.245Z"
ResourceRecordKey
:
"MRD10567052"
ResourceRecordID
:
"MRD10567052"
ResourceName
:
"PropertyResi"
OriginatingSystemName
:
"mred"
MlgCanView
:
true
MediaKey
:
"5dc1f775949c043ee17850a8"
*/
