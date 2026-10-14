import Emergencias from "../components/sections/Emergencias";
import EventosGlobales from "../components/sections/EventosGlobales";

export default function EmergenciasPage() {
  return (
    <>
      <title>Emergencias activas | GECO</title>
      <main className="contenido">
        <Emergencias />
        <EventosGlobales />
      </main>
    </>
  );
}