import { Rutas } from "./Rutas/Rutas";
import { CarritoProvider } from "./Context/CarritoProvider";

function App() {
  return (
    <CarritoProvider>
      <Rutas/>
    </CarritoProvider>
  );
}

export default App;
