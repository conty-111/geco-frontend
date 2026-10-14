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
- Axios (peticiones HTTP)
- SweetAlert2 (avisos al usuario)
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

# Crear el archivo de variables de entorno
cp .env.example .env

# Levantar el servidor de desarrollo
npm run dev
```

El proyecto queda disponible en `http://localhost:5173`.

> El archivo `.env` no está en el repositorio porque no debe versionarse. El `.env.example` es la plantilla: al copiarlo se obtiene la variable que el proyecto necesita para funcionar.

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
| Eventos globales | Eventos naturales activos en el mundo, traídos en vivo desde la API de NASA EONET |

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
│   ├── services/       → comunicación con APIs externas
│   ├── styles/
│   │   ├── variables.css
│   │   └── globals.css
│   ├── App.jsx         → las rutas de la aplicación
│   └── main.jsx
├── .env.example
├── index.html
├── vercel.json
└── package.json
```

La separación entre `sections/` y `pages/` es intencional: una **sección** es un bloque de contenido reutilizable, y una **página** es lo que se muestra en una ruta. Así una misma sección puede aparecer en más de una página sin duplicar código.

La carpeta `services/` cumple el mismo criterio aplicado a los datos externos: toda la comunicación con la API vive ahí, y los componentes solo piden el resultado. Si mañana cambia la API, se toca un archivo y nada más.

---

## TP8 — Consumo de una API pública

### ¿Qué API se consume y por qué?

**NASA EONET** (Earth Observatory Natural Event Tracker), en su versión 3:

```
https://eonet.gsfc.nasa.gov/api/v3/events
```

EONET publica los eventos naturales activos en todo el mundo: incendios forestales, tormentas severas, inundaciones, volcanes, sismos y deslizamientos. Es exactamente el tipo de emergencia que GECO gestiona, así que los datos reales conviven con los simulados del sistema sin forzar la temática.

Es una API pública, sin registro ni clave de acceso, lo que la hace apropiada para una aplicación de frontend.

### ¿Cómo se realiza la petición?

Con **Axios**, desde un servicio aislado en `src/services/eonetApi.js`. Los componentes no conocen la URL ni la forma de la respuesta: llaman a una función y reciben los datos ya listos para mostrar.

```js
const respuesta = await axios.get(API_URL, {
  params: { status: "open", limit: limite },
  timeout: 10000,
});
```

El parámetro `status: "open"` pide solo los eventos activos, y `timeout` corta la espera si la API no responde en 10 segundos.

### ¿Cómo se manejan las variables de entorno?

La URL de la API no está escrita dentro del código: sale de una variable de entorno.

| Archivo | Se versiona | Para qué |
|---|---|---|
| `.env` | No (está en `.gitignore`) | El archivo real que lee la aplicación |
| `.env.example` | Sí | La plantilla, para saber qué variable crear al clonar |

En Vite, las variables que se exponen al código del cliente deben empezar con el prefijo `VITE_` y se leen con `import.meta.env`:

```js
const API_URL = import.meta.env.VITE_API_URL;
```

Como el `.env` no se sube al repositorio, Vercel no lo recibe: la variable se carga a mano en el panel del proyecto, en **Settings → Environment Variables**. Sin ese paso el sitio compila igual, pero la petición falla en producción.

> Conviene aclarar un punto: en una aplicación de frontend, toda variable `VITE_` queda incluida en el paquete que descarga el navegador. El `.env` sirve para **configurar**, no para **ocultar**. Un dato que deba permanecer secreto no puede vivir en el cliente: iría en un backend. Por eso se eligió a propósito una API pública sin autenticación.

### ¿Cómo se adaptan los datos recibidos?

La respuesta de EONET no tiene la forma que espera el componente `Tarjeta`, así que el servicio la traduce antes de devolverla. El archivo `src/data/categorias.js` mapea las 13 categorías de la API a su nombre en español, su ícono y su color de estado:

```js
wildfires: { nombre: "Incendios forestales", icono: "bi-fire", tipo: "alerta", gravedad: "alta" },
```

Si la API devolviera una categoría desconocida, se usa una por defecto en lugar de romper la vista.

De este modo los eventos reales se dibujan con el mismo componente `Tarjeta` que el resto del sistema: lo único que cambia es de dónde salen los datos.

### ¿Cómo se manejan los errores?

El servicio envuelve la petición en un `try / catch`. Si algo falla —no hay conexión, la API no responde, falta la variable de entorno— se registra el error en consola y se avisa al usuario con **SweetAlert2**, con los colores del panel para que el aviso no rompa el diseño:

```js
await Swal.fire({
  icon: "error",
  title: "No se pudieron cargar los eventos",
  text: "Hubo un problema al consultar la API. Revisá tu conexión e intentá de nuevo.",
  background: "#151B23",
  color: "#E6EDF3",
});
```

El error se vuelve a lanzar después del aviso, para que el componente que llamó pueda cortar su estado de carga.

### Estados de la interfaz

El componente `EventosGlobales` maneja dos estados: la lista de eventos y si la petición sigue en curso. Según eso muestra una de tres cosas:

| Estado | Qué se muestra |
|---|---|
| La petición está en curso | El componente `Cargando`, con su spinner |
| Terminó y no hay eventos | El componente `SinResultados` |
| Terminó y hay eventos | Las tarjetas, generadas con `.map()` |

La petición se hace dentro de un `useEffect` con array de dependencias vacío, así ocurre una sola vez al montarse la sección y no en cada renderizado. Como el callback de `useEffect` no puede ser `async`, se declara una función asíncrona adentro y se la llama:

```jsx
useEffect(() => {
  async function traerDatos() {
    try {
      const datos = await obtenerEventos(12);
      setEventos(datos);
    } catch (error) {
      setEventos([]);
    } finally {
      setCargando(false);
    }
  }
  traerDatos();
}, []);
```

El `finally` es importante: corta el estado de carga tanto si la petición salió bien como si falló. Sin eso, ante un error el spinner quedaría girando para siempre.

### ¿Dónde se muestra?

En la página de **Emergencias** (`/emergencias`), debajo de las emergencias locales. La decisión es temática: arriba quedan las emergencias de la comunidad, cargadas desde los datos del proyecto, y abajo los eventos naturales reales que publica la NASA. La misma página muestra lo local y lo global.

Las tarjetas de ambos bloques son el mismo componente `Tarjeta`: lo único que cambia es el origen de los datos.

---

## TP7 — Hooks: useState, useEffect y useRef

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
| `EventosGlobales.jsx` | La lista de eventos traídos de la API | Cuando la petición termina |
| `EventosGlobales.jsx` | Si la petición sigue en curso | Arranca en `true` y pasa a `false` al terminar |
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
| `Contacto.jsx` | `[mensaje]` | Cada vez que cambia el mensaje del formulario | Oculta el mensaje de éxito a los 4 segundos. El de error no se toca: tiene que quedar visible hasta que el usuario corrija los campos |
| `EventosGlobales.jsx` | `[]` | Una sola vez, al montarse el componente | Pide los eventos a la API de EONET y corta el estado de carga al terminar |
| `Estadisticas.jsx` | `[]` | Una sola vez, al montarse el componente | Crea un `IntersectionObserver` que detecta cuándo la sección entra en pantalla, para disparar el conteo |
| `NumeroAnimado.jsx` | `[valorFinal, activo]` | Cuando se activa el conteo o cambia el valor final | Incrementa el número de forma progresiva hasta llegar al valor |
| `ScrollArriba.jsx` | `[pathname]` | Cada vez que cambia la ruta | Lleva la página al inicio al navegar a otra sección |
| `BotonArriba.jsx` | `[]` | Una sola vez, al montarse el componente | Escucha el scroll de la página |

El array de dependencias es lo que decide cuándo vuelve a ejecutarse el efecto:

- `[]` — corre una sola vez, al montarse el componente
- `[variable]` — corre cada vez que esa variable cambia
- sin array — correría en cada renderizado, lo que puede provocar bucles infinitos

Tres de los efectos devuelven una **función de limpieza**:

| Componente | Qué limpia | Qué pasaría sin eso |
|---|---|---|
| `Estadisticas.jsx` | Desconecta el `IntersectionObserver` | Seguiría observando un elemento que ya no está en pantalla |
| `BotonArriba.jsx` | Quita el listener del scroll | El listener quedaría activo después de desmontarse el componente |
| `Contacto.jsx` | Cancela el temporizador pendiente | Dos envíos seguidos dejarían dos temporizadores corriendo, y el segundo mensaje se borraría antes de tiempo |

### ¿Por qué utilizamos useRef?

Para guardar una referencia a un elemento del DOM sin provocar un nuevo renderizado.

Se usa una vez, en `Estadisticas.jsx`. El `IntersectionObserver` necesita el elemento real para saber cuándo entra en pantalla, y `useRef` es la forma de obtenerlo dentro de React, sin recurrir a `document.querySelector`:

```jsx
const seccionRef = useRef(null);

useEffect(() => {
  const observador = new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting) {
      setVisible(true);
      observador.disconnect();
    }
  });
  observador.observe(seccionRef.current);
  return () => observador.disconnect();
}, []);

return <section ref={seccionRef}>...</section>;
```

La diferencia con `useState` es la clave: cambiar el valor de un `ref` **no** vuelve a dibujar el componente. Por eso sirve para guardar referencias a elementos y valores que no afectan lo que se ve en pantalla, mientras que el estado sirve para lo que sí.

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
| `Cargando` | `texto` | Spinner que se muestra mientras se traen datos de la API |
| `SinResultados` | `icono`, `mensaje` | Mensaje para cuando una consulta no devuelve resultados |
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
| `/` | `Home.jsx` | Hero y Estadísticas |
| `/emergencias` | `Emergencias.jsx` | Emergencias activas con su filtro, y los eventos globales de la API |
| `/recursos` | `Recursos.jsx` | Recursos disponibles, con su buscador |
| `/refugios` | `Refugios.jsx` | Refugios habilitados |
| `/voluntarios` | `Voluntarios.jsx` | Voluntarios registrados |
| `/solicitudes` | `Solicitudes.jsx` | Formulario y listado de solicitudes |
| `/contacto` | `Contacto.jsx` | Datos de la organización y formulario de consulta |

La página de Contacto exporta el componente con el nombre `ContactoPage`, para distinguirlo de la sección `Contacto` que importa. Son dos cosas distintas: la sección es el contenido, la página es la ruta que lo muestra.

Cada página declara además su propio `<title>`. Al usar React 19, el título se traslada solo al `<head>` del documento, así que cada ruta tiene el suyo sin necesidad de una librería externa.

### React Router

La navegación se maneja con **React Router DOM**. En `App.jsx` se define la estructura:

- `<BrowserRouter>` envuelve toda la aplicación
- `<Routes>` agrupa las rutas disponibles
- `<Route path="..." element={...} />` asocia cada ruta con su página

El Navbar y el Footer quedan fuera de `<Routes>`, así que se mantienen visibles en todas las páginas mientras solo cambia el contenido del medio.

Los enlaces del navbar usan `<NavLink>` y el logo usa `<Link>`, en lugar de la etiqueta `<a>`. La diferencia es importante: con `<a>` el navegador recarga el sitio entero, mientras que con `Link` y `NavLink` React Router cambia solo la parte que corresponde, sin recargar la página.

`NavLink` agrega además la clase `active` al enlace de la página en la que está el usuario, que es lo que marca visualmente en qué sección se encuentra.

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
6. **Título por página** — cada ruta declara su propio `<title>`, en lugar de compartir uno solo para todo el sitio.
7. **HTML semántico** (`header`, `nav`, `main`, `section`, `article`, `footer`) y jerarquía correcta de encabezados.

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

La variable de entorno `VITE_API_URL` está cargada en el panel de Vercel, ya que el archivo `.env` no se versiona.

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
