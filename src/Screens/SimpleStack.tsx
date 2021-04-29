import * as React from 'react';
import { View, Platform, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import type { ParamListBase } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
} from '@react-navigation/stack';
// import Article from '../Shared/Article';
import Albums from '../Shared/Albums';
// import NewsFeed from '../Shared/NewsFeed';
import ShowingsCalendar from '../Shared/ShowingsCalendar';
// import ListingCard from '../Shared/ListingCard';

import Listing from '../Shared/Listing';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux';

export type SimpleStackParams = {
  Article: { author: string } | undefined;
  //NewsFeed: { date: number };
  Albums: undefined;
  Calendar: undefined;
};

const scrollEnabled = Platform.select({ web: true, default: false });

// eslint-disable-next-line no-empty-pattern
const ArticleScreen = ({}: //  navigation,
//  route,
StackScreenProps<SimpleStackParams, 'Article'>) => {
  const { listings } = useSelector((state: RootState) => state.listings);
  return (
    <ScrollView>
      <View style={styles.content}>
        {listings &&
          listings.length > 0 &&
          // eslint-disable-xnext-line react/no-array-index-key
          listings.map((listing) => <Listing {...listing} key={listing._id} />)}
      </View>
      {/* <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => navigation.replace('NewsFeed', { date: Date.now() })}
          style={styles.button}
        >
          Replace with feed
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.pop()}
          style={styles.button}
        >
          Pop screen
        </Button>
      </View>
      <Article
        author={{ name: route.params?.author ?? 'Unknown' }}
        scrollEnabled={scrollEnabled}
      /> */}
    </ScrollView>
  );
};

// eslint-disable-next-line no-empty-pattern
const CalendarScreen = ({}: StackScreenProps<
  SimpleStackParams,
  'Calendar'
>) => {
  return (
    <ScrollView>
      <View style={styles.content}>
        <ShowingsCalendar />
      </View>
    </ScrollView>
  );
};

const AlbumsScreen = ({
  navigation,
}: StackScreenProps<SimpleStackParams, 'Albums'>) => {
  return (
    <ScrollView>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          onPress={() => navigation.push('Article', { author: 'Babel fish' })}
          style={styles.button}
        >
          Push article
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.pop(2)}
          style={styles.button}
        >
          Pop by 2
        </Button>
      </View>
      <Albums scrollEnabled={scrollEnabled} />
    </ScrollView>
  );
};

const SimpleStack = createStackNavigator<SimpleStackParams>();

export default function SimpleStackScreen({
  navigation,
  screenOptions,
}: StackScreenProps<ParamListBase> & {
  screenOptions?: StackNavigationOptions;
}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SimpleStack.Navigator screenOptions={screenOptions}>
      <SimpleStack.Screen
        name="Article"
        component={ArticleScreen}
        options={() => ({
          title: `My Listings`,
        })}
        initialParams={{ author: 'Jeff Thompson' }}
      />
      <SimpleStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: 'Calendar' }}
      />
      {/* <SimpleStack.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{ title: 'Feed' }}
      /> */}
      <SimpleStack.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{ title: 'Albums' }}
      />
    </SimpleStack.Navigator>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 4,
  },
  buttons: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 8,
  },
});
