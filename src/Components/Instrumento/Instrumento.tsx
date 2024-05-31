import * as React from 'react';
import { InstrumentoProps } from "../../Types/InstrumentoProps";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface InstrumentoCardProps extends InstrumentoProps {
  role: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const InstrumentoCard: React.FC<InstrumentoCardProps> = ({ item, role, onEdit, onDelete }) => (
  <Card variant="outlined" sx={{ margin: "2%", boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 350, flexShrink: 0, objectFit: 'cover' }}
        image={`${item.imagen}`}
        alt={item.instrumento}
      />
      <CardContent sx={{ flex: '1 0' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.primary" fontFamily={"Roboto"} fontSize={"17px"} maxWidth={"50vw"}>
              <h2>{item.instrumento}</h2>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.primary" fontFamily={"Roboto"} fontSize={"25px"}>
              <h4>$ {item.precio}</h4>
            </Typography>
          </Grid>
          {item.costoEnvio !== 'G' && (
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="#D6913A" style={{ marginRight: '8px' }} fontSize={"20px"}>
                  Costo de Envio Interior de Argentina: ${item.costoEnvio}
                </Typography>
              </div>
            </Grid>
          )}
          {item.costoEnvio === 'G' && (
            <Grid item xs={12}>
              <Typography variant="body2" color="#39B54A" fontSize={"20px"}>
                <img src="/img/camion.png" alt="Imagen" style={{ marginRight: '8px', height: '24px' }} />
                Envio gratis a todo el país
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Typography variant="body2" color="text.primary" fontFamily={"Roboto"} fontSize={"15px"}>
              <p>{item.cantidadVendida} vendidos</p>
            </Typography>
          </Grid>
        </Grid>
        <CardActions>
          <Link to={`/instrumento/${item.id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="small" sx={{ backgroundColor: '#4e342e', '&:hover': {
              backgroundColor: 'rgba(78, 52, 46, 0.9)',
            }, }}>
              Ver Detalle
            </Button>
          </Link>
        </CardActions>
      </CardContent>
    </Box>
    {role === 'Admin' && (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Button 
          onClick={onEdit}
          variant="contained"
          sx={{ backgroundColor: '#4e342e', mr: 1, '&:hover': {
            backgroundColor: 'rgba(78, 52, 46, 0.9)',
          }, }}
        >
          Editar
        </Button>
        <Button 
          onClick={onDelete}
          variant="contained"
          color="error"
        >
          Eliminar
        </Button>
      </Box>
    )}
  </Card>
);
