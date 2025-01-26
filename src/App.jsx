import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoDataDashboard, fetchCryptoWithCurrencyAPi, fetchLastUpdatedTime, fetchLineChartData } from './store/Dashboard/dashboard.reducer';
import { Box, CircularProgress } from '@mui/material';
import './App.css'
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Overview = lazy(() => import('./pages/Overview/Overview'));
const History = lazy(() => import('./pages/History/History'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  const { cryptoOption, data } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const fetchAptData = (coin) => {
    try {
      if (!data?.length) {
        dispatch(fetchCryptoWithCurrencyAPi()).unwrap();
      }
      dispatch(fetchCryptoDataDashboard({ coin: coin?.toLowerCase() })).unwrap();
      dispatch(fetchLineChartData({ coin: coin?.toLowerCase() })).unwrap();
      dispatch(fetchLastUpdatedTime({ coin: coin?.toLowerCase() })).unwrap();
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    try {
      fetchAptData(cryptoOption)
    } catch (err) {
      console.log('error', err);
    }
  }, [cryptoOption])


  return (
    <>
      <Suspense fallback={<Box
        sx={{
          display: 'flex',
          alignItems: 'center', 
          justifyContent: 'center',  
          height: '100vh',  
        }}
      >
        <CircularProgress size="3rem"  />
      </Box>}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
