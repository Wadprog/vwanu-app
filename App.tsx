import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Routes from "./src/navigation";
import { store } from "./src/store";
import theme from "./tailwind.config";
import mapping from "./src/mapping.json";

const App: React.FC = () => (
  <Provider store={store}>
    <ApplicationProvider
      {...eva}
      // @ts-ignore
      customMapping={mapping}
      theme={{ ...eva.light, ...theme.theme.extend.colors }}
    >
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ApplicationProvider>
  </Provider>
);

export default App;
