import React, { useContext } from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CarritoContext } from '../Context/CarritoContext';
import { postData } from '../api/genericCalls';
import { Pedido, PedidoDetalle } from '../Types/InstrumentoProps';

export const Carrito: React.FC = () => {
    const { carrito, eliminarDelCarrito } = useContext(CarritoContext);

    const precioTotal = carrito.reduce((total, { precio, cantidad }) => total + Number(precio) * cantidad, 0);

    const realizarPedido = async () => {
        // Aquí puedes preparar los datos del pedido para enviar al backend
        const pedido: Pedido = {
            fechaPedido: new Date(),
            totalPedido: precioTotal,
            detalles: carrito.map(({ id, cantidad, precio, instrumento, marca, modelo, imagen, costoEnvio, cantidadVendida, descripcion, categoria }): PedidoDetalle => ({
                cantidad: cantidad,
                instrumento: { id, instrumento, marca, modelo, imagen, precio, costoEnvio, cantidadVendida, descripcion, categoria },
            })),
        };
        await postData<Pedido>("http://localhost:8080/pedido/create", pedido);
        console.log(pedido);
    };

    return (
        <Box>
            <Typography variant="h4">Carrito</Typography>
            {carrito.map(({ id, instrumento, marca, modelo, precio, cantidad }) => (
                <Card key={id} sx={{ marginBottom: 2, boxShadow: 3, display: 'flex', alignItems: 'center' }}>
                    <CardContent>
                        <Typography variant="h6">{instrumento}</Typography>
                        <Typography variant="body1">Marca: {marca}</Typography>
                        <Typography variant="body1">Modelo: {modelo}</Typography>
                        <Typography variant="body1">Precio: {precio}</Typography>
                        <Typography variant="body1">Cantidad: {cantidad}</Typography>
                    </CardContent>
                    <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => eliminarDelCarrito(id)}
                        sx={{ marginLeft: 'auto' }}
                    >
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </Card>
            ))}
            <Typography variant="h5">Precio total: {precioTotal}</Typography>
            <Button variant="contained" color="primary" onClick={realizarPedido}>
                Realizar pedido
            </Button>
        </Box>
    );
};