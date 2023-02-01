import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteHotels: {
    ids: [],
    entities: {},
  },
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteHotel: (state, action) => {
      const hotelData = action.payload;
      state.favoriteHotels.ids.push(hotelData.hotelId);
      state.favoriteHotels.entities[hotelData.hotelId] = hotelData;
    },
    deleteFavoriteHotel: (state, action) => {
      const { hotelId } = action.payload;
      const newIds = state.favoriteHotels.ids.filter((id) => id !== hotelId);
      state.favoriteHotels.ids = newIds;
      const { [hotelId]: deletedKey, ...newState } = state.favoriteHotels.entities;
      state.favoriteHotels.entities = newState;
    },
    sortedByPriceIncrease: (state) => {
      const arrayOfIdAndPrice = state.favoriteHotels.ids.map((id) => {
        const hotelData = state.favoriteHotels.entities[id];
        return { id, price: hotelData.priceAvg };
      });
      const sortedArrayOfIdAndPrice = arrayOfIdAndPrice.sort((a, b) => (
        Math.sign(a.price - b.price)));
      state.favoriteHotels.ids = sortedArrayOfIdAndPrice.map((el) => el.id);
    },
    sortedByPriceDecrease: (state) => {
      const arrayOfIdAndPrice = state.favoriteHotels.ids.map((id) => {
        const hotelData = state.favoriteHotels.entities[id];
        return { id, price: hotelData.priceAvg };
      });
      const sortedArrayOfIdAndPrice = arrayOfIdAndPrice.sort((a, b) => (
        Math.sign(b.price - a.price)));
      state.favoriteHotels.ids = sortedArrayOfIdAndPrice.map((el) => el.id);
    },
    sortedByStarsIncrease: (state) => {
      const arrayOfIdAndPrice = state.favoriteHotels.ids.map((id) => {
        const hotelData = state.favoriteHotels.entities[id];
        return { id, stars: hotelData.stars };
      });
      const sortedArrayOfIdAndPrice = arrayOfIdAndPrice.sort((a, b) => (
        Math.sign(a.stars - b.stars)));
      state.favoriteHotels.ids = sortedArrayOfIdAndPrice.map((el) => el.id);
    },
    sortedByStarsDecrease: (state) => {
      const arrayOfIdAndPrice = state.favoriteHotels.ids.map((id) => {
        const hotelData = state.favoriteHotels.entities[id];
        return { id, stars: hotelData.stars };
      });
      const sortedArrayOfIdAndPrice = arrayOfIdAndPrice.sort((a, b) => (
        Math.sign(b.stars - a.stars)));
      state.favoriteHotels.ids = sortedArrayOfIdAndPrice.map((el) => el.id);
    },
  },
});

export const {
  addFavoriteHotel,
  deleteFavoriteHotel,
  sortedByPriceIncrease,
  sortedByPriceDecrease,
  sortedByStarsIncrease,
  sortedByStarsDecrease,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
