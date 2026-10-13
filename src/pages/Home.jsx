import Hero from "../components/sections/Hero";
import Estadisticas from "../components/sections/Estadisticas";

export default function Home() {
  return (
    <>
      <title>GECO | Gestion de Emergencias Comunitarias</title>
      <Hero />
      <main className="contenido">
        <Estadisticas />
      </main>
    </>
  );
}