import Tarjeta from "./components/ui/Tarjeta";
import TituloSeccion from "./components/ui/TituloSeccion";
import BarraProgreso from "./components/ui/BarraProgreso";

export default function App() {
  return (
    <main style={{ padding: "2.5rem" }}>
      <TituloSeccion icono="bi-exclamation-triangle-fill" texto="Prueba de componentes" />

      <div className="grilla-tarjetas">
        <Tarjeta
          icono="bi-water"
          titulo="Inundación - Barrio Norte"
          gravedad="alta"
          datos={[
            { label: "Estado", valor: "En proceso" },
            { label: "Afectados", valor: "~120 personas" },
          ]}
          estado={{ texto: "Urgente", tipo: "alerta" }}
        />

        <Tarjeta
          icono="bi-fire"
          titulo="Incendio - Zona Rural"
          gravedad="media"
          datos={[
            { label: "Estado", valor: "Monitoreo" },
            { label: "Afectados", valor: "~45 personas" },
          ]}
          estado={{ texto: "En curso", tipo: "atencion" }}
        />

        <Tarjeta
          icono="bi-building"
          titulo="Escuela N° 15"
          datos={[{ label: "Capacidad", valor: "150 personas" }]}
          estado={{ texto: "Activo", tipo: "resuelto" }}
        >
        </Tarjeta>
      </div>

      <div style={{ maxWidth: "400px", marginTop: "2rem" }}>
        <BarraProgreso valor={95} maximo={150} etiqueta="Ocupación" />
      </div>
    </main>
  );
}