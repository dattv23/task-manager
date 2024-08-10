import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Auth } from '~/@types'

const initialState: Auth = {
  isAuthenticated: false,
  stepVerify: 0,
  email: ''
}

const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    authAction: (state: Auth, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },
    verifyAction: (state: Auth, action: PayloadAction<number>) => {
      state.stepVerify = action.payload
    },
    updateEmailAction: (state: Auth, action: PayloadAction<string>) => {
      state.email = action.payload
    }
  }
})

export const { authAction, verifyAction, updateEmailAction } = authReducer.actions

export default authReducer.reducer
