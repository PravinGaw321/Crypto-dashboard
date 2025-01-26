import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';
import { CircularProgress, Box } from '@mui/material';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  LineController
);

function LineChart({ data, loading }) {
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const labels = data.map(item => {
        const date = new Date(item[0]); 
        return date.toLocaleTimeString(); 
      });

      const prices = data.map(item => item[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Price Trend',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      });
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current && chartData.labels) {
      new ChartJS(chartRef.current, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Price Trend Over the Last 7 Days',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `$${tooltipItem.raw.toLocaleString()}`; 
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)',
              },
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`, 
              },
            },
          },
        },
      });
    }
  }, [chartData]); 

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  
  return <canvas ref={chartRef} />;
}

export default LineChart;
