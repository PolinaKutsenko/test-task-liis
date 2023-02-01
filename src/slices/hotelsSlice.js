import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteHotel, deleteFavoriteHotel } from './favoritesSlice.js';

const initialState = {
  hotelList: {
    ids: [],
    entities: {},
  },
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      const hotelArray = action.payload;
      const newEntities = {};
      const newIds = [];
      hotelArray.forEach((item) => {
        newEntities[item.hotelId] = item;
        newIds.push(item.hotelId);
      });
      state.hotelList.entities = newEntities;
      state.hotelList.ids = newIds;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteHotel, (state, action) => {
        const { hotelId } = action.payload;
        const newIds = state.hotelList.ids.filter((id) => id !== hotelId);
        state.hotelList.ids = newIds;
        const { [hotelId]: deletedKey, ...newState } = state.hotelList.entities;
        state.hotelList.entities = newState;
      })
      .addCase(deleteFavoriteHotel, (state, action) => {
        const hotelData = action.payload;
        state.hotelList.ids.push(hotelData.hotelId);
        state.hotelList.entities[hotelData.hotelId] = hotelData;
      });
  },
});

export const { fetchData, addHotel, deleteHotel } = hotelsSlice.actions;

export default hotelsSlice.reducer;
