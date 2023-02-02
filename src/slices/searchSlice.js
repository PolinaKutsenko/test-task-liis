import { createSlice } from '@reduxjs/toolkit';
import formatDateToStringByDash from '../formatters/formatDateToStringByDash.js';

const getInitialURL = () => new URL('http://engine.hotellook.com/api/v2/cache.json');

const initialState = {
  url: '',
  searchParams: {
    location: '',
    currency: 'rub',
    checkIn: '',
    checkOut: '',
    limit: '10',
  },
  counterDaysStay: '1',
  isLoaded: true,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCounterDaysStay: (state, action) => {
      state.counterDaysStay = action.payload;
    },
    setSearchParams: (state, action) => {
      const { location, date, days } = action.payload;
      const checkInDate = new Date(date);
      const checkInDateYear = checkInDate.getFullYear();
      const checkInDateMonth = checkInDate.getMonth();
      const checkInDateDate = checkInDate.getDate() + Number(days);
      const checkOutDate = new Date(checkInDateYear, checkInDateMonth, checkInDateDate);

      state.searchParams = {
        location,
        currency: 'rub',
        checkIn: formatDateToStringByDash(checkInDate),
        checkOut: formatDateToStringByDash(checkOutDate),
        limit: '10',
      };
    },
    setUrl: (state) => {
      const paramsString = new URLSearchParams();
      const initialURL = getInitialURL();

      const params = Object.entries(state.searchParams);
      params.forEach(([key, value]) => paramsString.append(`${key}`, `${value}`));
      state.url = `${initialURL.toString()}?${paramsString.toString()}`;
    },
    fetchFailed: (state) => {
      state.isLoaded = false;
    },
  },
});

export const {
  setCounterDaysStay, setSearchParams, setUrl, fetchFailed,
} = searchSlice.actions;

export default searchSlice.reducer;
