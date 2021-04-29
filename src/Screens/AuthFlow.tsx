import * as React from 'react';
import {
  Image,
  View,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Title, Button, Text } from 'react-native-paper';
import { useTheme, ParamListBase } from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from '@react-navigation/stack';

import { GlobalStyles } from '../Shared/styles';

import * as WebBrowser from 'expo-web-browser';

import useOurAuth from '../hooks/useAuth';
import type { IUser } from '../Shared/constants';
import { useEffect } from 'react';

type AuthStackParams = {
  Splash: undefined;
  Home: undefined;
  SignIn: undefined;
  PostSignOut: undefined;
};

WebBrowser.maybeCompleteAuthSession();

const AUTH_CONTEXT_ERROR =
  'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

const AuthContext = React.createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
}>({
  signIn: () => {
    throw new Error(AUTH_CONTEXT_ERROR);
  },
  signOut: () => {
    throw new Error(AUTH_CONTEXT_ERROR);
  },
});

const SplashScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={GlobalStyles.content}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

const SignInScreen = () => {
  const { signIn } = React.useContext(AuthContext);
  const { colors } = useTheme();
  const [user, token, logIn] = useOurAuth();
  const theUser = user as IUser;

  useEffect(() => {
    if (token) {
      console.log('** dispatching SIGN_IN with token');
      signIn(token.accessToken);
    }
  }, [token, signIn]);

  return (
    <>
      <View style={GlobalStyles.content}>
        <Image
          source={require('../../assets/MRED-Logo-Update-300x72.png')}
          style={{
            width: 300,
            height: 72,
            borderRadius: 6,
          }}
        />
        {user && (
          <Text style={styles.welcome}>
            {theUser.firstName} {theUser.lastName} {theUser.email}
          </Text>
        )}
        <TextInput
          placeholder="Username"
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={[
            styles.input,
            { backgroundColor: colors.card, color: colors.text },
          ]}
        />
        <Button
          mode="contained"
          onPress={() => signIn('12312312')}
          style={styles.button}
        >
          Sign in
        </Button>

        <Text> OR </Text>
        <TouchableOpacity onPress={() => logIn()}>
          <Image
            source={require('../../assets/fb-login-blue.png')}
            style={styles.loginbutton}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const HomeScreen = () => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={GlobalStyles.content}>
      <Title style={styles.text}>Signed in successfully 🎉</Title>
      <Button onPress={signOut} style={styles.button}>
        Sign out
      </Button>
    </View>
  );
};

// CREATE THE PARENT NAV STACK
const SimpleStack = createStackNavigator<AuthStackParams>();

type State = {
  isLoading: boolean;
  isSignout: boolean;
  userToken: undefined | string;
};

type Action =
  | { type: 'RESTORE_TOKEN'; token: undefined | string }
  | { type: 'SIGN_IN'; token: string }
  | { type: 'SIGN_OUT' };

export default function SimpleStackScreen({
  navigation,
}: StackScreenProps<ParamListBase>) {
  const [state, dispatch] = React.useReducer<React.Reducer<State, Action>>(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          console.log(`sign in token = ${action.token}`);
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: undefined,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: undefined,
    }
  );
  // TODO - sdfdfd ...
  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'RESTORE_TOKEN', token: undefined });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const authContext = React.useMemo(
    () => ({
      signIn: (token: string) => dispatch({ type: 'SIGN_IN', token: token }),
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
    }),
    []
  );

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <SimpleStack.Navigator
        screenOptions={{
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        }}
      >
        {state.userToken === undefined ? (
          <SimpleStack.Screen
            name="SignIn"
            options={{
              title: 'Sign in',
              animationTypeForReplace: state.isSignout ? 'pop' : 'push',
            }}
            component={SignInScreen}
          />
        ) : (
          <SimpleStack.Screen
            name="Home"
            options={{ title: 'Home' }}
            component={HomeScreen}
          />
        )}
      </SimpleStack.Navigator>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 24,
  },
  loginbutton: {
    width: 320,
    height: 51,
    borderRadius: 8,
  },
  input: {
    margin: 8,
    padding: 10,
    width: 300,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  button: {
    margin: 8,
  },
  text: {
    textAlign: 'center',
    margin: 8,
  },
});
