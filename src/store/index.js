import { configureStore } from '@reduxjs/toolkit'
import dasboardReducer from '../store/Dashboard/dashboard.reducer';
import historicaldReducer from '../store/History/history.reducer';

const store = configureStore({
  reducer: {
    dashboard: dasboardReducer,
    historical: historicaldReducer,
  },
})

export default store;