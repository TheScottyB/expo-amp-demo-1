import * as React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getFocusedRouteNameFromRoute,
  ParamListBase,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
// import TouchableBounce from '../Shared/TouchableBounce';
import Albums from '../Shared/Albums';
import Contacts from '../Shared/Contacts';
import Chat from '../Shared/Chat';
import SimpleStackScreen, { SimpleStackParams } from './SimpleStack';

const getTabBarIcon = (name: string) => ({
  color,
  size,
}: {
  color: string;
  size: number;
}) => <MaterialCommunityIcons name={name} color={color} size={size} />;

type BottomTabParams = {
  Article: NavigatorScreenParams<SimpleStackParams>;
  Albums: undefined;
  Contacts: undefined;
  Chat: undefined;
};

const scrollEnabled = Platform.select({ web: true, default: false });

const AlbumsScreen = ({
  navigation,
}: BottomTabScreenProps<BottomTabParams>) => {
  return (
    <ScrollView>
      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={() => navigation.setOptions({ tabBarVisible: false })}
          style={styles.button}
        >
          Hide tab bar
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.setOptions({ tabBarVisible: true })}
          style={styles.button}
        >
          Show tab bar
        </Button>
      </View>
      <Albums scrollEnabled={scrollEnabled} />
    </ScrollView>
  );
};

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

export default function BottomTabsScreen({
  navigation,
  route,
}: StackScreenProps<ParamListBase, string>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Article';

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: routeName,
    });
  }, [navigation, routeName]);

  return (
    <BottomTabs.Navigator
    // screenOptions={{
    //   tabBarButton:
    //     Platform.OS === 'web'
    //       ? undefined
    //       : (props) => <TouchableBounce {...props} />,
    // }}
    >
      <BottomTabs.Screen
        name="Article"
        options={{
          title: 'Article',
          tabBarIcon: getTabBarIcon('file-document-box'),
        }}
      >
        {(props) => (
          <SimpleStackScreen
            {...props}
            screenOptions={{ headerShown: false }}
          />
        )}
      </BottomTabs.Screen>
      <BottomTabs.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: getTabBarIcon('message-reply'),
          tabBarBadge: 2,
        }}
      />
      <BottomTabs.Screen
        name="Contacts"
        component={Contacts}
        options={{
          title: 'Contacts',
          tabBarIcon: getTabBarIcon('contacts'),
        }}
      />
      <BottomTabs.Screen
        name="Albums"
        component={AlbumsScreen}
        options={{
          title: 'Albums',
          tabBarIcon: getTabBarIcon('image-album'),
        }}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 8,
  },
});
