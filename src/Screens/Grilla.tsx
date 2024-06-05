// src/screens/Grilla/Grilla.tsx
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Box, Select, MenuItem, FormControl, InputLabel, Modal, SelectChangeEvent, AppBar, Toolbar, Typography } from '@mui/material';
import { Categoria, InstrumentoNoItem } from '../Types/InstrumentoProps';
import { ModalInstrumento } from '../Components/ModalInstrumento';
import { getData, deleteData } from '../api/genericCalls';
import { useAuth } from '../Context/AuthContext';

const Grilla = () => {
  const [instrumentos, setInstrumentos] = useState<InstrumentoNoItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedInstrumento, setSelectedInstrumento] = useState<InstrumentoNoItem | undefined>(undefined);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todos');
  const { role } = useAuth();

  useEffect(() => {
    async function getDataCategorias() {
      const categoriaData = await getData<Categoria[]>('http://localhost:8080/categoria');
      setCategorias(categoriaData);
    }
    getDataCategorias();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData<InstrumentoNoItem[]>('http://localhost:8080/instrumento');
        setInstrumentos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedInstrumento(undefined);
    // Refetch the instrumentos after closing the modal
    const fetchData = async () => {
      const data = await getData<InstrumentoNoItem[]>('http://localhost:8080/instrumento');
      setInstrumentos(data);
    };
    fetchData();
  };

  const handleNew = () => {
    setSelectedInstrumento(undefined);
    handleOpen();
  };

  const handleSelection = (instrumento: InstrumentoNoItem) => {
    setSelectedInstrumento(instrumento);
    handleOpen();
  };

  const handleDelete = async (id: number) => {
    await deleteData(`http://localhost:8080/instrumento/${id}`);
    // Refetch the instrumentos after deleting
    const data = await getData<InstrumentoNoItem[]>('http://localhost:8080/instrumento');
    setInstrumentos(data);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'instrumento', headerName: 'Instrumento', width: 440 },
    { field: 'marca', headerName: 'Marca', width: 130 },
    { field: 'modelo', headerName: 'Modelo', width: 130 },
    { field: 'precio', headerName: 'Precio', width: 100 },
    { field: 'costoEnvio', headerName: 'Costo Envío', width: 100 },
    { field: 'cantidadVendida', headerName: 'Cantidad Vendida', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      sortable: false,
      width: 190,
      renderCell: (params) => (
        <div>
            
          <Button sx={{
            mr: 1,
            ml: '2%',
            backgroundColor: '#4e342e',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(78, 52, 46, 0.9)',
            },
            '&.Mui-disabled': {
                backgroundColor: '#4e342e',
                color: 'white',
                opacity: 0.5, // Ajusta la opacidad para que se vea deshabilitado pero conserven los colores
              },
          }} onClick={() => handleSelection(params.row)}
          disabled={role !== 'Admin'}
          >Editar</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(params.row.id)}
          sx={{
          '&.Mui-disabled': {
            backgroundColor: 'red',
            color: 'white',
            opacity: 0.5, // Ajusta la opacidad para que se vea deshabilitado pero conserven los colores
          },}}
          disabled={role !== 'Admin'}
          >Eliminar</Button>
        </div>
      )
    }
  ];

  return (
    <Box>
      
      {role === 'Admin' && (
        <Button
          sx={{
            mr: 1,
            ml: 2,
            backgroundColor: '#4e342e',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(78, 52, 46, 0.9)',
            },
          }}
          onClick={handleNew}
        >
          Crear Nuevo Instrumento
        </Button>
      )}
      <Select
        value={selectedCategoria}
        onChange={(event: SelectChangeEvent) => {
          setSelectedCategoria(event.target.value);
        }}
        sx={{ mt: 2, ml: 2 }}
      >
        <MenuItem value="todos">
          Todos
        </MenuItem>
        {categorias.map((categoria: Categoria) => (
          <MenuItem key={categoria.id?.toString() ?? ""} value={categoria.id?.toString() ?? ""}>
            {categoria.denominacion}
          </MenuItem>
        ))}
      </Select>

      <DataGrid
        sx={{ height: 450, mt: 1, ml: 2, mr: 2 }}
        rows={instrumentos.filter((item) => selectedCategoria === "todos" || item.categoria?.id?.toString() === selectedCategoria)}
        columns={columns}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
          }}
        >
          <ModalInstrumento
            existingInstrumento={selectedInstrumento}
            onClose={handleClose}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Grilla;
