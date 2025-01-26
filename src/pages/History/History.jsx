import React, { useEffect } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchHistoricalData } from "../../store/History/history.reducer";
import HistoricalContent from "../../component/HistoricalContent/HistoricalContent";
import { useState } from "react";
import dayjs from 'dayjs';

const History = () => {
  const { cryptoOption } = useSelector((state) => state.dashboard);


  const handleDateChange = (newValue) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const [date, setDate] = useState(dayjs()); 

  // Define the date range
  const today = dayjs();
  const oneYearAgo = dayjs().subtract(365, 'days'); 

  const dispatch = useDispatch();
  const fetchAptData = (coin = "bitcoin", date) => {
    const formattedDate = date?.format("DD-MM-YYYY");
    try {
      dispatch(fetchHistoricalData({ coin: coin.toLowerCase(), date: formattedDate })).unwrap();
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    try {
      fetchAptData(cryptoOption, date)
    } catch (err) {
      console.log('error', err);
    }
  }, [cryptoOption, date])

  return (
    <>
      <Header />
      <HistoricalContent date={date} setDate={setDate} today={today} oneYearAgo={oneYearAgo} handleDateChange={handleDateChange} />
      <Footer />
    </>
  )
}

export default History;