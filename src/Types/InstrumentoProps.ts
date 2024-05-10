export interface InstrumentoProps{
    item:{
        id: number;
        instrumento: string;
        marca: string;
        modelo: string;
        imagen: string;    
        precio: string;
        costoEnvio: string;
        cantidadVendida: string;
        descripcion: string;
    }
    
}
export interface Categoria {
    id: number | null;
    denominacion: string;
}

export interface Instrumento {
    id: number;
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
    categoria: Categoria | null;
}
