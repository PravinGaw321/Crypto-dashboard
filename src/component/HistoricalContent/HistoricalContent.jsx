import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, TextField, Skeleton, TablePagination, Box, Typography } from "@mui/material"; // Using Material-UI for the table
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default function HistoricalContent({ date, setDate, today, oneYearAgo, handleDateChange }) {
    const { historyLoading, historyData, historyError } = useSelector((state) => state.historical);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(10); 
    const formatVolume = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
    };

    const formatData = (prices, marketCaps) => {
        return prices.map((priceData, index) => {
            const timestamp = priceData[0];
            const price = priceData[1];
            const volume = marketCaps.find((volumeData) => volumeData[0] === timestamp)?.[1] || 0;

            return {
                date: dayjs(timestamp).format("DD-MM-YYYY"), 
                price: price.toFixed(2), 
                volume: volume.toFixed(2), 
            };
        });
    };

    const formattedData = formatData(historyData?.prices || [], historyData?.market_caps || []);
    // Function to handle search
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter data based on the search query
    const filteredData = formattedData.filter((row) => {
        return (
            row.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.price.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    return (
        <Container>
            {
                historyError ? <Box sx={{ padding: '20px', boxSizing: "border-box" }}>
                    <Typography variant='h6' color='#ff0000'>
                        Problem Fetching Data for the Selected Cryptocurrency.
                    </Typography>
                </Box> :
                    <Grid container spacing={2} alignItems="center" sx={{ my: 5 }}>
                        {/* Date Picker */}
                        <Grid item xs={12} sm={6} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Select Date (last 365 days)"
                                    value={date}
                                    onChange={handleDateChange}
                                    minDate={oneYearAgo} 
                                    maxDate={today} 
                                />
                            </LocalizationProvider>
                        </Grid>

                        {/* Search Bar */}
                        <Grid item xs={12} sm={6} md={6}>
                            <TextField
                                fullWidth
                                label="Search by Date or Price"
                                variant="outlined"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </Grid>
                    </Grid>
            }


            <div>
                {historyLoading ? (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Skeleton variant="text" width="100px" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="100px" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" width="100px" />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* Skeleton for 6 rows */}
                            {[...Array(6)].map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="text" width="100px" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="100px" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width="100px" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : historyError ? (
                    <p>Error loading data</p>
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Price (USD)</TableCell>
                                <TableCell>24-hour Volume (USD)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length > 0 ? (
                                // Slice the data for pagination
                                filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>{formatVolume(row.volume)}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>No matching data found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
                {/* Pagination */}
                {filteredData.length > 10 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </div>
        </Container>
    );
}
