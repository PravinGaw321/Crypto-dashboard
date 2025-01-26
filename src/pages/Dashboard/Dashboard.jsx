import React from "react";
import Header from "../../component/Header/Header";
import Footer from "../../component/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import CryptoData from "../../component/CryptoData/CryptoData";


const Dashboard = () => {

    const { cryptoData, cryptoLoading } = useSelector((state) => state.dashboard);
    return (
        <>
            <Header />
            <CryptoData data={cryptoData} loading={cryptoLoading} />
            <Footer />
        </>
    )
}

export default Dashboard;