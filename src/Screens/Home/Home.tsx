import { Carrusel } from "../../Components/Carrusel/Carrusel"

const Home = () => {
  return (
    <>
        <h1 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>Musical Hendrix</h1>
        <Carrusel/>
        <p style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>
          Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
          experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
          mejores elecciones para tu compra musical.
        </p>
    </>
  )
}
export default Home;