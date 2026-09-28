import { useState } from "react";
import TituloSeccion from "../ui/TituloSeccion";
import Tarjeta from "../ui/Tarjeta";
import { solicitudes as solicitudesIniciales } from "../../data/solicitudes";

const TIPOS = [
  "Alimentos",
  "Agua",
  "Medicamentos",
  "Ropa / Abrigo",
  "Refugio / Alojamiento",
  "Asistencia médica",
  "Evacuación",
  "Otro",
];

const PRIORIDADES = ["Alta", "Media", "Baja"];

const FORM_VACIO = {
  tipo: "Alimentos",
  ubicacion: "",
  prioridad: "Alta",
  descripcion: "",
  contacto: "",
};

export default function Solicitudes() {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const [lista, setLista] = useState(solicitudesIniciales);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setForm({ ...form, [name]: value });
  }

  function validar() {
    const nuevosErrores = {};

    if (!form.ubicacion.trim()) nuevosErrores.ubicacion = "Indicá la ubicación";
    if (!form.descripcion.trim()) nuevosErrores.descripcion = "Describí la situación";
    if (!form.contacto.trim()) nuevosErrores.contacto = "Dejá un teléfono o email";

    return nuevosErrores;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    const nuevosErrores = validar();
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      setMensaje({ tipo: "error", texto: "Revisá los campos marcados antes de enviar." });
      return;
    }

    const nueva = {
      id: Date.now(),
      icono: "bi-life-preserver",
      titulo: `${form.tipo} - ${form.ubicacion}`,
      gravedad: form.prioridad.toLowerCase(),
      datos: [
        { label: "Prioridad", valor: form.prioridad },
        { label: "Estado", valor: "Pendiente" },
        { label: "Contacto", valor: form.contacto },
      ],
      estado: { texto: "Pendiente", tipo: "atencion" },
    };

    setLista([nueva, ...lista]);
    setForm(FORM_VACIO);
    setMensaje({ tipo: "exito", texto: "Solicitud registrada correctamente." });
  }

  return (
    <section id="solicitudes" className="seccion">
      <TituloSeccion icono="bi-life-preserver" texto="Solicitudes de asistencia" />

      <div className="solicitudes-layout">
        <form className="formulario" onSubmit={manejarEnvio} noValidate>
          <h3 className="formulario-titulo">Registrar nueva solicitud</h3>

          <label htmlFor="tipo">Tipo de solicitud</label>
          <select id="tipo" name="tipo" value={form.tipo} onChange={manejarCambio}>
            {TIPOS.map((tipo) => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>

          <label htmlFor="ubicacion">Ubicación</label>
          <input
            type="text"
            id="ubicacion"
            name="ubicacion"
            value={form.ubicacion}
            onChange={manejarCambio}
            placeholder="Barrio, calle, referencia..."
            className={errores.ubicacion ? "campo-invalido" : ""}
          />
          {errores.ubicacion && <span className="error-texto">{errores.ubicacion}</span>}

          <label htmlFor="prioridad">Prioridad</label>
          <select id="prioridad" name="prioridad" value={form.prioridad} onChange={manejarCambio}>
            {PRIORIDADES.map((prioridad) => (
              <option key={prioridad} value={prioridad}>{prioridad}</option>
            ))}
          </select>

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={manejarCambio}
            placeholder="Situación, cantidad de personas afectadas, necesidades..."
            className={errores.descripcion ? "campo-invalido" : ""}
          ></textarea>
          {errores.descripcion && <span className="error-texto">{errores.descripcion}</span>}

         <label htmlFor="contacto-solicitud">Contacto</label>
          <input
            type="text"
            id="contacto-solicitud"
            name="contacto"
            value={form.contacto}
            onChange={manejarCambio}
            placeholder="Teléfono o email"
            className={errores.contacto ? "campo-invalido" : ""}
          />
          {errores.contacto && <span className="error-texto">{errores.contacto}</span>}

          <button type="submit" className="boton-enviar">
            <i className="bi bi-send-fill"></i> Enviar solicitud
          </button>

          {mensaje && (
            <p className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>
          )}
        </form>

        <div className="solicitudes-lista">
          <h3 className="formulario-titulo">Solicitudes recientes</h3>
          <div className="grilla-tarjetas">
            {lista.map((solicitud) => (
              <Tarjeta
                key={solicitud.id}
                icono={solicitud.icono}
                titulo={solicitud.titulo}
                gravedad={solicitud.gravedad}
                datos={solicitud.datos}
                estado={solicitud.estado}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}