export default function Icono({ nombre, className = "" }) {
  if (!nombre) return null;
  return <i className={`bi ${nombre} ${className}`}></i>;
}