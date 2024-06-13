import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { useAuth, role } from '../Context/AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Home = lazy(() => import('../Screens/Home/Home'));
const DondeEstamos = lazy(() => import('../Screens/DondeEstamos/DondeEstamos'));
const Productos = lazy(() => import('../Screens/Productos/Productos'));
const DetalleInstrumento = lazy(() => import('../Screens/DetalleInstrumento/DetalleInstrumento'));
const Carrito = lazy(() => import('../Screens/Carrito'));
const Charts = lazy(() => import('../Screens/Charts'));
const Grilla = lazy(()=> import('../Screens/Grilla'));
const Login = lazy(() => import('../Screens/User/Login'));
const Registro = lazy(() => import('../Screens/User/Registro'));

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, role } = useAuth();
  return isLoggedIn && role == "Admin" ? children : <Navigate to="/" />;
};

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export const Rutas = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <div style={ {backgroundColor: '#f5f5dc', minHeight: '100vh' } } >
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donde-estamos" element={<DondeEstamos />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
            <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
            <Route path="/charts" element={<AdminRoute><Charts /></AdminRoute>} />
            <Route path="/grilla" element={<AdminRoute><Grilla /></AdminRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  </ThemeProvider>
);

export default Rutas;