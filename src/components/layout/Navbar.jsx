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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const destino = document.querySelector(href);
        if (!destino) return;

        const navbar = document.querySelector(".navbar-geco");
        const alturaNavbar = navbar ? navbar.offsetHeight : 0;
        const posicion =
          destino.getBoundingClientRect().top + window.scrollY - alturaNavbar - 16;

        window.scrollTo({ top: posicion, behavior: "smooth" });
      });
    });
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