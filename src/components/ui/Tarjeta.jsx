import Etiqueta from "./Etiqueta";
import Icono from "./Icono"; //

export default function Tarjeta({ icono, titulo, datos = [], estado, gravedad }) {
  return (
    <article className={`tarjeta ${gravedad ? `tarjeta-${gravedad}` : ""}`}>
      <Icono nombre={icono} className="tarjeta-icono" />
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