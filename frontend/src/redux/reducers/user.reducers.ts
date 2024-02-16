import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userStateType } from '~/@types/user.type'

const initialState: userStateType = {
  isAuthenticated: false,
  stepVerify: 0,
  email: ''
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    authAction: (state: userStateType, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    verifyAction: (state: userStateType, action: PayloadAction<number>) => {
      state.stepVerify = action.payload
    },
    updateEmailAction: (state: userStateType, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

export const { authAction, verifyAction, updateEmailAction } = userReducer.actions

export default userReducer.reducer
