import Tarjeta from "./components/ui/Tarjeta";
import TituloSeccion from "./components/ui/TituloSeccion";
import { emergencias } from "./data/emergencias";

export default function App() {
  return (
    <main style={{ padding: "2.5rem" }}>
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
    </main>
  );
}