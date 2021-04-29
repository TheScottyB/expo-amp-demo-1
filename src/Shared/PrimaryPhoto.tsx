import React from 'react';

// import all the components we are going to use
import { Image, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/reducers';

const PrimaryPhoto = (props: any) => {
  const { lookup } = useSelector((state: RootState) => state.media);
  console.log(`rendering ${props.listingId}`);

  // first try to look up media.lookup state for the listingId...
  const listingMedia = lookup[props.listingId];
  return (
    <View>
      {listingMedia ? (
        <Image
          source={{
            uri: listingMedia[0].MediaURL,
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 6,
          }}
          onError={(e: any) => {
            console.error(e);
          }}
        />
      ) : (
        <Image
          source={require('../../assets/default-house.png')}
          style={{
            width: 50,
            height: 50,
            borderRadius: 6,
          }}
        />
      )}
    </View>
  );
};

export default PrimaryPhoto;
