import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import hotelsReducer from './hotelsSlice.js';
import searchReducer from './searchSlice.js';
import calendarReducer from './calendarSlice.js';
import favoritesReducer from './favoritesSlice.js';
import saga from './saga/saga.js';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default configureStore({
  reducer: {
    hotels: hotelsReducer,
    favorites: favoritesReducer,
    searchParams: searchReducer,
    calendar: calendarReducer,
  },
  middleware,
});

sagaMiddleware.run(saga);
