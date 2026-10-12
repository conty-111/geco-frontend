import Hero from "../components/sections/Hero";
import Estadisticas from "../components/sections/Estadisticas";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="contenido">
        <Estadisticas />
      </main>
    </>
  );
}