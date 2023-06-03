import {createSlice} from '@reduxjs/toolkit';
import {UserDetails} from '../../types/type';
import {loginApi} from '../../api/apiCall';
import {
  addUserData,
  findUserData,
  updateUserData,
} from '../../firebase/firebaseHelper';

export interface AuthState {
  userData: UserDetails | null;
}

const initialState: AuthState = {
  userData: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    removeAuthData: state => {
      state.userData = null;
    },
    updateReduxUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginApi.fulfilled, (state, action) => {
      if (action?.payload?.user_details) {
        state.userData = action?.payload?.user_details;

        findUserData(action?.payload?.user_details, fbData => {
          if (fbData === null) {
            addUserData(action?.payload?.user_details);
          } else {
            updateUserData(fbData?.key, action?.payload?.user_details);
          }
        });
      }
    });
  },
});

export const {removeAuthData, updateReduxUserData} = authSlice.actions;
export default authSlice.reducer;
