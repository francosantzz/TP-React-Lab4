import { Link } from 'react-router-dom';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const Navbar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Home" component={Link} to="/" />
          <Tab label="Productos" component={Link} to="/productos" />
          <Tab label="Donde Estamos" component={Link} to="/donde-estamos" />
          <Tab label="Carrito" component={Link} to="/carrito" />
        </Tabs>
      </Box>
    </>
  );
};

export default Navbar;
