import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux';
import theme from './src/config/custom-theme.json';
import { store } from './src/store';

import Routes from './src/navigation';

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <Routes />
      </ApplicationProvider>
    </Provider>
  );
}
