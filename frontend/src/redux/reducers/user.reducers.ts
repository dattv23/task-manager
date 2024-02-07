import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userStateType } from '~/@types/user.type'

const initialState: userStateType = {
  isLogin: false
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    authAction: (state: userStateType, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    }
  }
})

export const { authAction } = userReducer.actions

export default userReducer.reducer
