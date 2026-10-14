import { useState, useEffect } from "react";
import { obtenerEventos } from "../../services/eonetApi";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";
import Cargando from "../ui/Cargando";
import SinResultados from "../ui/SinResultados";

export default function EventosGlobales() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function traerDatos() {
      try {
        const datos = await obtenerEventos(12);
        setEventos(datos);
      } catch (error) {
        setEventos([]);
      } finally {
        setCargando(false);
      }
    }

    traerDatos();
  }, []);

  return (
    <section className="seccion" id="eventos-globales">
      <TituloSeccion icono="bi-globe" texto="Eventos globales" />

            {cargando ? (
        <Cargando texto="Cargando eventos..." />
      ) : eventos.length === 0 ? (
        <SinResultados
          icono="bi-globe"
          mensaje="No hay eventos para mostrar en este momento."
        />
      ) : (
        <div className="grilla-tarjetas">
          {eventos.map((evento) => (
            <Tarjeta
              key={evento.id}
              icono={evento.icono}
              titulo={evento.titulo}
              datos={evento.datos}
              estado={evento.estado}
              gravedad={evento.gravedad}
            />
          ))}
        </div>
      )}
    </section>
  );
}