import { useState, useEffect } from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { postToServer } from '../services';
import type { IUser, IToken } from '../Shared/constants';

// eslint-disable-next-line import/no-unresolved
import { MLS_SVC_BASE_URL } from '@env';

const useAuth = () => {
  const [token, setToken] = useState<IToken | undefined>(undefined);
  const [code, setCode] = useState('');
  const [user, setUser] = useState<IUser | undefined>(undefined);

  function logIn() {
    promptAsync();
  }

  // TODO - the state should be created by the back end (/GET /state)
  // and then validated server-side to be properly secure
  const [, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '570550873925120',
    state: '570550873925120',
    responseType: ResponseType.Code,
  });

  // This triggers when 'response' is set... very cool...
  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      setCode(code);
    }
  }, [response]);

  useEffect(() => {
    const login = async (theCode: string) => {
      return postToServer(`${MLS_SVC_BASE_URL}/auth/login`, {
        code: theCode,
        ssoProvider: 2,
        email: 'temp@temp.com',
      });
    };
    if (code) {
      login(code).then((data) => {
        console.log(`Retrieved user profile: ${JSON.stringify(data)}`);
        setUser(data.user);
        setToken(data.token);
      });
    }
  }, [code]);

  return [user, token, logIn];
};

export default useAuth;
