import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import candidateService from '../api/candidateService';

// Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, ) => {
    const response = await candidateService.register(userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, ) => {
    const response = await candidateService.login(credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
 initialState: { 
  token: localStorage.getItem('token') || null,
  user: null,
  status: 'idle',
  error: null 
},
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(registerUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.status = 'succeeded';
          localStorage.setItem('token', action.payload.token);
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.status = 'succeeded';
          localStorage.setItem('token', action.payload.token);
        })
        .addCase(logout, (state) => {
          localStorage.removeItem('token');
        })
    
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => { state.status = 'loading'; }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;