# GECO | Gestión de Emergencias Comunitarias

## Integrantes
- Marangon Giacomo (Giacomo3945)
- Medina Nadia (nadiaamedina)
- Luna Constanza (conty-111)

## Descripción
GECO es un sistema web para la gestión y coordinación de emergencias comunitarias. Permite visualizar emergencias activas, recursos disponibles, refugios habilitados, voluntarios registrados y solicitudes de asistencia.

Está pensado para organizaciones e instituciones que trabajan en la atención de emergencias —municipios, ONG, centros comunitarios— y centraliza la información que durante una emergencia suele quedar dispersa entre WhatsApp, planillas y llamadas.

## Antecedentes

Este repositorio continúa el trabajo iniciado en el sitio original, desarrollado con HTML, CSS y Bootstrap.

| Repositorio | Trabajos prácticos |
|---|---|
| [proyecto-integrador](https://github.com/Giacomo3945/proyecto-integrador) | TP1 a TP4 — HTML, CSS, Bootstrap y JavaScript |
| geco-frontend (este) | TP5 en adelante — React + Vite |

## Tecnologías utilizadas
- React 19
- Vite 8
- React Router DOM 7
- React Bootstrap 2.10 / Bootstrap 5.3.8
- Bootstrap Icons 1.13.1
- CSS3 (variables, Flexbox, Grid, Media Queries)
- Inter (Google Fonts)
- Git / GitHub
- Vercel (deploy continuo)

---

## Instalación y ejecución

Requisitos: tener instalado Node.js y npm.

```bash
# Clonar el repositorio
git clone https://github.com/conty-111/geco-frontend.git

# Entrar a la carpeta
cd geco-frontend

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo
npm run dev
```

El proyecto queda disponible en `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # genera la versión de producción en /dist
npm run preview   # previsualiza la versión de producción
npm run lint      # revisa el código con ESLint
```

---

## Funcionalidades

| Sección | Qué permite |
|---|---|
| Emergencias | Listado con gravedad, estado, fecha y afectados. Filtro por gravedad (alta, media, baja) |
| Recursos | Inventario con disponible y distribuido. Buscador que filtra mientras se escribe |
| Refugios | Capacidad, alojados y lugares libres, con barra de ocupación |
| Voluntarios | Habilidades, disponibilidad y tarea asignada |
| Solicitudes | Formulario con validación y alta dinámica de tarjetas, con persistencia en el navegador |
| Estadísticas | Métricas del panel, con conteo animado al entrar en pantalla |
| Contacto | Datos de la organización y formulario de consulta con validación |

Además: navegación entre páginas sin recargar el sitio, diseño responsive, navbar con menú hamburguesa en pantallas chicas y botón para volver al inicio de la página.

---

## Estructura del proyecto

```
geco-frontend/
├── public/
│   ├── favicon.svg
│   └── img/hero-accion.jpg
├── src/
│   ├── components/
│   │   ├── layout/     → Navbar, Footer
│   │   ├── sections/   → el contenido de cada sección
│   │   └── ui/         → componentes reutilizables
│   ├── pages/          → una página por ruta
│   ├── data/           → los datos del sistema, en arrays
│   ├── styles/
│   │   ├── variables.css
│   │   └── globals.css
│   ├── App.jsx         → las rutas de la aplicación
│   └── main.jsx
├── index.html
├── vercel.json
└── package.json
```

La separación entre `sections/` y `pages/` es intencional: una **sección** es un bloque de contenido reutilizable, y una **página** es lo que se muestra en una ruta. Así una misma sección puede aparecer en más de una página sin duplicar código.

---

## TP7 — Hooks: useState y useEffect

### ¿Por qué utilizamos useState?

Porque hay partes de la interfaz que cambian según lo que hace el usuario, y React necesita saber cuándo volver a dibujarlas. Con una variable común el valor cambiaría en memoria, pero la pantalla no se actualizaría.

### ¿Qué estado estamos manejando y cuándo cambia?

| Componente | Estado | Cuándo cambia |
|---|---|---|
| `Solicitudes.jsx` | Los campos del formulario | Cada vez que el usuario escribe en un campo |
| `Solicitudes.jsx` | Los errores de validación | Al enviar el formulario, si falta completar algo |
| `Solicitudes.jsx` | El mensaje de resultado | Al enviar, según si la validación pasó o no |
| `Solicitudes.jsx` | La lista de solicitudes | Al registrar una solicitud nueva |
| `Contacto.jsx` | Campos, errores y mensaje del formulario de consulta | Igual que en Solicitudes |
| `Emergencias.jsx` | El filtro de gravedad seleccionado | Al tocar uno de los botones de filtro |
| `Recursos.jsx` | El texto escrito en el buscador | Cada vez que el usuario escribe |
| `Estadisticas.jsx` | Si la sección ya entró en pantalla | La primera vez que se vuelve visible |
| `NumeroAnimado.jsx` | El número que se está mostrando | En cada paso del conteo progresivo |
| `Navbar.jsx` | Si el menú está abierto | Al tocar el botón hamburguesa o un enlace |
| `BotonArriba.jsx` | Si el botón se muestra | Al pasar los 400px de scroll |

Los formularios son **componentes controlados**: el valor que se ve en pantalla sale siempre del estado, no del navegador. Por eso cada campo tiene `value={form.campo}` y un `onChange` que actualiza el estado.

### ¿Por qué utilizamos useEffect?

Para ejecutar acciones que no forman parte del dibujado del componente, sino que son consecuencia de un cambio: guardar datos, suscribirse a un evento del navegador, observar la posición de un elemento o arrancar una animación.

### ¿Cuándo se ejecuta y qué función cumplen las dependencias?

| Componente | Dependencias | Cuándo se ejecuta | Qué hace |
|---|---|---|---|
| `Solicitudes.jsx` | `[lista]` | Cada vez que cambia la lista de solicitudes | Guarda la lista en `localStorage`, para que no se pierda al recargar |
| `Estadisticas.jsx` | `[]` | Una sola vez, al montarse el componente | Crea un `IntersectionObserver` que detecta cuándo la sección entra en pantalla, para disparar el conteo |
| `NumeroAnimado.jsx` | `[valorFinal, activo]` | Cuando se activa el conteo o cambia el valor final | Incrementa el número de forma progresiva hasta llegar al valor |
| `ScrollArriba.jsx` | `[pathname]` | Cada vez que cambia la ruta | Lleva la página al inicio al navegar a otra sección |
| `BotonArriba.jsx` | `[]` | Una sola vez, al montarse el componente | Escucha el scroll de la página |

El array de dependencias es lo que decide cuándo vuelve a ejecutarse el efecto:

- `[]` — corre una sola vez, al montarse el componente
- `[variable]` — corre cada vez que esa variable cambia
- sin array — correría en cada renderizado, lo que puede provocar bucles infinitos

Dos de los efectos devuelven una **función de limpieza**: `Estadisticas.jsx` desconecta el observador y `BotonArriba.jsx` quita el listener del scroll. Sin eso quedarían activos aunque el componente se desmonte.

---

## TP6 — Componentes, páginas, rutas y SEO

### Components

La interfaz está dividida en tres grupos:

- **`ui/`** — componentes reutilizables que no conocen ninguna sección en particular: reciben todo por props
- **`layout/`** — Navbar y Footer, comunes a toda la aplicación
- **`sections/`** — el contenido de cada sección, armado con los componentes de `ui/`

| Componente | Props que recibe | Para qué sirve |
|---|---|---|
| `Tarjeta` | `icono`, `titulo`, `datos`, `estado`, `gravedad` | Tarjeta genérica. `gravedad` define el color del borde lateral |
| `Etiqueta` | `texto`, `tipo` | Etiqueta de estado, con color según el tipo |
| `BarraProgreso` | `valor`, `maximo`, `etiqueta` | Barra de ocupación, usada en Refugios |
| `TituloSeccion` | `icono`, `texto` | Encabezado de cada sección |
| `Icono` | `nombre`, `className` | Envuelve los íconos de Bootstrap Icons |
| `NumeroAnimado` | `valor`, `activo` | Conteo progresivo de las estadísticas |
| `BotonArriba` | — | Botón flotante para volver al inicio de la página |
| `ScrollArriba` | — | Lleva la página al inicio al cambiar de ruta |

El mismo componente `Tarjeta` lo usan Emergencias, Recursos, Refugios, Voluntarios y Solicitudes. Lo que cambia es lo que recibe por props, no el componente.

También se usa el componente `Form` de **React Bootstrap** en el buscador de la sección Recursos.

### Props

Las props son los datos que un componente recibe de quien lo usa. Permiten que un mismo componente se vea distinto según el contexto, sin duplicar código.

Por ejemplo, `Tarjeta` recibe `gravedad` y según ese valor aplica la clase `tarjeta-alta`, `tarjeta-media` o `tarjeta-baja`, que es lo que define el color del borde lateral.

### Pages

Cada ruta tiene su propia página en `src/pages/`. Las páginas no contienen diseño propio: importan las secciones que les corresponden y las ordenan.

| Ruta | Página | Qué muestra |
|---|---|---|
| `/` | `Home.jsx` | Hero, Estadísticas y Contacto |
| `/emergencias` | `Emergencias.jsx` | Emergencias activas, con su filtro |
| `/recursos` | `Recursos.jsx` | Recursos disponibles, con su buscador |
| `/refugios` | `Refugios.jsx` | Refugios habilitados |
| `/voluntarios` | `Voluntarios.jsx` | Voluntarios registrados |
| `/solicitudes` | `Solicitudes.jsx` | Formulario y listado de solicitudes |

### React Router

La navegación se maneja con **React Router DOM**. En `App.jsx` se define la estructura:

- `<BrowserRouter>` envuelve toda la aplicación
- `<Routes>` agrupa las rutas disponibles
- `<Route path="..." element={...} />` asocia cada ruta con su página

El Navbar y el Footer quedan fuera de `<Routes>`, así que se mantienen visibles en todas las páginas mientras solo cambia el contenido del medio.

Los enlaces del navbar usan `<NavLink>` y el logo usa `<Link>`, en lugar de la etiqueta `<a>`. La diferencia es importante: con `<a>` el navegador recarga el sitio entero, mientras que con `Link` y `NavLink` React Router cambia solo la parte que corresponde, sin recargar la página.

El componente `ScrollArriba` resuelve un detalle propio de las aplicaciones de una sola página: al cambiar de ruta, el navegador conserva la posición del scroll. Con `useEffect` escuchando el cambio de `pathname`, la página vuelve al inicio en cada navegación.

#### Configuración para el deploy

Al usar rutas del lado del cliente, un servidor común devolvería 404 si alguien escribe `/contacto` directamente en el navegador, porque no existe un archivo con ese nombre. El archivo `vercel.json` resuelve esto redirigiendo todas las rutas a `index.html`, para que React Router se encargue de mostrar la página correcta:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Uso de map()

Cada archivo de `src/data/` exporta un array con los datos de una sección. Las secciones los recorren con `.map()` y arman una `<Tarjeta />` por elemento, en lugar de repetir el mismo bloque de código una vez por tarjeta.

Cada objeto incluye un `id` que se usa como `key` en el `.map()`, para que React pueda identificar cada elemento cuando la lista cambia.

También se usa `.map()` para generar los enlaces del navbar a partir de un array de rutas.

### Estrategias de SEO

1. `lang="es"` — declara el idioma del documento para los buscadores.
2. `meta viewport` — SEO móvil: los buscadores priorizan sitios adaptables.
3. `meta description` — texto que aparece bajo el título en los resultados de búsqueda.
4. `meta keywords` y `meta author` — palabras clave del dominio y autoría del equipo.
5. **Open Graph** (`og:type`, `og:url`, `og:title`, `og:description`, `og:image`) — controlan cómo se ve el enlace al compartirlo en redes. El `og:image` y el `og:url` usan la URL absoluta del deploy, que es lo que necesitan las redes para mostrar la vista previa.
6. **HTML semántico** (`header`, `nav`, `main`, `section`, `article`, `footer`) y jerarquía correcta de encabezados.

---

## TP5 — Migración a React + Vite

### Qué cambió respecto del proyecto anterior

El sitio original estaba hecho con HTML, CSS y Bootstrap, y la interactividad se resolvía manipulando el DOM directamente con JavaScript. En React el enfoque es distinto: se declara qué se quiere mostrar y React se encarga de actualizar la pantalla cuando el estado cambia.

El caso más claro es el formulario de solicitudes. Antes había que crear el elemento a mano con `createElement` e insertarlo con `prepend()`. Ahora alcanza con agregar un objeto al array del estado: React vuelve a dibujar la lista solo.

### Diseño

Se rediseñó la interfaz como un **panel de control operativo** en lugar de un sitio institucional. La justificación es funcional: GECO es un sistema de gestión, las interfaces oscuras reducen la fatiga visual en turnos largos y hacen resaltar los estados de alerta.

La paleta y la tipografía están centralizadas en `src/styles/variables.css`:

- `--fondo`, `--superficie`, `--superficie-hover`, `--borde` — superficies del panel
- `--texto`, `--texto-secundario` — jerarquía tipográfica
- `--alerta`, `--atencion`, `--resuelto`, `--info` — estados del sistema
- `--fuente` — Inter, diseñada específicamente para pantallas
- `--esp-xs/sm/md/lg` — escala de espaciados
- `--radio` — radio de bordes

La gravedad de cada emergencia se indica con un borde lateral de color en la tarjeta, en lugar de depender solo de la etiqueta de estado.

### Optimización

La imagen de fondo del hero se optimizó antes de subirla: redimensionada a 1920px y comprimida con MozJPEG, pasando de 5.7 MB a 209 kB (96% menos) sin pérdida visible de calidad.

---

## Deploy

El proyecto está desplegado en **Vercel**, conectado a la rama `main`. Cada vez que se integra un cambio en `main`, Vercel reconstruye y publica el sitio automáticamente.

Además, cada Pull Request genera una vista previa con su propia URL, lo que permite revisar los cambios antes de integrarlos.

---

## Flujo de trabajo del equipo

El repositorio tiene dos ramas principales:

- **`main`** — versión estable, es la que se publica en Vercel
- **`dev`** — rama de integración, donde se juntan los cambios de todos

Cada integrante trabaja en su propia rama, nombrada según el tipo de cambio:

```
feature/   funcionalidad nueva
fix/       corrección de un error
refactor/  mejora de código existente
chore/     configuración o mantenimiento
docs/      documentación
```

El flujo es: crear la rama desde `dev` → hacer commits → integrar `dev` antes de subir → abrir un Pull Request hacia `dev` → revisión de un compañero → merge.

Los mensajes de commit siguen la convención de Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`) y cada commit corresponde a un cambio lógico.

---

## Links
- **Repositorio (React)**: https://github.com/conty-111/geco-frontend
- **Repositorio (HTML/CSS/Bootstrap)**: https://github.com/Giacomo3945/proyecto-integrador
- **Sitio publicado**: https://geco-frontend-six.vercel.app/
