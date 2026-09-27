import { voluntarios } from "../../data/voluntarios";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";

export default function Voluntarios() {
  return (
    <section className="seccion">
      <TituloSeccion icono="bi-people-fill" texto="Voluntarios" />
      <div className="row g-3">
        {voluntarios.map((voluntario) => (
          <Tarjeta
            key={voluntario.id}
            icono={voluntario.icono}
            titulo={voluntario.titulo}
            datos={voluntario.datos}
            estado={voluntario.estado}
          />
        ))}
      </div>
    </section>
  );
}