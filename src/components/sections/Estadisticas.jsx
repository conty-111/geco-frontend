import { estadisticas } from "../../data/estadisticas";
import TituloSeccion from "../ui/TituloSeccion";
import NumeroAnimado from "../ui/NumeroAnimado";

export default function Estadisticas() {
  return (
    <section className="seccion" id="estadisticas">
      <TituloSeccion icono="bi-bar-chart" texto="Estadísticas" />

      <div className="estadisticas">
        {estadisticas.map((estadistica) => (
          <div key={estadistica.id} className="estadistica">
            <div className="estadistica-numero">
              <NumeroAnimado valor={estadistica.numero} />
            </div>
            <div className="estadistica-label">{estadistica.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}