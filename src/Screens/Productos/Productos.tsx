import { useEffect, useState } from "react";
import { InstrumentoCard } from "../../Components/Instrumento/Instrumento";
import { Box, Button, Card, Modal, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React from "react";
import { ModalInstrumento } from "../../Components/ModalInstrumento";
import { Categoria, InstrumentoNoItem } from "../../Types/InstrumentoProps";
import { deleteData, getData } from "../../api/genericCalls";
import { useAuth } from "../../Context/AuthContext";
import FadeInContent from "../FadeInContent";

const Productos: React.FC = () => {
  const [data, setData] = useState<InstrumentoNoItem[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedInstrumento, setselectedInstrumento] = useState<InstrumentoNoItem | undefined>(undefined);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [selectedCategoria, setSelectedCategoria] = useState<string>("todos");
  const { role } = useAuth();

  useEffect(() => {
    async function getDataCategorias() {
      await getData<Categoria[]>("http://localhost:8080/categoria")
        .then((categoriaData) => {
          setCategorias(categoriaData);
        });
    }
    getDataCategorias();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNew = () => {
    setselectedInstrumento(undefined);
  };

  const handleSelection = (instrumento: InstrumentoNoItem) => {
    setselectedInstrumento(instrumento);
  };

  const handleDelete = async (instrumento: InstrumentoNoItem) => {
    await deleteData("http://localhost:8080/instrumento/" + instrumento.id);
    handleClose();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/instrumento');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <FadeInContent>
      <>
      {role === 'Admin' && (
        <Button
          sx={{
            mr: 1,
            ml: '2%',
            backgroundColor: '#4e342e',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(78, 52, 46, 0.9)',
            },
          }}
          onClick={() => {
            handleNew();
            handleOpen();
          }}
        >
          Crear Nuevo Instrumento
        </Button>
      )}
      <Select
        value={selectedCategoria}
        onChange={(event: SelectChangeEvent) => {
          setSelectedCategoria(event.target.value);
        }}
        sx={{ mt: 2, ml: 1 }}
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


        {data.filter((item: InstrumentoNoItem) => selectedCategoria === "todos" || item.categoria?.id?.toString() === selectedCategoria).map((item: InstrumentoNoItem) => (
          
          <InstrumentoCard 
            key={item.id} 
           item={item} 
           role={role} 
           onEdit={() => {
             handleSelection(item);
             handleOpen();
           }} 
           onDelete={() => {
             handleDelete(item);
            }}
            sx={{ mt: 2, ml: 1 }}
          />
         
        ))}

        {/* Renderiza el modal si está abierto */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              width: "50%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
            }}
          >
            <ModalInstrumento
              existingInstrumento={selectedInstrumento ? selectedInstrumento : undefined}
              onClose={handleClose}
            />
          </Box>
        </Modal>
      </>
    </FadeInContent>
  );
};

export default Productos;
