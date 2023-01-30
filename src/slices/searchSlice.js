import { createSlice } from '@reduxjs/toolkit';

const getInitialURL = () => new URL('http://engine.hotellook.com/api/v2/cache.json');

const formatDateString = (dateString) => {
  const year = Number(dateString.split('.')[2]);
  const monthString = dateString.split('.')[1];
  const month = monthString.startsWith('0') ? monthString.split('')[1] : monthString;
  const day = Number(dateString.split('.')[0]);
  return new Date(year, Number(month) - 1, day);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1) > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
  return `${year}-${month}-${day}`;
};

const initialState = {
  url: '',
  searchParams: {
    location: '',
    currency: 'rub',
    checkIn: '',
    checkOut: '',
    limit: '10',
  },
  isLoaded: true,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      const { /* location, */ date, days } = action.payload;
      const checkInData = formatDateString(date);
      const checkInDataYear = checkInData.getFullYear();
      const checkInDataMonth = checkInData.getMonth();
      const checkInDataDate = checkInData.getDate() + Number(days);
      const checkOutData = new Date(checkInDataYear, checkInDataMonth, checkInDataDate);

      state.searchParams = {
        location: 'Moscow',
        currency: 'rub',
        checkIn: formatDate(checkInData),
        checkOut: formatDate(checkOutData),
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

export const { setSearchParams, setUrl, fetchFailed } = searchSlice.actions;

export default searchSlice.reducer;
