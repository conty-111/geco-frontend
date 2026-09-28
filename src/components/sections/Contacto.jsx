/* ============================================================
   CONTACTO — Datos de la organización y formulario de consulta
   Usa useState para el formulario y su validación.
   ============================================================ */

import { useState } from "react";
import TituloSeccion from "../ui/TituloSeccion";

const FORM_VACIO = {
  nombre: "",
  email: "",
  mensaje: "",
};

const DATOS = [
  { icono: "bi-telephone-fill", label: "Teléfono de emergencia", valor: "0800-333-1234" },
  { icono: "bi-envelope-fill", label: "Email", valor: "emergencias@geco.org" },
  { icono: "bi-geo-alt-fill", label: "Dirección", valor: "Av. Principal 123, Centro" },
  { icono: "bi-clock-fill", label: "Atención", valor: "24 horas, todos los días" },
];

export default function Contacto() {
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setForm({ ...form, [name]: value });
  }

  function validar() {
    const nuevosErrores = {};

    if (!form.nombre.trim()) nuevosErrores.nombre = "Indicá tu nombre";

    if (!form.email.trim()) {
      nuevosErrores.email = "Dejá un email de contacto";
    } else if (!form.email.includes("@")) {
      nuevosErrores.email = "El email no parece válido";
    }

    if (!form.mensaje.trim()) nuevosErrores.mensaje = "Escribí tu consulta";

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

    setForm(FORM_VACIO);
    setMensaje({ tipo: "exito", texto: "Consulta enviada. Te vamos a responder a la brevedad." });
  }

  return (
    <section id="contacto" className="seccion">
      <TituloSeccion icono="bi-envelope-fill" texto="Contacto" />

      <div className="contacto-layout">
        {/* Columna izquierda: datos de la organización */}
        <div className="contacto-datos">
          <ul className="contacto-lista">
            {DATOS.map((dato) => (
              <li key={dato.label} className="contacto-item">
                <i className={`bi ${dato.icono}`}></i>
                <div>
                  <span className="contacto-label">{dato.label}</span>
                  <span className="contacto-valor">{dato.valor}</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="contacto-aviso">
            <i className="bi bi-exclamation-triangle-fill"></i>
            En caso de emergencia grave, llamá al <strong>911</strong>.
          </p>
        </div>

        {/* Columna derecha: formulario de consulta */}
        <form className="formulario" onSubmit={manejarEnvio} noValidate>
          <h3 className="formulario-titulo">Enviar una consulta</h3>

          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={manejarCambio}
            placeholder="Tu nombre"
            className={errores.nombre ? "campo-invalido" : ""}
          />
          {errores.nombre && <span className="error-texto">{errores.nombre}</span>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={manejarCambio}
            placeholder="tu@email.com"
            className={errores.email ? "campo-invalido" : ""}
          />
          {errores.email && <span className="error-texto">{errores.email}</span>}

          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={manejarCambio}
            placeholder="Escribí tu consulta..."
            className={errores.mensaje ? "campo-invalido" : ""}
          ></textarea>
          {errores.mensaje && <span className="error-texto">{errores.mensaje}</span>}

          <button type="submit" className="boton-enviar">
            <i className="bi bi-send-fill"></i> Enviar consulta
          </button>

          {mensaje && (
            <p className={`mensaje mensaje-${mensaje.tipo}`}>{mensaje.texto}</p>
          )}
        </form>
      </div>
    </section>
  );
}