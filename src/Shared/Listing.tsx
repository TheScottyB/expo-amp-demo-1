// import React in our code
import React from 'react';

// import all the components we are going to use
import { StyleSheet, View } from 'react-native';

import { Text, useTheme } from 'react-native-paper';

import type { IListing } from '../redux/types';

import PrimaryPhoto from './PrimaryPhoto';

function getTitleString(props: IListing) {
  return `${props.StreetNumber} ${props.StreetName} ${props.StreetSuffix}`;
}

function getSubtitleString(props: IListing) {
  return `${props.City}, ${props.StateOrProvince} ${props.PostalCode}`;
}

function currencyFormat(num: number) {
  return '$' + num.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

const Listing = (props: IListing) => {
  const { colors } = useTheme();
  return (
    // NOTE I had to inline-style this because i had to pull in a color from
    // the Theme and I can't find a way to access it except this way (BAD)
    <View
      style={{
        shadowOffset: { width: 1, height: 1 },
        borderRadius: 8,
        backgroundColor: colors.surface,
        margin: 4,
        shadowOpacity: 0.4,
        shadowColor: '#555',
        padding: 5,
        maxWidth: 500,
      }}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <PrimaryPhoto listingId={props._id} />
        </View>
        <View style={styles.headerCenter}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.tagline}>
            {getTitleString(props)}
          </Text>
          <Text numberOfLines={1} adjustsFontSizeToFit>
            {getSubtitleString(props)}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.price}>
            {currencyFormat(props.ListPrice)}
          </Text>
          <Text numberOfLines={2} adjustsFontSizeToFit style={styles.status}>
            {props.StandardStatus}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Listing;
const styles = StyleSheet.create({
  header: {
    padding: 4,
    flexDirection: 'row',
  },
  headerLeft: {
    flexDirection: 'column',
    flex: 2,

    textAlign: 'center',
  },
  headerCenter: {
    flex: 5,
    textAlign: 'left',
    flexDirection: 'column',
  },
  headerRight: {
    flex: 2,
    paddingLeft: 2,
    flexDirection: 'column',
    textAlign: 'right',
    alignContent: 'flex-start',
  },
  status: {
    fontWeight: 'bold',
    textAlign: 'right',
  },
  price: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'right',
  },
  tagline: {
    fontWeight: '600',
  },
});
