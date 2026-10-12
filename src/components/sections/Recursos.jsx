import { recursos } from "../../data/recursos";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";
import { useState } from "react";

export default function Recursos() {
  const [busqueda, setBusqueda] = useState("");

  const recursosFiltrados = recursos.filter((recurso) =>
    recurso.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="seccion" id="recursos">
      <TituloSeccion icono="bi-box-seam" texto="Recursos disponibles" />

      <div className="grilla-tarjetas">
        {recursosFiltrados.map((recurso) => (
          <Tarjeta
            key={recurso.id}
            icono={recurso.icono}
            titulo={recurso.titulo}
            datos={recurso.datos}
            estado={recurso.estado}
          />
        ))}
      </div>
    </section>
  );
}