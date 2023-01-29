import { createSlice } from '@reduxjs/toolkit';

const getInitialURL = () => {
  const initialUrlWithoutParams = new URL('http://engine.hotellook.com/api/v2/cache.json');
  return new URLSearchParams(initialUrlWithoutParams.search);
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
  name: 'hotels',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      const { location, date, days } = action.payload;
      console.log(date);
      console.log(typeof date);
      state.searchParams = {
        location,
        currency: 'rub',
        checkIn: date.toISOString()/* .split('T')[0].join('') */,
        checkOut: days,
        limit: '10',
      };
    },
    setUrl: (state) => {
      const currentUrl = getInitialURL();
      const params = state.searchParams.entities();
      params.forEach(([key, value]) => currentUrl.append(`${key}`, `${value}`));
      state.url = currentUrl.toString();
    },
    fetchFailed: (state) => {
      state.isLoaded = false;
    },
  },
});

export const { setSearchParams, setUrl, fetchFailed } = searchSlice.actions;

export default searchSlice.reducer;
