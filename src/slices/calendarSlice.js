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
      state.date = action.payload;
    },
  },
});

export const { show, close, setDate } = calendarSlice.actions;

export default calendarSlice.reducer;
