import { emergencias } from "../../data/emergencias";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";

export default function Emergencias() {
  return (
    <section className="seccion">
      <TituloSeccion icono="bi-exclamation-triangle-fill" texto="Emergencias activas" />

      <div className="grilla-tarjetas">
        {emergencias.map((emergencia) => (
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