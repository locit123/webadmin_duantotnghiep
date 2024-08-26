import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["accessToken", "theme", "valueUsers"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools());
let persistor = persistStore(store);

export { store, persistor };
