import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
      name: 'app',
      initialState: {
            isSigned: false,
      },
      reducers: {
            updateSignIn: (state, action: PayloadAction<boolean>) => {
                  state.isSigned = action.payload;
            },
      },
});

// Action creators are generated for each case reducer function
export const { updateSignIn } = appSlice.actions;

export default appSlice.reducer;
