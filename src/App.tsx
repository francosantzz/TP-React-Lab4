import { Rutas } from "./Rutas/Rutas";
import { CarritoProvider } from "./Context/CarritoProvider";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
    <CarritoProvider>
      <Rutas/>
    </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
