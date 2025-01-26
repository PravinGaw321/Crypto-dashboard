import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Footer() {
    const {
        updatedLoading,
        updatedDataTime,
        cryptoOption,
        cryptoData
    } = useSelector((state) => state.dashboard);


    const date = new Date(updatedDataTime);

    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    
    const formattedTime = date.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, 
    });
    return (
        <Container maxWidth="xl" sx={{ position: !cryptoData ? "fixed" : "relative", bottom: !cryptoData ? 0 : "inherit", backgroundColor: "#1976d2", mt: 4 }}>
            <Box
                sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                    display: "flex",
                    py: 2,
                }}
            >
                {updatedLoading ? (
                    <Skeleton variant="rounded" width={'70%'} height={20} />
                ) : (
                    !cryptoData ? <Typography
                        variant="caption"
                        color="#fff"
                        fontWeight={300}
                        fontSize="13px"
                    >
                        Error for fetching Data
                    </Typography> :
                        <Typography
                            variant="caption"
                            color="#fff"
                            fontWeight={300}
                            fontSize="13px"
                        >
                            The data for <b>{cryptoOption}</b> was last updated on
                            <span style={{ color: '#000', fontWeight: 700 }}> {formattedDate} </span>
                            at
                            <span style={{ color: '#FFD700', fontWeight: 700 }}> {formattedTime} </span>.
                        </Typography>
                )}
            </Box>
        </Container>
    );
}
