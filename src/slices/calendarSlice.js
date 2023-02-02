import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uiState: false,
  date: new Date(),
};

const calendarSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    show: (state) => {
      state.uiState = true;
    },
    close: (state) => {
      state.uiState = false;
    },
    setDate: (state, action) => {
      const date = action.payload;
      const hoursInMoscowUTC = date.getHours() + 3;
      state.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hoursInMoscowUTC);
    },
  },
});

export const { show, close, setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
