import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import candidateService from '../api/candidateService';

// Thunks
export const fetchCandidates = createAsyncThunk(
  'candidates/fetchAll',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await candidateService.getAll(state.auth.token);
    return response.data;
  }
);

export const referCandidate = createAsyncThunk(
  'candidates/refer',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await candidateService.create(formData, state.auth.token);
    return response.data;
  }
);

export const updateStatus = createAsyncThunk(
  'candidates/updateStatus',
  async ({ id, status }, thunkAPI) => {
    const state = thunkAPI.getState();
    const response = await candidateService.updateStatus(id, status, state.auth.token);
    return response.data;
  }
);

const candidateSlice = createSlice({
  name: 'candidates',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(referCandidate.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        const idx = state.items.findIndex(c => c._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => { state.error = action.error.message; }
      );
  },
});

export default candidateSlice.reducer;