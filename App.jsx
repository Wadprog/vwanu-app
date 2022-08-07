import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import theme from './src/config/custom-theme.json';
// import Welcome from './src/screens/Welcome.screen'
// import Register from './src/screens/Register.screen'

// import RegistrationSteps from './src/screens/Registration/RegistrationFristStep.screen';

import Routes from './src/navigation';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <Routes />
    </ApplicationProvider>
  );
}
