import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseInstance from '../../component/api/api_instance';

const initialState = {
    historyLoading: false,
    historyData: [],
    historyError: false,
}

export const fetchHistoricalData = createAsyncThunk(
  'api/fetchHistoricalData',
  async (data, { rejectWithValue }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const {coin, date} = data;
    try {
      const response = await baseInstance.get(`coins/${coin}/market_chart?vs_currency=usd&days=${date}`, { 
          signal: signal,
      });
      return response?.data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('API request canceled');
      } else {
        return rejectWithValue('Failed to fetch data'); 
      }
    } finally {
      controller.abort(); 
    }
  }
);


export const counterSlice = createSlice({
  name: 'historical',
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(fetchHistoricalData.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
        state.historyData = [];
      })
      .addCase(fetchHistoricalData.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.historyData = action.payload;
      })
      .addCase(fetchHistoricalData.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyData = [];
        state.historyError = action.payload; 
      })
  },
})


export const { fetchData } = counterSlice.actions;
export default counterSlice.reducer