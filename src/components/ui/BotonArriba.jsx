import { useState, useEffect } from "react";

export default function BotonArriba() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const manejarScroll = () => {
      // Si el usuario bajó más de 400px, mostramos el botón
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  const volverArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button className="boton-arriba" onClick={volverArriba} aria-label="Volver arriba">
      <i className="bi bi-arrow-up"></i>
    </button>
  );
}