import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotelList: [],
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      state.hotelList = action.payload;
    },
  },
});

export const { fetchData } = hotelsSlice.actions;

export default hotelsSlice.reducer;
