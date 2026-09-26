import Etiqueta from "./Etiqueta";

export default function Tarjeta({ icono, titulo, datos = [], estado, gravedad }) {
  return (
    <article className={`tarjeta ${gravedad ? `tarjeta-${gravedad}` : ""}`}>
      {icono && <i className={`bi ${icono} tarjeta-icono`}></i>}
      <h3 className="tarjeta-titulo">{titulo}</h3>

      {datos.map((dato) => (
        <p key={dato.label} className="tarjeta-dato">
          <strong>{dato.label}:</strong> {dato.valor}
        </p>
      ))}

      {estado && <Etiqueta texto={estado.texto} tipo={estado.tipo} />}
    </article>
  );
}