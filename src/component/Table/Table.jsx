import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { getPriceChangeStyle } from '../../utils';
import { useSelector } from 'react-redux';
import { Skeleton } from '@mui/material';

function createData(key, value, label) {
    return { key, value, label };
}

export default function DataTable({ data }) {
    const { cryptoLoading } = useSelector((state) => state.dashboard);
    const formatNumber = (value) => {
        if (!value) return '-';
        return new Intl.NumberFormat('en-US').format(value);
    };

    const formatCurrency = (value) => {
        if (!value) return '-';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2,
        }).format(value);
    };

    const formatPercentage = (value) => {
        if (!value) return '-';
        return `${value.toFixed(2)}%`;
    };

    const rows = Object.keys(data).map((key) => {
        let formattedValue = data[key];
        let label = key
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '); 

        // Format the value based on the key
        switch (key) {
            case 'market_cap':
            case 'total_supply':
            case 'circulating_supply':
                formattedValue = `$${formatNumber(data[key])}`; // Add "$" to large numbers
                break;
            case 'ath':
            case 'All Time High Price':
                formattedValue = formatCurrency(data[key]); // Format all-time high price as currency
                break;
            case 'market_cap_rank':
                formattedValue = `#${data[key]}`; // Add "#" for rank
                break;
            case 'current_price':
                formattedValue = formatCurrency(data[key]); // Format current price as currency
                break;
            case 'price_change_24h':
                formattedValue = formatCurrency(data[key]); // Format price change as currency
                break;
            case 'price_change_percentage_24h':
                formattedValue = formatPercentage(data[key]); // Format price change percentage as percentage
                break;
            default:
                formattedValue = data[key]; // Default case if no special formatting is needed
                break;
        }

        return createData(key, formattedValue, label);
    });

    return (
        <TableContainer sx={{ maxWidth: '90%', mt: '40px', ml: '25px' }}>
            <Table sx={{ maxWidth: '100%' }} size="small" aria-label="a dense table">
                {
                    cryptoLoading ? [1, 2, 3].map((i) => {
                        return <Skeleton key={i} variant="rounded" width={'100%'} height={25} sx={{ marginBottom: "10px" }} />
                    }) :
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.key}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{ color: '#fff', fontWeight: 500 }}
                                    >
                                        {row.label}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            color: '#fff',
                                            fontSize: '19px',
                                            fontWeight: 600,
                                            fontFamily: 'cursive',
                                        }}
                                        style={getPriceChangeStyle(row.value)}
                                    >
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                }
            </Table>
        </TableContainer>
    );
}
