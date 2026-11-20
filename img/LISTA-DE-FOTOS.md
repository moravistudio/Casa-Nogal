# Lista de fotos

Cada espacio de foto del sitio es un contenedor de color liso con un `<img>` adentro. Mientras el archivo no exista se ve el color liso con una etiqueta; cuando pones la foto con el nombre exacto, aparece sola. No hay que tocar el código.

- **Carpeta:** todas van en `img/` (las de producto, en `img/productos/`).
- **Formato:** JPG (o WebP cambiando la extensión en el HTML). Pesar menos de ~250 KB cada una; se muestran con recorte centrado (`object-fit: cover`), así que el sujeto debe quedar al centro.
- **Estilo común para todos los prompts:** *fotografía de interiores realista, luz natural suave, paleta crema, verde bosque y cobre dorado, sin texto, sin logos, sin marcas, sin personas (salvo donde se indica)*. Agrega esto al final de cada prompt.
- **Dos fotos con texto encima:** en las tarjetas de categoría (`cat-*.jpg`) el título va arriba a la izquierda, así que esa esquina debe quedar despejada.

## Portada e inicio

| Archivo | Dónde se usa | Qué debe mostrar | Proporción · tamaño | Prompt sugerido |
|---|---|---|---|---|
| `hero-sala.jpg` | Inicio, portada | Sala amplia y cálida: sofá seccional, mesa de centro, lámparas, una planta. El **lado izquierdo debe quedar despejado y claro** (ahí va el texto; la foto se desvanece hacia la izquierda). | 16:9 · 1920×1080 | Ver el prompt completo de las 3 primeras imágenes en `PROMPTS-PRIMERAS-3.md`. |
| `cat-sofas.jpg` | Inicio, tarjeta «Sofás» | Sofá con cojines. Esquina superior izquierda despejada. | 5:4 · 1000×800 | Ver `PROMPTS-PRIMERAS-3.md`. |
| `cat-decoracion.jpg` | Inicio, tarjeta «Decoración» (fondo verde oscuro, texto claro) | Repisa con jarrones, plantas y objetos, en tonos verdes oscuros. Esquina superior izquierda oscura y despejada. | 5:4 · 1000×800 | Ver `PROMPTS-PRIMERAS-3.md`. |
| `cat-iluminacion.jpg` | Inicio, tarjeta «Iluminación» | Lámpara de mesa y lámparas colgantes de luz cálida. Esquina superior izquierda despejada. | 5:4 · 1000×800 | «Lámpara de mesa de pantalla clara y dos lámparas colgantes de luz cálida sobre un mueble de madera, fondo beige liso.» |
| `suscripcion-planta.jpg` | Inicio, franja de suscripción (izquierda; solo escritorio) | Planta en maceta de cerámica, fondo verde oscuro. | 1:1 · 600×600 | «Planta de interior en una maceta de cerámica sobre un taburete de madera, fondo verde bosque oscuro liso.» |
| `suscripcion-sillon.jpg` | Inicio, franja de suscripción (derecha; solo escritorio) | Sillón tapizado verde junto a una lámpara de pie, fondo oscuro. | 1:1 · 600×600 | «Sillón tapizado verde oliva con un cojín cobrizo junto a una lámpara de pie, fondo verde bosque oscuro liso.» |
| `og-image.jpg` | Vista previa al compartir el sitio (redes, WhatsApp) | Una imagen representativa: puede ser la portada recortada. | 1.91:1 · 1200×630 | «Sala acogedora con sofá beige y lámparas cálidas, composición centrada.» |

## Productos (`img/productos/`)

Proporción 4:3, 800×600. Producto centrado sobre fondo neutro claro o en un ambiente simple. El nombre del archivo es el `id` del producto en `js/productos.js`: si cambias productos, cambia también los nombres.

| Archivo | Producto | Prompt sugerido |
|---|---|---|
| `sofa-seccional.jpg` | Sofá seccional | «Sofá seccional beige en una sala luminosa, vista de tres cuartos.» |
| `sofa-tres-cuerpos.jpg` | Sofá de tres cuerpos | «Sofá de tres cuerpos gris cálido con cojines, fondo de pared clara.» |
| `sillon-individual.jpg` | Sillón individual | «Sillón individual tapizado, patas de madera, esquina luminosa.» |
| `juego-comedor.jpg` | Juego de comedor | «Mesa de comedor de madera con seis sillas tapizadas bajo una lámpara colgante.» |
| `mesa-comedor.jpg` | Mesa de comedor | «Mesa de comedor rectangular de madera clara, vista de tres cuartos.» |
| `cama-madera.jpg` | Cama de madera | «Cama de madera con cabecera, ropa de cama blanca y manta cobriza.» |
| `velador.jpg` | Velador | «Velador de madera con una lámpara pequeña y un libro, junto a una cama.» |
| `comoda.jpg` | Cómoda | «Cómoda de madera de cuatro cajones con un espejo y un jarrón encima.» |
| `lampara-pie.jpg` | Lámpara de pie | «Lámpara de pie de pantalla beige junto a un sillón, luz cálida encendida.» |
| `lampara-colgante.jpg` | Lámpara colgante | «Lámpara colgante de vidrio ámbar sobre una mesa de comedor.» |
| `espejo-decorativo.jpg` | Espejo decorativo | «Espejo redondo de marco dorado sobre un mueble de madera con plantas.» |
| `jarron-ceramica.jpg` | Jarrón de cerámica | «Jarrón de cerámica beige con ramas secas sobre una repisa.» |

## Colecciones

Proporción 4:3, 1200×900.

| Archivo | Dónde se usa | Prompt sugerido |
|---|---|---|
| `col-sala.jpg` | Colecciones, «Sala de estar» | «Sala completa con sofá, sillón y mesa de centro que combinan, luz natural.» |
| `col-comedor.jpg` | Colecciones, «Comedor» | «Comedor con mesa de madera, sillas tapizadas y lámpara colgante, ventana al fondo.» |
| `col-dormitorio.jpg` | Colecciones, «Dormitorio» | «Dormitorio con cama de madera, dos veladores y una cómoda, ropa de cama clara.» |
| `col-decoracion.jpg` | Colecciones, «Iluminación y decoración» | «Rincón con lámpara de pie, espejo redondo y objetos decorativos sobre una repisa.» |

## Nosotros

| Archivo | Dónde se usa | Qué debe mostrar | Proporción · tamaño | Prompt sugerido |
|---|---|---|---|---|
| `nosotros-taller.jpg` | Nosotros, junto a «Del taller a tu casa» | El taller o el equipo trabajando (si hay fotos reales, mejor que IA). | 4:5 · 1000×1250 | «Taller de carpintería luminoso con una mesa de trabajo, maderas y telas, sin personas en primer plano.» |
| `equipo-1.jpg`, `equipo-2.jpg`, `equipo-3.jpg` | Nosotros, «El equipo» | Retratos de las personas del negocio (usa fotos reales). | 4:5 · 800×1000 | — (fotos reales; no inventes personas con IA para presentarlas como el equipo) |

## Contacto

No lleva foto: el mapa es un Google Maps incrustado (`<iframe>` en `contacto.html`). Para cambiar la dirección edita el texto después de `q=` en el `src`, usando `+` en lugar de espacios.

## Otros archivos de `img/`

- **Logo:** se configura en `js/main.js` (bloque `CONFIG`, campo `logo`). Sube `img/logo.svg` (y `img/logo-claro.svg` para el pie oscuro) y escribe las rutas ahí. Mientras tanto se muestra el nombre en texto.
- **`favicon.svg`:** provisional (una «M» sobre verde). Reemplázalo por el ícono de la marca.
