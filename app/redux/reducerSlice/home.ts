import {createSlice} from '@reduxjs/toolkit';
import {homeApi} from '../../api/apiCall';

export interface HomeState {
  homeData: any;
  homeLoader: boolean;
}

const initialState: HomeState = {
  homeData: null,
  homeLoader: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    removeHomeData: state => {
      state.homeData = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(homeApi.pending, state => {
      state.homeLoader = true;
    });
    builder.addCase(homeApi.fulfilled, (state, action) => {
      state.homeData = action?.payload;
      state.homeLoader = false;
    });
    builder.addCase(homeApi.rejected, (state, action) => {
      state.homeLoader = false;
    });
  },
});

export const {removeHomeData} = homeSlice.actions;
export default homeSlice.reducer;
