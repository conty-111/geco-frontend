export const emergencias = [
  {
    id: 1,
    icono: "bi-water",
    titulo: "Inundación - Barrio Norte",
    gravedad: "alta",
    datos: [
      { label: "Estado", valor: "En proceso" },
      { label: "Fecha", valor: "02/09/2026" },
      { label: "Afectados", valor: "~120 personas" },
    ],
    estado: { texto: "Urgente", tipo: "alerta" },
  },
  {
    id: 2,
    icono: "bi-fire",
    titulo: "Incendio - Zona Rural",
    gravedad: "media",
    datos: [
      { label: "Estado", valor: "Monitoreo" },
      { label: "Fecha", valor: "01/09/2026" },
      { label: "Afectados", valor: "~45 personas" },
    ],
    estado: { texto: "En curso", tipo: "atencion" },
  },
  {
    id: 3,
    icono: "bi-cloud-lightning-rain",
    titulo: "Temporal - Costa Este",
    gravedad: "baja",
    datos: [
      { label: "Estado", valor: "Resuelto" },
      { label: "Fecha", valor: "30/08/2026" },
      { label: "Afectados", valor: "~30 personas" },
    ],
    estado: { texto: "Finalizado", tipo: "resuelto" },
  },
];