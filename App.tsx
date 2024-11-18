import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import Routes from "./src/navigation";
import { store } from "./src/store";
import theme from "./tailwind.config";
import mapping from "./src/mapping.json";
import Timeline from "./src/screens/timeline/Timeline.screen";
import ImageGalery from "./src/screens/timeline/imageGallery";

const App: React.FC = () => (
  <Provider store={store}>
    <ApplicationProvider
      {...eva}
      // @ts-ignore
      customMapping={mapping}
      theme={{ ...eva.light, ...theme.theme.extend.colors }}
    >
      <NavigationContainer>
        {/* <Routes /> */}
        <Timeline />
      </NavigationContainer>
    </ApplicationProvider>
  </Provider>
);

export default App;
