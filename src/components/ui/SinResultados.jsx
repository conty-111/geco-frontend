export default function SinResultados({ 
  icono = "bi-info-circle", 
  mensaje = "No hay resultados para mostrar." 
}) {
  return (
    <div className="sin-resultados-contenedor">
      <i className={`bi ${icono} sin-resultados-icono`}></i>
      <p className="sin-resultados-texto">{mensaje}</p>
    </div>
  );
}