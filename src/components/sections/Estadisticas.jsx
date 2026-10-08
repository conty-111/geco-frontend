import { estadisticas } from "../../data/estadisticas";
import TituloSeccion from "../ui/TituloSeccion";

export default function Estadisticas() {
  return (
    <section className="seccion" id="estadisticas">
      <TituloSeccion icono="bi-bar-chart" texto="Estadísticas" />

      <div className="estadisticas">
        {estadisticas.map((estadistica) => (
          <div key={estadistica.id} className="estadistica">
            <div className="estadistica-numero">{estadistica.numero}</div>
            <div className="estadistica-label">{estadistica.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}