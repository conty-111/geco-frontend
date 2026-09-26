export const recursos = [
  {
    id: 1,
    icono: "bi-basket",
    titulo: "Alimentos no perecederos",
    datos: [
      { label: "Disponible", valor: "850 kg" },
      { label: "Distribuido", valor: "320 kg" },
    ],
    estado: { texto: "Suficiente", tipo: "resuelto" },
  },
  {
    id: 2,
    icono: "bi-droplet-fill",
    titulo: "Agua potable",
    datos: [
      { label: "Disponible", valor: "2.500 L" },
      { label: "Distribuido", valor: "1.100 L" },
    ],
    estado: { texto: "Crítico", tipo: "alerta" },
  },
  {
    id: 3,
    icono: "bi-moon-stars",
    titulo: "Frazadas y colchones",
    datos: [
      { label: "Disponible", valor: "320 unidades" },
      { label: "Distribuido", valor: "180 unidades" },
    ],
    estado: { texto: "Suficiente", tipo: "resuelto" },
  },
  {
    id: 4,
    icono: "bi-capsule",
    titulo: "Medicamentos básicos",
    datos: [
      { label: "Disponible", valor: "45 kits" },
      { label: "Distribuido", valor: "20 kits" },
    ],
    estado: { texto: "Bajo", tipo: "atencion" },
  },
];