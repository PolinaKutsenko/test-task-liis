import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hotelList: {
    ids: [],
    entities: {},
  },
  favoriteHotelsId: [],
};

const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    fetchData: (state, action) => {
      console.log('fetchdata!!');
      const hotelArray = action.payload;
      console.log('hotelarray', hotelArray);
      hotelArray.forEach((item) => {
        state.hotelList.entities[item.hotelId] = item;
        state.hotelList.ids.push(item.hotelId);
      });
      console.log(state.hotelList);
    },
    addFavoriteHotel: (state, action) => {
      const hotelId = action.payload;
      state.favoriteHotelsId.push(hotelId);
      const favoriteIdsList = localStorage.getItem('favoriteIds') ? localStorage.getItem('favoriteIds') : '';
      localStorage.setItem('favoriteIds', `${favoriteIdsList} ${hotelId}`);
    },
  },
});

export const { fetchData } = hotelsSlice.actions;

export default hotelsSlice.reducer;
