# Sitio de muebles y decoración

Sitio web estático de 5 páginas (Inicio, Tienda, Colecciones, Nosotros, Contacto) para mueblerías, carpinterías a medida y tiendas de decoración. HTML, CSS y JavaScript sin librerías ni paso de compilación. Español de Perú, precios en soles.

## Verlo en local

Opción simple: abre `index.html` con doble clic en el navegador. Funciona todo, salvo que la barra de direcciones no se actualiza al filtrar la tienda.

Opción recomendada (servidor local), desde esta carpeta:

```bash
npx serve .
```

o, si tienes Python:

```bash
python -m http.server 8080
```

y abre `http://localhost:8080`.

## Qué editar

| Quiero cambiar… | Dónde |
|---|---|
| Nombre de la marca, logo, teléfono, dirección, horario, año | Bloque `CONFIG` al inicio de `js/main.js`. Es el único lugar: la cabecera y el pie de todas las páginas se arman desde ahí. |
| Colores, tipografías, radios, espacios | Variables de `:root` al inicio de `css/styles.css`. |
| Productos, categorías, ambientes y rangos de precio | `js/productos.js` (hay un comentario con los campos). |
| Fotos | `img/`. Ver `img/LISTA-DE-FOTOS.md` (nombres exactos, proporciones y prompts). |
| Textos de cada página | El `.html` correspondiente. |

Todos los datos del negocio son **de ejemplo** y se cambian en el bloque `CONFIG` de `js/main.js`: teléfono, correo (`contacto@tunegocio.com`), dirección, horarios, redes y año. En `nosotros.html` hay también nombres de equipo y un párrafo de historia de ejemplo; en `contacto.html` los mismos datos aparecen como texto de respaldo (se reemplazan solos por `CONFIG`, pero conviene cambiarlos también ahí).

El pie lleva la firma «Desarrollado por moravistudio.com», como los demás demos.

La marca de prueba es **Casa Nogal** (nombre inventado, sin verificar si existe como marca ni como dominio). Para cambiarla: `CONFIG.marca` en `js/main.js` y el texto «Casa Nogal» en los `<title>` y metadatos de los 5 archivos HTML (`git grep -n "Casa Nogal"`). El favicon (`img/favicon.svg`) lleva la inicial «N».

## Formularios

El de contacto y el de suscripción validan en el navegador, pero **todavía no envían nada**: mientras el modo sea `demo` avisan en pantalla que el envío no está conectado. El único punto de conexión es la función `enviar()` de `js/main.js`. Para usar Formspree, pon su dirección en `CONFIG.formularios.endpoint` y cambia `modo` a `'real'`. Las instrucciones para conectar WhatsApp están en el comentario de esa función.

## Cómo funciona el filtro de la tienda

`tienda.html` lee la dirección: `?cat=sofas&ambiente=sala&precio=500-1500&orden=menor`. La barra de búsqueda del inicio y los enlaces de Colecciones y del pie usan esos parámetros. Cada producto tiene su **ficha**: una ventana en el centro de la página (sin salir de ella) con foto, descripción, medidas, materiales y cuidado. Se abre desde el botón «Ver detalle», la foto o el nombre, y se cierra con «Cerrar», con clic afuera o con Esc. Los datos de las fichas están en `DETALLES`, al final de `js/productos.js` (son de ejemplo). Dentro de la ficha, «Consultar este producto» lleva a `contacto.html?producto=ID`, que prellena el mensaje.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube el contenido de esta carpeta (la raíz del repositorio debe tener `index.html`).
2. En el repositorio: *Settings → Pages → Build and deployment → Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. Espera uno o dos minutos y abre la dirección que te indica GitHub.
4. La imagen para compartir (`og:image`) ya apunta a `https://moravistudio.github.io/Casa-Nogal/img/og-image.jpg`; si el repositorio se llama distinto, cámbiala en los 5 archivos HTML.

## Fuera de alcance por ahora

Página de producto individual propia (la ficha es una ventana), carrito, checkout y pasarela de pago. La estructura ya los prevé: cada producto tiene `id` único.

## Estructura

```
index.html  tienda.html  colecciones.html  nosotros.html  contacto.html
css/styles.css          estilos con variables
js/main.js              configuración, cabecera/pie, filtros, formularios
js/productos.js         datos de la tienda
img/                    fotos, favicon y LISTA-DE-FOTOS.md
```

## Sobre las fotos de la muestra

Todas las fotos de esta versión fueron creadas con IA para mostrar el diseño. En particular, **las 3 personas de «El equipo» (Nosotros) no existen**. Si el sitio se usa para un negocio real, hay que reemplazarlas por fotos del equipo real (mismos nombres de archivo: `img/equipo-1.jpg`, `equipo-2.jpg`, `equipo-3.jpg`, proporción 4:5), y escribir sus nombres y cargos en `nosotros.html`.
