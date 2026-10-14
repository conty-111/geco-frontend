export default function Cargando({ texto = "Cargando..." }) {
  return (
    <div className="cargando-contenedor">
      <div className="spinner"></div>
      <p className="cargando-texto">{texto}</p>
    </div>
  );
}