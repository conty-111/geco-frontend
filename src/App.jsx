import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Solicitudes from "./components/sections/Solicitudes";
import Footer from "./components/layout/Footer";
import Tarjeta from "./components/ui/Tarjeta";
import TituloSeccion from "./components/ui/TituloSeccion";
import { emergencias } from "./data/emergencias";
import Contacto from "./components/sections/Contacto";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />


      <main className="contenido">
        <section className="seccion">
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
        </section>

        <Solicitudes />
        <Contacto />
      </main>

      <Footer />
    </>
  );
}