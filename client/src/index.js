import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NotificationsProvider } from "@mantine/notifications";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </DndProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
