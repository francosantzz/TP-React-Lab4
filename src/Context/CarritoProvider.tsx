import React, { useState, useEffect, ReactNode } from 'react';
import { InstrumentoProps } from '../Types/InstrumentoProps';
import { CarritoItemType, CarritoContext } from './CarritoContext';
import { useAuth } from './AuthContext';

type CarritoProviderProps = {
  children: ReactNode;
};

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const { username } = useAuth();
  const [carrito, setCarrito] = useState<CarritoItemType[]>([]);

  useEffect(() => {
    const storedCarrito = localStorage.getItem(`carrito_${username}`);
    if (storedCarrito) {
      setCarrito(JSON.parse(storedCarrito));
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`carrito_${username}`, JSON.stringify(carrito));
    }
  }, [carrito, username]);


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