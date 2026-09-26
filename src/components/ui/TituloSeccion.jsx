export default function TituloSeccion({ icono, texto }) {
  return (
    <h2 className="titulo-seccion">
      <i className={`bi ${icono}`}></i> {texto}
    </h2>
  );
}