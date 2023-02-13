import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
// import persistReducer from "redux-persist/es/persistReducer";
// import { getDefaultMiddleware } from "@testing-library/react";

const persistConfig = { key: "root", storage };
const persistedReducer = persistReducer(persistConfig, authReducer);
const persistStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storage}>
      <PersistGate loading={null} persistor={persistStore(storage)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
