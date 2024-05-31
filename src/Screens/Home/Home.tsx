import { Carrusel } from "../../Components/Carrusel/Carrusel";
import { Typography, Container, Box } from "@mui/material";

const Home = () => {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Bienvenido a Musical Hendrix
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Carrusel />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
          <Typography variant="h6" component="p">
            Musical Hendrix es una tienda de instrumentos musicales con más de 15 años de
            experiencia. Tenemos el conocimiento y la capacidad para informarte acerca de las
            mejores elecciones para tu compra musical.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Home;
