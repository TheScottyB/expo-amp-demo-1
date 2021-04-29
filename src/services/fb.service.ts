/*
https://www.facebook.com/v10.0/dialog/oauth?
  client_id={app-id}
  &redirect_uri={redirect-uri}
  &state={state-param}

*/

import { Linking } from 'react-native';

const FB_CLIENT_ID = '570550873925120';

export async function getLoginDialog() {
  const FB_AUTH_URL = 'https://www.facebook.com/v10.0/dialog/oauth';

  const REDIRECT_URL = 'http://localhost:19006/auth/code';

  try {
    Linking.openURL(
      FB_AUTH_URL +
        `?client_id=${FB_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${'{st=state123abc,ds=123456789}'}`
    ).catch((err) => {
      console.error('Failed opening page because: ', err);
      alert('Failed to open page');
    });
    return true;
  } catch (error) {
    return Promise.reject(error);
  }
}
