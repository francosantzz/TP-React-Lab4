import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { InstrumentoCompleto } from "../../Components/Instrumento/InstrumentoCompleto";

export const DetalleInstrumento = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/instrumento/${id}`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'}}>Detalle del Instrumento {id}:</h2>
      {item && <InstrumentoCompleto key={item.id} item={item} />}
    </>
  );
};