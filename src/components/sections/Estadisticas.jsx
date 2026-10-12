import { useState, useEffect, useRef } from "react";
import { estadisticas } from "../../data/estadisticas";
import TituloSeccion from "../ui/TituloSeccion";
import NumeroAnimado from "../ui/NumeroAnimado";

export default function Estadisticas() {
    const seccionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observador = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        setVisible(true);
        observador.disconnect();
      }
    });

    observador.observe(seccionRef.current);

    return () => observador.disconnect();
  }, []);

  return (
    <section className="seccion" id="estadisticas" ref={seccionRef}>
      <TituloSeccion icono="bi-bar-chart" texto="Estadísticas" />

      <div className="estadisticas">
        {estadisticas.map((estadistica) => (
          <div key={estadistica.id} className="estadistica">
            <div className="estadistica-numero">
              <NumeroAnimado valor={estadistica.numero} activo={visible} />
            </div>
            <div className="estadistica-label">{estadistica.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}