export default function BarraProgreso({ valor, maximo, etiqueta }) {
  const porcentaje = Math.round((valor / maximo) * 100);

  return (
    <div className="barra-progreso">
      <div className="barra-progreso-info">
        <span>{etiqueta}</span>
        <span>{valor} / {maximo}</span>
      </div>
      <div className="barra-progreso-fondo">
        <div
          className="barra-progreso-relleno"
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
    </div>
  );
}