/* 
   CATEGORÍAS DE LA API — NASA EONET
   Traduce al español las 13 categorías que devuelve la API y
   les asigna el ícono y el color de estado que usa el proyecto.
 */

export const CATEGORIAS = {
  drought:      { nombre: "Sequía",                  icono: "bi-thermometer-sun",     tipo: "atencion", gravedad: "media" },
  dustHaze:     { nombre: "Polvo y neblina",         icono: "bi-cloud-haze2",         tipo: "info",     gravedad: "baja"  },
  earthquakes:  { nombre: "Sismos",                  icono: "bi-activity",            tipo: "alerta",   gravedad: "alta"  },
  floods:       { nombre: "Inundaciones",            icono: "bi-water",               tipo: "alerta",   gravedad: "alta"  },
  landslides:   { nombre: "Deslizamientos",          icono: "bi-exclamation-triangle",tipo: "atencion", gravedad: "media" },
  manmade:      { nombre: "Origen humano",           icono: "bi-exclamation-octagon", tipo: "atencion", gravedad: "media" },
  seaLakeIce:   { nombre: "Hielo marino y lacustre", icono: "bi-snow2",               tipo: "info",     gravedad: "baja"  },
  severeStorms: { nombre: "Tormentas severas",       icono: "bi-cloud-lightning-rain",tipo: "alerta",   gravedad: "alta"  },
  snow:         { nombre: "Nevadas",                 icono: "bi-snow",                tipo: "info",     gravedad: "baja"  },
  tempExtremes: { nombre: "Temperaturas extremas",   icono: "bi-thermometer-high",    tipo: "atencion", gravedad: "media" },
  volcanoes:    { nombre: "Volcanes",                icono: "bi-fire",                tipo: "alerta",   gravedad: "alta"  },
  waterColor:   { nombre: "Color del agua",          icono: "bi-droplet-half",        tipo: "info",     gravedad: "baja"  },
  wildfires:    { nombre: "Incendios forestales",    icono: "bi-fire",                tipo: "alerta",   gravedad: "alta"  },
};

/* Si la API devuelve una categoría que no está en la lista,
   se usa esta en lugar de romper la interfaz. */
export const CATEGORIA_POR_DEFECTO = {
  nombre: "Evento natural",
  icono: "bi-globe-americas",
  tipo: "info",
  gravedad: "baja",
};

export function obtenerCategoria(id) {
  return CATEGORIAS[id] ?? CATEGORIA_POR_DEFECTO;
}