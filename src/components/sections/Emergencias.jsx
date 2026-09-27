import { useState } from "react";
import { emergencias } from "../../data/emergencias";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";

export default function Emergencias() {
  const [filtro, setFiltro] = useState("todas");

  const emergenciasFiltradas = emergencias.filter((emergencia) => {
    if (filtro === "todas") return true;
    return emergencia.gravedad === filtro;
  });

  return (
    <section className="seccion">
      <TituloSeccion icono="bi-exclamation-triangle-fill" texto="Emergencias activas" />

      {/* Botones de filtro */}
      <div className="filtros-emergencias">
  <button
    className={`filtro filtro-todas ${filtro === "todas" ? "activo" : ""}`}
    onClick={() => setFiltro("todas")}
  >
    Todas
  </button>
  <button
    className={`filtro filtro-alta ${filtro === "alta" ? "activo" : ""}`}
    onClick={() => setFiltro("alta")}
  >
    Alta
  </button>
  <button
    className={`filtro filtro-media ${filtro === "media" ? "activo" : ""}`}
    onClick={() => setFiltro("media")}
  >
    Media
  </button>
  <button
    className={`filtro filtro-baja ${filtro === "baja" ? "activo" : ""}`}
    onClick={() => setFiltro("baja")}
  >
    Baja
  </button>
</div>

      {/* Tarjetas filtradas */}
      <div className="grilla-tarjetas">
        {emergenciasFiltradas.map((emergencia) => (
          <Tarjeta
            key={emergencia.id}
            icono={emergencia.icono}
            titulo={emergencia.titulo}
            gravedad={emergencia.gravedad}
            datos={emergencia.datos}
            estado={emergencia.estado}
          />
        ))}
      </div>
    </section>
  );
}