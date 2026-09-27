import { emergencias } from "../../data/emergencias";
import Tarjeta from "../ui/Tarjeta";

export default function Emergencias() {
  return (
    <div className="row g-3">
      {emergencias.map((emergencia) => (
        <Tarjeta
          key={emergencia.id}
          icono={emergencia.icono}
          titulo={emergencia.titulo}
          datos={[
            { label: "Fecha", valor: emergencia.fecha },
            { label: "Afectados", valor: emergencia.afectados }
          ]}
          estado={{ texto: emergencia.estado, tipo: emergencia.gravedad }}
          gravedad={emergencia.gravedad}
        />
      ))}
    </div>
  );
}