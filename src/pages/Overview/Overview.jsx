import React, { useEffect } from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { useSelector } from 'react-redux';
import CryptoData from "../../component/CryptoData/CryptoData";

const centerItems = {
  display: "flex",
  justifyContent: 'center'
}

const Overview = () => {
  const { cryptoData, cryptoLoading } = useSelector((state) => state.dashboard);
  return (
    <>
      <Header />
      <CryptoData data={cryptoData} loading={cryptoLoading}/>
      <Footer />
    </>
  )
}

export default Overview;