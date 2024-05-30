
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
 

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
        <Tab label="Home" component={Link} to="/" />
        <Tab label="Productos" component={Link} to="/productos" />
        <Tab label="Donde Estamos" component={Link} to="/donde-estamos" />
        <Tab label="Carrito" component={Link} to="/carrito" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexGrow: 1 }}>
          {isLoggedIn ? (
            <>
              <Typography sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', '&.MuiButton-root': { marginRight: 1 } }}>
                {username}
              </Typography>
              <Button onClick={logout} sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', '&.MuiButton-root': { marginRight: 1 } }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', '&.MuiButton-root': { marginRight: 1 } }}>
                Login
              </Button>
              <Button component={Link} to="/registro" sx={{ textTransform: 'none', color: 'inherit', minWidth: 'auto', '&.MuiButton-root': { marginRight: 1 } }}>
                Registro
              </Button>
            </>
          )}
        </Box>
      </Tabs>
    </Box>
  );
};

export default Navbar;
