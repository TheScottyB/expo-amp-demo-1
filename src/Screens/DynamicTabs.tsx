import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Button } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

type BottomTabParams = {
  [key: string]: undefined;
};

const BottomTabs = createMaterialBottomTabNavigator<BottomTabParams>();

export default function BottomTabsScreen() {
  const [tabs, setTabs] = React.useState([0, 1]);

  return (
    <BottomTabs.Navigator>
      {tabs.map((i) => (
        <BottomTabs.Screen
          key={i}
          name={`tab-${i}`}
          options={{
            title: `Tab ${i}`,
            tabBarIcon: ({ color }) => <Feather name="octagon" color={color} />,
          }}
        >
          {() => (
            <View style={styles.container}>
              <Title>Tab {i}</Title>
              <Button onPress={() => setTabs((tabs) => [...tabs, tabs.length])}>
                Add a tab
              </Button>
              <Button
                onPress={() =>
                  setTabs((tabs) =>
                    tabs.length > 1 ? tabs.slice(0, -1) : tabs
                  )
                }
              >
                Remove a tab
              </Button>
            </View>
          )}
        </BottomTabs.Screen>
      ))}
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
