import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Loader } from "@mantine/core";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<Loader size={50} />} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
