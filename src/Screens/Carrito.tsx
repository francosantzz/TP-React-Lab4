import React, { useContext, useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Button, Grid, CardMedia } from '@mui/material';
import { CarritoContext } from '../Context/CarritoContext';
import { Pedido, PedidoDetalle } from '../Types/InstrumentoProps';
import FadeInContent from './FadeInContent';

const Carrito: React.FC = () => {
    const { carrito, vaciarCarrito, eliminarDelCarrito } = useContext(CarritoContext);
    const [precioTotal, setPrecioTotal] = useState(0);

    useEffect(() => {
        const totalProductos = carrito.reduce((sum, { precio, cantidad }) => sum + (Number(precio) * cantidad), 0);
        const totalCantidad = carrito.reduce((sum, { cantidad }) => sum + cantidad, 0);

        const costoEnvioTotal = carrito.reduce((max, { costoEnvio }) => {
            const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
            return Math.max(max, costoEnvioNumerico);
        }, 0);

        const totalConEnvio = totalProductos + costoEnvioTotal;

        setPrecioTotal(totalConEnvio);
    }, [carrito]);

    const realizarPedido = async () => {
        const pedido: Pedido = {
            fechaPedido: new Date(),
            totalPedido: precioTotal,
            detalles: carrito.map(({ id, cantidad, ...resto }) => ({
                cantidad,
                instrumento: { id, ...resto }
            }))
        };

        try {
            const response = await fetch("http://localhost:8080/pedido/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pedido)
            });

            if (!response.ok) {
                throw new Error("Error al realizar el pedido");
            }

            const data = await response.json();
            alert(`El pedido con id ${data.id} se guardó correctamente`);
            vaciarCarrito();

        } catch (error) {
            console.error("Hubo un error en la solicitud:", error);
            alert("Hubo un error al realizar el pedido. Por favor, inténtelo de nuevo.");
        }

        const apiResponsePago = await fetch("http://localhost:8080/mercadopago/create-preference", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrito.map(({ id, instrumento, cantidad, precio }) => {
                return {
                    id,
                    instrumento,
                    cantidad,
                    precio: parseFloat(precio)
                };
            }))
        });
        const dataPago = await apiResponsePago.text();

        window.location.href = dataPago;
    };

    return (
        <FadeInContent>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>Carrito</Typography>
                {carrito.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'black' }}>No se han agregado items al carrito</Typography>
                ) : (
                    <>
                        {carrito.map(({ id, instrumento, marca, modelo, precio, cantidad, costoEnvio, imagen }) => {
                            const costoEnvioNumerico = costoEnvio === 'G' ? 0 : Number(costoEnvio);
                            const precioTotalItem = Number(precio) * cantidad + costoEnvioNumerico;

                            return (
                                <Card key={id} sx={{ marginBottom: 2, backgroundColor: '#424242', color: 'white' }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4} md={3}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={imagen}
                                                    alt={instrumento}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={8} md={9}>
                                                <Typography variant="h6">{instrumento}</Typography>
                                                <Typography variant="body1">Marca: {marca}</Typography>
                                                <Typography variant="body1">Modelo: {modelo}</Typography>
                                                <Typography variant="body1">Precio: ${precio}</Typography>
                                                <Typography variant="body1">Costo de envío: {costoEnvioNumerico === 0 ? 'Gratis' : `$${costoEnvioNumerico}`}</Typography>
                                                <Typography variant="body1">Cantidad: {cantidad}</Typography>
                                                <Typography variant="body1">Precio total: ${precioTotalItem}</Typography>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => eliminarDelCarrito(id)}
                                                    sx={{ marginTop: 2 }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            );
                        })}
                        <Box sx={{ marginTop: 3, textAlign: 'right' }}>
                            <Typography variant="h5" sx={{ color: 'white' }}>Precio total: ${precioTotal}</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={carrito.length === 0}
                                sx={{ backgroundColor: '#4e342e', mr: 1, '&:hover': {
                                    backgroundColor: 'rgba(78, 52, 46, 0.9)',
                                  }, }}
                                onClick={realizarPedido}
                            >
                                Realizar pedido
                            </Button>
                        </Box>
                    </>
                )}
            </Box>
        </FadeInContent>
    );
};
export default Carrito;
