import { recursos } from "../../data/recursos";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function Recursos() {
  const [busqueda, setBusqueda] = useState("");

  const recursosFiltrados = recursos.filter((recurso) =>
    recurso.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="seccion" id="recursos">
      <TituloSeccion icono="bi-box-seam" texto="Recursos disponibles" />

      <Form.Control
        type="text"
        placeholder="Buscar un recurso..."
        className="mb-3"
        data-bs-theme="dark"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

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