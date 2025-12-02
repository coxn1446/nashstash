import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isNative: false,
  platform: 'web',
  keyboardVisible: false,
};

const nativeSlice = createSlice({
  name: 'native',
  initialState,
  reducers: {
    setNative: (state, action) => {
      state.isNative = action.payload;
    },
    setPlatform: (state, action) => {
      state.platform = action.payload;
    },
    setKeyboardVisible: (state, action) => {
      state.keyboardVisible = action.payload;
    },
  },
});

export const { setNative, setPlatform, setKeyboardVisible } = nativeSlice.actions;

// Selectors
export const selectIsNative = (state) => state.native.isNative;
export const selectPlatform = (state) => state.native.platform;
export const selectKeyboardVisible = (state) => state.native.keyboardVisible;

export default nativeSlice.reducer;

