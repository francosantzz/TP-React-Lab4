import React, { useEffect, useState } from 'react';
import ExcelReport from '../Components/ExcelReport';
import { Bar, Pie } from 'react-chartjs-2';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Charts: React.FC = () => {
  const [barData, setBarData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);
  const [barError, setBarError] = useState<string | null>(null);
  const [pieError, setPieError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (url: string, setData: React.Dispatch<any>, setError: React.Dispatch<string | null>, label: string, backgroundColors: string[]) => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Invalid data format');
        
        const labels = data.map((item: any) => `${item[1]}/${item[0]}` || item[0]);
        const values = data.map((item: any) => item[2] || item[1]);

        setData({
          labels,
          datasets: [{ label, data: values, backgroundColor: backgroundColors }]
        });
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData('http://localhost:8080/pedido/group-by-month-year', setBarData, setBarError, 'Cantidad de Pedidos', ['rgba(75, 192, 192, 0.6)']);
    fetchData('http://localhost:8080/pedido/group-by-instrument', setPieData, setPieError, 'Cantidad de Pedidos por Instrumento', ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']);
  }, []);

  return (
    <Container>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2, }}>Charts</Typography>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
          <ExcelReport />
          <Box sx={{ }}>
                <Typography variant="h6" component="h2" gutterBottom>Pedidos por Mes y Año</Typography>
                {barError ? <Typography color="error">{barError}</Typography> : barData ? (
                    <Box sx={{ width: 550 }}>
                    <Bar data={barData} />
                    </Box>
                ) : <Typography>Cargando datos...</Typography>}
          </Box>
        </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
            
            
            <Box sx={{ mb: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>Pedidos por Instrumento</Typography>
            {pieError ? <Typography color="error">{pieError}</Typography> : pieData ? (
                <Box sx={{ width: 550, height: 550 }}>
                <Pie data={pieData} />
                </Box>
            ) : <Typography>Cargando datos...</Typography>}
            </Box>
      </Box>
    </Container>
  );
};

export default Charts;
