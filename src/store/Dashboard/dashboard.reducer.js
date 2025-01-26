import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import baseInstance from '../../component/api/api_instance';

const initialState = {
    cryptoOption: 'Bitcoin',

    loading: false,
    data: [],
    error: false,

    cryptoLoading: false,
    cryptoData:[],
    cryptoError: false,

    chartLoading: false,
    chartData: [],
    chartError: false,

    updatedLoading: false,
    updatedDataTime: {},
    updateDataError: false,
}


export const fetchCryptoWithCurrencyAPi = createAsyncThunk(
    'api/fetchCryptoWithCurrencyAPi',
    async (_, { rejectWithValue }) => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await baseInstance.get(`coins/markets?vs_currency=usd`, { 
            signal: signal,
        });
        return response.data;
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

export const fetchCryptoDataDashboard = createAsyncThunk(
  'api/fetchCryptoDataDashboard',
  async (data, { rejectWithValue }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const {coin} = data;
    try {
      const response = await baseInstance.get(`coins/markets?vs_currency=usd&ids=${coin}`, { 
          signal: signal,
      });
      return response.data[0];
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

export const fetchLineChartData = createAsyncThunk(
  'api/fetchLineChartData',
  async (data, { rejectWithValue }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const {coin} = data;
    try {
      const response = await baseInstance.get(`coins/${coin}/market_chart?vs_currency=usd&days=7`, { 
          signal: signal,
      });
      return response?.data?.prices;
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



export const fetchLastUpdatedTime = createAsyncThunk(
  'api/fetchLastUpdatedTime',
  async (data, { rejectWithValue }) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const {coin} = data;
    try {
      const response = await baseInstance.get(`coins/${coin}`, { 
          signal: signal,
      });
      return response?.data?.last_updated;
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
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData(state, action){
      state.cryptoOption = action.payload ? action.payload: "bitcoin";
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCryptoWithCurrencyAPi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoWithCurrencyAPi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCryptoWithCurrencyAPi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      .addCase(fetchCryptoDataDashboard.pending, (state) => {
        state.cryptoLoading = true;
        state.cryptoError = null;
      })
      .addCase(fetchCryptoDataDashboard.fulfilled, (state, action) => {
        state.cryptoLoading = false;
        state.cryptoData = action.payload;
      })
      .addCase(fetchCryptoDataDashboard.rejected, (state, action) => {
        state.cryptoLoading = false;
        state.cryptoError = action.payload; 
      })
      .addCase(fetchLineChartData.pending, (state) => {
        state.chartLoading = true;
        state.chartError = null;
      })
      .addCase(fetchLineChartData.fulfilled, (state, action) => {
        state.chartLoading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchLineChartData.rejected, (state, action) => {
        state.chartLoading = false;
        state.chartError = action.payload; 
      })
      .addCase(fetchLastUpdatedTime.pending, (state) => {
        state.updatedLoading = true;
        state.updateDataError = null;
      })
      .addCase(fetchLastUpdatedTime.fulfilled, (state, action) => {
        state.updatedLoading = false;
        state.updatedDataTime = action.payload;
      })
      .addCase(fetchLastUpdatedTime.rejected, (state, action) => {
        state.updatedLoading = false;
        state.updateDataError = action.payload; 
      })
  },
})


export const { fetchData } = counterSlice.actions;
export default counterSlice.reducer