import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Card, CardContent, CardMedia, Grid, Snackbar, Typography, IconButton, Button } from '@mui/material';
import React, { useContext, useState } from 'react';
import { CarritoContext } from '../../Context/CarritoContext';
import { Add, Remove } from '@mui/icons-material';
import { useAuth } from "../../Context/AuthContext";

export const InstrumentoCompleto: React.FC<InstrumentoProps> = ({ item }) => {
  const { agregarAlCarrito, reducirCantidadCarrito, obtenerCantidadEnCarrito } = useContext(CarritoContext);
  const { isLoggedIn } = useAuth();

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddToCart = () => {
    console.log("hola");
    agregarAlCarrito(item);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleGeneratePdf = () => {
    fetch(`http://localhost:8080/instrumento/${item.id}/pdf`)
      .then(response => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${item.instrumento}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.error('Error generating PDF:', error));
  };

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={7} sx={{ marginLeft: '5%', mb: '2%' }}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              sx={{ width: 500, flexShrink: 0, marginLeft: '15%' }}
              image={`${item.imagen}`}
              alt={item.instrumento}
            />
            <CardContent>
              <Typography variant="body1" color="text.primary" fontFamily={"Segoe UI"}>
                <p>Descripción:</p>
                {item.descripcion}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card variant="outlined">
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="caption" color="text.secondary">
                    {item.cantidadVendida} vendidos
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" color="text.primary" fontFamily={"Segoe UI"}>
                    {item.instrumento}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginBottom: '5%', marginTop: '5%' }}>
                  <Typography variant="h3" color="text.primary" fontFamily={"sans-serif"}>
                    $ {item.precio}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="text.primary" fontFamily={"Segoe UI"}>
                    Marca: {item.marca}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography color="text.primary" fontFamily={"Segoe UI"}>
                    Modelo: {item.modelo}
                  </Typography>
                </Grid>
                {item.costoEnvio !== 'G' && (
                  <Grid item xs={12} sx={{ marginTop: '10%', marginBottom: '20%' }}>
                    <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                      Costo Envio:
                    </Typography>
                    <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }} fontFamily={"sans-serif"}>
                      ${item.costoEnvio}
                    </Typography>
                  </Grid>
                )}
                {item.costoEnvio === 'G' && (
                  <Grid item xs={12} sx={{ marginTop: '10%', marginBottom: '20%' }}>
                    <Typography variant="body2" color="text.primary" fontFamily={"sans-serif"}>
                      Costo Envio:
                    </Typography>
                    <Typography variant="body2" color="#39B54A" fontFamily={"sans-serif"}>
                      <img src="/img/camion.png" alt="Imagen" style={{ marginRight: '8px', height: '24px' }} />
                      Envio gratis
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <IconButton
                    color="inherit"
                    onClick={() => reducirCantidadCarrito(item.id)}
                    disabled={!isLoggedIn}
                  >
                    <Remove />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="body1">
                    {obtenerCantidadEnCarrito(item.id)}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    color="inherit"
                    onClick={handleAddToCart}
                    disabled={!isLoggedIn}
                  >
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid container spacing={2} alignItems="center" sx={{ marginTop: '10%' }}>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={handleGeneratePdf}
                    disabled={!isLoggedIn}
                    sx={{ backgroundColor: '#4e342e', mr: 1, '&:hover': {
                      backgroundColor: 'rgba(78, 52, 46, 0.9)',
                    }, }}
                  >
                    Guardar como PDF
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Artículo agregado al carrito"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
};
