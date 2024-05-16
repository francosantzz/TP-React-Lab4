// CarritoContext.tsx
import React from 'react';
import { InstrumentoProps } from "../Types/InstrumentoProps";

export type CarritoItemType = InstrumentoProps["item"] & { cantidad: number };

type CarritoContextType = {
  carrito: CarritoItemType[];
  agregarAlCarrito: (item: InstrumentoProps["item"]) => void;
  eliminarDelCarrito: (id: number) => void;
};

export const CarritoContext = React.createContext<CarritoContextType>({
  carrito: [],
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
});