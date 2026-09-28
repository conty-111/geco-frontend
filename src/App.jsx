import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Emergencias from "./components/sections/Emergencias";
import Recursos from "./components/sections/Recursos";
import Voluntarios from "./components/sections/Voluntarios";
import Solicitudes from "./components/sections/Solicitudes";
import Contacto from "./components/sections/Contacto";
import Footer from "./components/layout/Footer";
import BotonArriba from "./components/ui/BotonArriba";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className="contenido">
        <Emergencias />
        <Recursos />
        <Voluntarios />
        <Solicitudes />
        <Contacto />
      </main>

      <Footer />
      <BotonArriba />
    </>
  );
}