import * as React from 'react';
import type { ParamListBase } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Albums from '../Shared/Albums';
// import Contacts from '../Shared/Contacts';
import Chat from '../Shared/Chat';
import ShowingsCalendar from '../Shared/ShowingsCalendar';

type MaterialTopTabParams = {
  Albums: undefined;
  Contacts: undefined;
  Chat: undefined;
  Showings: undefined;
};

const MaterialTopTabs = createMaterialTopTabNavigator<MaterialTopTabParams>();

export default function MaterialTopTabsScreen({
  navigation,
}: StackScreenProps<ParamListBase>) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      cardStyle: { flex: 1 },
    });
  }, [navigation]);

  return (
    <MaterialTopTabs.Navigator>
      <MaterialTopTabs.Screen
        name="Chat"
        component={Chat}
        options={{ title: 'Chat' }}
      />
      <MaterialTopTabs.Screen
        name="Showings"
        component={ShowingsCalendar}
        options={{ title: 'Showings' }}
      />
      <MaterialTopTabs.Screen
        name="Albums"
        component={Albums}
        options={{ title: 'Albums' }}
      />
    </MaterialTopTabs.Navigator>
  );
}
