import * as React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4e342e' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/musica.png" alt="Musical Hendrix" style={{ width: 30, height: 30, marginRight: 16 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
            Musical Hendrix
          </Typography>
        </Box>
        <Tabs 
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'white', // Cambia el color de la línea indicadora aquí
            },
          }}
          sx={{
            '& .MuiTab-root': {
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
              '&:hover': {
                color: 'black',
              },
            },
          }}>
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Productos" component={Link} to="/productos" />
          <Tab label="Donde Estamos" component={Link} to="/donde-estamos" />
          <Tab label="Carrito" component={Link} to="/carrito" />
        </Tabs>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', ml: 3 }}>
          {isLoggedIn ? (
            <>
              <Typography sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', marginRight: 2 }}>
                {username}
              </Typography>
              <Button onClick={logout} sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto' }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', marginRight: 2 }}>
                Login
              </Button>
              <Button component={Link} to="/registro" sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto' }}>
                Registro
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
