// import React in our code
import React from 'react';

// import all the components we are going to use
import { StyleSheet, Image } from 'react-native';

//import Card
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Title,
  Text,
} from 'react-native-paper';
import type { IListing } from '../redux/types';

// import { ListingIcon } from '../../assets/listings.svg';

// type ListingProps = {
//   listing: IListing;
//   onValueChange?: () => void;
// };
function getTitleString(props: IListing) {
  return `${props.StreetNumber} ${props.StreetName}`;
}
function getSubtitleString(props: IListing) {
  return `${props.City}, ${props.StateOrProvince} ${props.PostalCode}`;
}

const LeftContent = (props: any) => (
  // <Avatar.Icon {...props} icon={require('../../assets/listings.svg')} />
  <Avatar.Icon
    {...props}
    icon={() => (
      <Image
        source={{
          uri:
            'https://photos.zillowstatic.com/fp/569e4d50a35d577de9c1780d894ca16f-p_h.jpg',
        }}
        // source={require('../../assets/album-art-24.jpg')}
        style={{
          width: 50,
          height: 50,
          // backgroundColor: '#000022',
          // tintColor: '#11',
          borderRadius: 6,
        }}
      />
    )}
  />
);

const RightContent = (props: any) => {
  return <Text> {props.StandardStatus} </Text>;
};
const ListingCard = (props: IListing) => {
  return (
    <Card style={styles.container} {...props}>
      <Card.Title
        {...props}
        title={getTitleString(props)}
        subtitle={getSubtitleString(props)}
        left={LeftContent}
        right={RightContent}
        leftStyle={styles.left}
      />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
        {/* <Paragraph>
          <Image
            source={{
              uri:
                'https://photos.zillowstatic.com/fp/569e4d50a35d577de9c1780d894ca16f-p_h.jpg',
            }}
            style={{ width: 50, height: 50 }}
          />
        </Paragraph> */}
      </Card.Content>
      {/* <Card.Cover
        source={{
          // width: 200,
          uri:
            'https://photos.zillowstatic.com/fp/569e4d50a35d577de9c1780d894ca16f-p_h.jpg',
        }}
      /> */}
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default ListingCard;
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  left: {
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // shadowColor: 'gray',
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#ecf0f1',
//   },
// });
