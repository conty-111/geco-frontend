export const solicitudes = [
  {
    id: 1,
    icono: "bi-basket",
    titulo: "Alimentos - Barrio Sur",
    gravedad: "alta",
    datos: [
      { label: "Prioridad", valor: "Alta" },
      { label: "Estado", valor: "Pendiente" },
      { label: "Contacto", valor: "11-2345-6789" },
    ],
    estado: { texto: "Pendiente", tipo: "atencion" },
  },
  {
    id: 2,
    icono: "bi-droplet-fill",
    titulo: "Agua - Zona Norte",
    gravedad: "alta",
    datos: [
      { label: "Prioridad", valor: "Alta" },
      { label: "Estado", valor: "En proceso" },
      { label: "Contacto", valor: "11-3456-7890" },
    ],
    estado: { texto: "En proceso", tipo: "info" },
  },
  {
    id: 3,
    icono: "bi-capsule",
    titulo: "Medicamentos - Villa Esperanza",
    gravedad: "media",
    datos: [
      { label: "Prioridad", valor: "Media" },
      { label: "Estado", valor: "Atendida" },
      { label: "Contacto", valor: "11-4567-8901" },
    ],
    estado: { texto: "Atendida", tipo: "resuelto" },
  },
];