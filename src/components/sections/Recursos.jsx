import { recursos } from "../../data/recursos";
import Tarjeta from "../ui/Tarjeta";
import TituloSeccion from "../ui/TituloSeccion";

export default function Recursos() {
  return (
    <section className="seccion" id="recursos">
      <TituloSeccion icono="bi-box-seam" texto="Recursos disponibles" />

      <div className="grilla-tarjetas">
        {recursos.map((recurso) => (
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