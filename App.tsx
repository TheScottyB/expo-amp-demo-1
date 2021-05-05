import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import { Assets as StackAssets } from '@react-navigation/stack';
//import * as React  from 'react';

import App from './src/index';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';

Asset.loadAsync(StackAssets);

const AppWrapper = () => {
  //return (
     //<Provider store={store}>
    //  <App />
    //</Provider>
  //);
};

//registerRootComponent(AppWrapper);
