/*
   SERVICIO — API de eventos naturales (NASA EONET)
   Hace la petición con Axios, adapta la respuesta al formato
   que espera el componente Tarjeta y avisa al usuario con
   SweetAlert2 si algo falla.
 */

import axios from "axios";
import Swal from "sweetalert2";
import { obtenerCategoria } from "../data/categorias";

/* La URL nunca se escribe dentro de los componentes:
   sale de la variable de entorno definida en el archivo .env */
const API_URL = import.meta.env.VITE_API_URL;

/* 
   Adapta un evento de la API al formato que espera Tarjeta
   */
function adaptarEvento(evento) {
  const categoria = obtenerCategoria(evento.categories?.[0]?.id);

  /* La API devuelve un historial de posiciones:
     tomamos la última, que es la más reciente */
  const geometria = evento.geometry?.[evento.geometry.length - 1];

  const datos = [{ label: "Categoría", valor: categoria.nombre }];

  if (geometria?.date) {
    datos.push({
      label: "Fecha",
      valor: new Date(geometria.date).toLocaleDateString("es-AR"),
    });
  }

  if (geometria?.magnitudeValue) {
    datos.push({
      label: "Magnitud",
      valor: `${geometria.magnitudeValue} ${geometria.magnitudeUnit ?? ""}`.trim(),
    });
  }

  return {
    id: evento.id,
    icono: categoria.icono,
    titulo: evento.title,
    gravedad: categoria.gravedad,
    datos,
    estado: { texto: "Activo", tipo: categoria.tipo },
  };
}

/*
   Trae los eventos naturales activos.
   Devuelve un array listo para recorrer con .map()
    */
export async function obtenerEventos(limite = 12) {
  try {
    if (!API_URL) {
      throw new Error("Falta la variable VITE_API_URL en el archivo .env");
    }

    const respuesta = await axios.get(API_URL, {
      params: { status: "open", limit: limite },
      timeout: 10000,
    });

    const eventos = respuesta.data?.events ?? [];
    return eventos.map(adaptarEvento);
  } catch (error) {
    console.error("Error al consultar la API de EONET:", error);

    await Swal.fire({
      icon: "error",
      title: "No se pudieron cargar los eventos",
      text: "Hubo un problema al consultar la API. Revisá tu conexión e intentá de nuevo.",
      confirmButtonText: "Entendido",
      background: "#151B23",
      color: "#E6EDF3",
      confirmButtonColor: "#EF4444",
    });

    /* Se relanza el error para que el componente sepa que falló
       y pueda cortar el estado de carga */
    throw error;
  }
}