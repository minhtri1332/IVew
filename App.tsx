// @ts-ignore
import React, {memo} from 'react';
import {StatusBar, YellowBox, Text} from 'react-native';
//@ts-ignore
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Routes from './src/Routes';
import {Core} from './src/global';

YellowBox.ignoreWarnings(['']);

export const App = memo(() => {
  return (
    <Provider store={require('@/store').default}>
      <PersistGate persistor={require('@/store').persistor}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Routes />
      </PersistGate>
    </Provider>
  );
});

export default App;
