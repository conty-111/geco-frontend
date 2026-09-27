import { useState } from "react";

const ENLACES = [
  { href: "#emergencias", texto: "Emergencias" },
  { href: "#recursos", texto: "Recursos" },
  { href: "#refugios", texto: "Refugios" },
  { href: "#voluntarios", texto: "Voluntarios" },
  { href: "#solicitudes", texto: "Solicitudes" },
  { href: "#estadisticas", texto: "Estadisticas" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  function irASeccion(evento, href) {
    evento.preventDefault();
    setAbierto(false);

    setTimeout(() => {
      const destino = document.querySelector(href);
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }

  return (
    <header className="navbar-geco">
      <div className="navbar-contenido">
        <a href="#inicio" className="navbar-logo">
          <i className="bi bi-shield-exclamation"></i>
          <span>GECO</span>
        </a>

        <button
          className="navbar-boton"
          onClick={() => setAbierto(!abierto)}
          aria-label="Abrir menu de navegacion"
          aria-expanded={abierto}
        >
          <i className={`bi ${abierto ? "bi-x-lg" : "bi-list"}`}></i>
        </button>

        <nav className={`navbar-nav ${abierto ? "abierto" : ""}`}>
          <ul className="navbar-enlaces">
            {ENLACES.map((enlace) => (
                <li key={enlace.href}>
                <a href={enlace.href} onClick={(evento) => irASeccion(evento, enlace.href)}>
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}