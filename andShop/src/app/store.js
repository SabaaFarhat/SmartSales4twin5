import { configureStore, createReducer } from '@reduxjs/toolkit';
import productsReducer from "./slices/products";
import settingsReducer from "./slices/settings";
import userReducer from "./slices/user";
import cartReducer from "./slices/cartSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer, 
    user: userReducer,
    settings: settingsReducer
  },
});


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import productsReducer from "./slices/products";
// //import settingsReducer from "./slices/settings";
// //import userReducer from "./slices/user";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";


// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({ cart: productsReducer });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//      products: persistedReducer,
//     //  user: userReducer,
//     //  settings: settingsReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// export let persistor = persistStore(store);
