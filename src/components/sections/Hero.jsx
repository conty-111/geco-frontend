export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-contenido">
        <p className="hero-etiqueta">Sistema de coordinación</p>

        <h1 className="hero-titulo">
          Gestión de Emergencias Comunitarias
        </h1>

        <p className="hero-texto">
          Centralizá la información, coordiná recursos y organizá la asistencia
          en situaciones de emergencia: inundaciones, incendios, evacuaciones y temporales.
        </p>

        <div className="hero-estado">
          <span className="hero-estado-item">
            <i className="bi bi-exclamation-triangle-fill"></i>
            3 emergencias activas
          </span>
          <span className="hero-estado-separador">·</span>
          <span className="hero-estado-item">
            <i className="bi bi-geo-alt-fill"></i>
            4 zonas afectadas
          </span>
          <span className="hero-estado-separador">·</span>
          <span className="hero-estado-item">
            <i className="bi bi-people-fill"></i>
            12 voluntarios en terreno
          </span>
        </div>
      </div>
    </section>
  );
}