import { refugios } from "../../data/refugios";
import Tarjeta from "../ui/Tarjeta";
import BarraProgreso from "../ui/BarraProgreso";
import TituloSeccion from "../ui/TituloSeccion";

export default function Refugios() {
  return (
    <section className="seccion" id="refugios">
      <TituloSeccion icono="bi-house-door" texto="Refugios habilitados" />

      <div className="grilla-tarjetas">
        {refugios.map((refugio) => (
          <div key={refugio.id}>
            <Tarjeta
              icono={refugio.icono}
              titulo={refugio.titulo}
              datos={refugio.datos}
              estado={refugio.estado}
            />
            <BarraProgreso
              valor={refugio.alojados}
              maximo={refugio.capacidad}
              etiqueta="Ocupación"
            />
          </div>
        ))}
      </div>
    </section>
  );
}