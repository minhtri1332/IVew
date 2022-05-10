import React from "react";
import { Provider } from "react-redux";
// @ts-ignore
import { PersistGate } from "redux-persist/integration/react";
import Routes from "./src/Routers";
import { enableFreeze } from "react-native-screens";
import { Notification } from "./src/componens/Notification";

enableFreeze(true);

const App = () => {
  return (
      <Provider store={require("@/store").default}>
        <PersistGate persistor={require("@/store").persistor}>
          <Routes />
          <Notification />
        </PersistGate>
      </Provider>
  );
};

export default App;
