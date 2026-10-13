import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const ENLACES = [
   { to: "/emergencias", texto: "Emergencias" },
  { to: "/recursos", texto: "Recursos" },
  { to: "/refugios", texto: "Refugios" },
  { to: "/voluntarios", texto: "Voluntarios" },
  { to: "/solicitudes", texto: "Solicitudes" },
];

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="navbar-geco">
      <div className="navbar-contenido">
        <Link to="/" className="navbar-logo" onClick={() => setAbierto(false)}>
          <i className="bi bi-shield-exclamation"></i>
          <span>GECO</span>
        </Link>

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
                <li key={enlace.to}>
                <NavLink to={enlace.to} onClick={() => setAbierto(false)}>
                  {enlace.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}