import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Box, Button, FormControl, TextField, Typography } from '@mui/material';

const ExcelReport: React.FC = () => {
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    const handleExport = () => {
        fetch(`http://localhost:8080/pedido/search?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
            .then(response => response.json())
            .then(data => {
                 // Filtrar los pedidos que tienen detalles
        const pedidosConDetalles = data.filter((pedido: any) => pedido.detalles && pedido.detalles.length > 0);

        const worksheet = XLSX.utils.json_to_sheet(pedidosConDetalles.map((pedido: any) => ({
            'Fecha Pedido': pedido.fechaPedido,
            'Instrumento': pedido.detalles[0].instrumento.instrumento,
            'Marca': pedido.detalles[0].instrumento.marca,
            'Modelo': pedido.detalles[0].instrumento.modelo,
            'Cantidad': pedido.detalles[0].cantidad,
            'Precio': pedido.detalles[0].instrumento.precio,
            'Subtotal': pedido.detalles[0].cantidad * pedido.detalles[0].instrumento.precio,
        })));

                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const reporte = new Blob([excelBuffer], { type: 'application/octet-stream' });
                saveAs(reporte, 'ReportePedidos.xlsx');
            });
    };

    return (
        <Box sx={{ p: 3, maxWidth: '100%', mx: 'auto', mt: 3, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Reporte de Pedidos en Excel
            </Typography>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Fecha Desde"
                    type="date"
                    value={fechaDesde}
                    onChange={e => setFechaDesde(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Fecha Hasta"
                    type="date"
                    value={fechaHasta}
                    onChange={e => setFechaHasta(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </FormControl>
            <Button variant="contained"  onClick={handleExport} fullWidth sx={{
            mt: 2,
            backgroundColor: '#4e342e',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(78, 52, 46, 0.9)',
            },
          }}>
                Exportar a Excel
            </Button>
        </Box>
    );
};

export default ExcelReport;