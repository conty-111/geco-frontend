export default function Etiqueta({ texto, tipo = "info" }) {
  return <span className={`etiqueta etiqueta-${tipo}`}>{texto}</span>;
}