import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {libraryAPI} from "../service/LibraryService";

const rootReducer = combineReducers({
    [libraryAPI.reducerPath] : libraryAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(libraryAPI.middleware)
    });
}

export type AppStore = ReturnType<typeof setupStore>
