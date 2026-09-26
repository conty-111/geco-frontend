const enlaces = [
  { href: "#emergencias", texto: "Emergencias" },
  { href: "#recursos", texto: "Recursos" },
  { href: "#refugios", texto: "Refugios" },
  { href: "#voluntarios", texto: "Voluntarios" },
  { href: "#solicitudes", texto: "Solicitudes" },
  { href: "#estadisticas", texto: "Estadísticas" },
  { href: "#contacto", texto: "Contacto" },
];

export default function Navbar() {
  return (
    <header className="navbar-geco">
      <div className="navbar-contenido">
        <a href="#inicio" className="navbar-logo">
          <i className="bi bi-shield-exclamation"></i>
          <span>GECO</span>
        </a>

        <nav>
          <ul className="navbar-enlaces">
            {enlaces.map((enlace) => (
              <li key={enlace.href}>
                <a href={enlace.href}>{enlace.texto}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}