import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authStateType } from '~/@types/auth.type'

const initialState: authStateType = {
  isAuthenticated: false,
  stepVerify: 0,
  email: ''
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    authAction: (state: authStateType, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    verifyAction: (state: authStateType, action: PayloadAction<number>) => {
      state.stepVerify = action.payload
    },
    updateEmailAction: (state: authStateType, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

export const { authAction, verifyAction, updateEmailAction } = authReducer.actions

export default authReducer.reducer
