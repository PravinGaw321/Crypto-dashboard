import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Container, Skeleton, Typography } from '@mui/material';
import DataTable from '../Table/Table';
import { getPriceChangeStyle } from '../../utils';
import { useSelector } from 'react-redux';
import LineChart from '../Chart/Chart';
import { Link, useLocation } from 'react-router';
import Description from '../Description/Description';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


const centerItems = {
    display: "flex",
    justifyContent: 'center'
}

const CryptoData = ({ data, loading }) => {
    const location = useLocation();
    const { chartLoading, chartData } = useSelector((state) => state.dashboard);

    if (!data) {
        return (
            <Box sx={{ padding: '20px', boxSizing: "border-box" }}>
                <Typography variant='h6' color='#ff0000'>
                    Problem Fetching Data for the Selected Cryptocurrency.
                </Typography>
            </Box>
        )
    }
    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 12 }} sx={{ py: 2 }}>
                        <Item sx={{ backgroundColor: 'rgba(0,0,0,0.4)', py: 5 }}>
                            <Grid spacing={0} sx={{ ...centerItems, alignItems: "center", justifyContent: 'start' }}>
                                <Grid size={{ xs: 3, sm: 2, md: 2, mx: 1 }} sx={{ ...centerItems, mx: 1 }}>
                                    {loading ? <Skeleton variant="circular" width={70} height={70} /> :
                                        location?.pathname?.includes('/dashboard') ?
                                            <Link to="/overview" style={{ color: "#fff" }}> <img
                                                srcSet={data?.image}
                                                src={data?.image}
                                                alt={data?.name}
                                                loading="lazy"
                                                width={70}
                                                height={70}
                                            />
                                            </Link> : <img
                                                srcSet={data?.image}
                                                src={data?.image}
                                                alt={data?.name}
                                                loading="lazy"
                                                width={70}
                                                height={70}
                                            />
                                    }
                                </Grid>
                                <Grid size={{ xs: 12, sm: 10, md: 10 }} sx={{ ...centerItems, justifyContent: "start" }}>
                                    {loading ? <Skeleton variant="rounded" width={200} height={40} /> :
                                        <Typography variant="h1" component="h2" sx={{ fontSize: "45px", fontWeight: 600, color: '#fff' }}>
                                            {
                                                location?.pathname?.includes('/dashboard') ?
                                                    <Link to="/overview" style={{ color: "#fff" }}>{data?.name}</Link> : data?.name
                                            }
                                        </Typography>}
                                </Grid>
                            </Grid>
                            {
                                !location?.pathname?.includes('/overview') ?
                                    <Grid spacing={0} sx={{ ...centerItems, alignItems: "center", justifyContent: 'start' }}>
                                        <Grid size={{ xs: 3, sm: 2, md: 2 }} sx={{ ...centerItems, mx: 2 }}>
                                        </Grid>
                                        {
                                            loading ? <Skeleton variant="rounded" width={200} height={40} /> :
                                                <Grid size={{ xs: 12, sm: 10, md: 10 }} sx={{ ...centerItems, justifyContent: "start" }}>
                                                    <Typography variant="h1" component="h2" sx={{ fontSize: "35px", fontWeight: 600, fontFamily: 'sans-serif' }} style={getPriceChangeStyle(Math.round(data?.current_price))}>
                                                        ${Math.round(data?.current_price).toLocaleString()}
                                                    </Typography>
                                                </Grid>
                                        }
                                    </Grid> : ''
                            }
                            {
                                location?.pathname?.includes('/dashboard') ?
                                    <DataTable data={{
                                        current_price: data?.current_price,
                                        price_change_24h: data?.price_change_24h,
                                        price_change_percentage_24h: data?.price_change_percentage_24h
                                    }}
                                    /> : <DataTable data={{
                                        market_cap: data?.market_cap,
                                        total_supply: data?.total_supply,
                                        circulating_supply: data?.circulating_supply,
                                        'All Time High Price': data?.ath,
                                        market_cap_rank: data?.market_cap_rank,
                                    }}
                                    />
                            }
                        </Item>

                    </Grid>
                </Grid>

                {/* Line Chart here */}

                {!location?.pathname?.includes('/overview') ?
                    <LineChart loading={chartLoading} data={chartData} /> : ''}


                {!location?.pathname?.includes('/dashboard') ?
                    <Description /> : ''}

            </Container>
        </>
    )
}

export default CryptoData;