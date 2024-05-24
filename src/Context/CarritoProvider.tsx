import React, { useState, ReactNode, useEffect } from 'react';
import { CarritoContext, CarritoItemType } from './CarritoContext';
import { InstrumentoProps } from "../Types/InstrumentoProps";

type CarritoProviderProps = {
  children: ReactNode;
};

export const CarritoProvider: React.FC<CarritoProviderProps> = ({ children }) => {
    const [carrito, setCarrito] = useState<CarritoItemType[]>(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
      });

  // Cargar los ítems del carrito desde LocalStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  // Guardar los ítems del carrito en LocalStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);


  const agregarAlCarrito = (item: InstrumentoProps["item"]) => {
    const itemEnCarrito = carrito.find((i) => i.id === item.id);
    if (itemEnCarrito) {
      setCarrito(carrito.map((i) => i.id === item.id ? { ...i, cantidad: i.cantidad + 1 } : i));
    } else {
      setCarrito([...carrito, { ...item, cantidad: 1 }]);
    }
  };
  const eliminarDelCarrito = (id: number) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const reducirCantidadCarrito = (id: number) => {
    const itemEnCarrito = carrito.find((i) => i.id === id);
    if (itemEnCarrito) {
      if (itemEnCarrito.cantidad > 1) {
        setCarrito(carrito.map((i) => i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i));
      } else {
        setCarrito(carrito.filter((i) => i.id !== id));
      }
    }
  };

  const obtenerCantidadEnCarrito = (id: number) => {
    const itemEnCarrito = carrito.find((i) => i.id === id);
    return itemEnCarrito ? itemEnCarrito.cantidad : 0;
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, reducirCantidadCarrito, vaciarCarrito, obtenerCantidadEnCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export type { CarritoProviderProps };