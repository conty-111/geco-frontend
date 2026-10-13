import Hero from "../components/sections/Hero";
import Estadisticas from "../components/sections/Estadisticas";
import Contacto from "../components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="contenido">
        <Estadisticas />
        <Contacto />
      </main>
    </>
  );
}