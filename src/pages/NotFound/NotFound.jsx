import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',  
        justifyContent: 'center',  
        height: '100vh',  
      }}
    >
      <Typography variant="h4">
        404 - Not Found
      </Typography>
    </Box>
  );
};

export default NotFound;
