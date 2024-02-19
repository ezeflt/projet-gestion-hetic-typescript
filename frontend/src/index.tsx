import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import contact from "./redux/contact";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const reducers = combineReducers({ contact });
const persistConfig = { key: "root", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

root.render(
  <Provider store={store}>
      <PersistGate persistor={persistor}>
          <React.StrictMode>
              <App />
          </React.StrictMode>
      </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
