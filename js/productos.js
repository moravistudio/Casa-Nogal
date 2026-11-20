/* =====================================================================
   Datos de la tienda. Son EJEMPLOS: reemplázalos por los productos reales.
   Cada producto necesita:
     id          texto corto sin espacios (también es el nombre de la foto: img/productos/<id>.jpg)
     nombre      como se muestra
     categoria   una clave de CATEGORIAS
     ambientes   uno o más ambientes (claves de AMBIENTES)
     precio      número en soles, sin símbolo (se muestra como «S/ 2,490»)
     destacado   true = aparece en «Piezas destacadas» del inicio
     orden       número; mientras mayor, más reciente (para «Novedades»)
   ===================================================================== */

var CATEGORIAS = [
  { id: 'sofas', nombre: 'Sofás' },
  { id: 'comedor', nombre: 'Comedor' },
  { id: 'dormitorio', nombre: 'Dormitorio' },
  { id: 'iluminacion', nombre: 'Iluminación' },
  { id: 'decoracion', nombre: 'Decoración' }
];

var AMBIENTES = [
  { id: 'sala', nombre: 'Sala' },
  { id: 'comedor', nombre: 'Comedor' },
  { id: 'dormitorio', nombre: 'Dormitorio' },
  { id: 'oficina', nombre: 'Oficina' }
];

/* Rangos de precio: min es exclusivo y max inclusivo («Hasta S/ 500» incluye 500). */
var RANGOS_PRECIO = [
  { id: 'hasta-500', nombre: 'Hasta S/ 500', min: 0, max: 500 },
  { id: '500-1500', nombre: 'S/ 500 – S/ 1,500', min: 500, max: 1500 },
  { id: '1500-3000', nombre: 'S/ 1,500 – S/ 3,000', min: 1500, max: 3000 },
  { id: 'mas-3000', nombre: 'Más de S/ 3,000', min: 3000, max: Infinity }
];

var PRODUCTOS = [
  { id: 'sofa-seccional', nombre: 'Sofá seccional', categoria: 'sofas', ambientes: ['sala'], precio: 3490, destacado: false, orden: 12 },
  { id: 'sofa-tres-cuerpos', nombre: 'Sofá de tres cuerpos', categoria: 'sofas', ambientes: ['sala'], precio: 2490, destacado: true, orden: 11 },
  { id: 'sillon-individual', nombre: 'Sillón individual', categoria: 'sofas', ambientes: ['sala', 'dormitorio', 'oficina'], precio: 1190, destacado: false, orden: 6 },
  { id: 'juego-comedor', nombre: 'Juego de comedor', categoria: 'comedor', ambientes: ['comedor'], precio: 3290, destacado: true, orden: 10 },
  { id: 'mesa-comedor', nombre: 'Mesa de comedor', categoria: 'comedor', ambientes: ['comedor'], precio: 1790, destacado: false, orden: 5 },
  { id: 'cama-madera', nombre: 'Cama de madera', categoria: 'dormitorio', ambientes: ['dormitorio'], precio: 1890, destacado: true, orden: 9 },
  { id: 'velador', nombre: 'Velador', categoria: 'dormitorio', ambientes: ['dormitorio'], precio: 390, destacado: false, orden: 4 },
  { id: 'comoda', nombre: 'Cómoda', categoria: 'dormitorio', ambientes: ['dormitorio'], precio: 1490, destacado: false, orden: 3 },
  { id: 'lampara-pie', nombre: 'Lámpara de pie', categoria: 'iluminacion', ambientes: ['sala', 'dormitorio', 'oficina'], precio: 590, destacado: false, orden: 8 },
  { id: 'lampara-colgante', nombre: 'Lámpara colgante', categoria: 'iluminacion', ambientes: ['comedor', 'sala'], precio: 450, destacado: false, orden: 7 },
  { id: 'espejo-decorativo', nombre: 'Espejo decorativo', categoria: 'decoracion', ambientes: ['sala', 'dormitorio'], precio: 390, destacado: true, orden: 2 },
  { id: 'jarron-ceramica', nombre: 'Jarrón de cerámica', categoria: 'decoracion', ambientes: ['sala', 'comedor'], precio: 120, destacado: false, orden: 1 }
];

/* =====================================================================
   Ficha de cada producto (la ventana que se abre al pulsar «Ver detalle»).
   Son datos de EJEMPLO: reemplázalos por los reales. La clave es el id del producto.
     desc        1 o 2 frases sobre la pieza
     medidas     texto libre, en centímetros
     materiales  lista corta
     cuidado     una frase de mantenimiento
   ===================================================================== */
var DETALLES = {
  'sofa-seccional': {
    desc: 'Sofá seccional en L de líneas rectas, con chaise longue en el lado derecho. Asientos amplios y respaldos firmes para una sala cómoda todos los días.',
    medidas: 'Largo 280 cm · Fondo 165 cm · Alto 85 cm · Altura del asiento 44 cm',
    materiales: ['Estructura de madera de pino seco', 'Espuma de alta densidad', 'Tapiz de lino beige', 'Patas de nogal'],
    cuidado: 'Aspirar con regularidad y limpiar las manchas con un paño húmedo, sin frotar.'
  },
  'sofa-tres-cuerpos': {
    desc: 'Sofá de tres cuerpos con cojines mullidos y brazos redondeados. Una pieza versátil que se adapta a salas pequeñas y grandes.',
    medidas: 'Largo 210 cm · Fondo 90 cm · Alto 84 cm · Altura del asiento 45 cm',
    materiales: ['Estructura de madera', 'Espuma de alta densidad', 'Tela de tejido grueso en gris cálido', 'Patas de nogal'],
    cuidado: 'Limpiar con paño seco o ligeramente húmedo. Evitar la luz directa del sol por muchas horas.'
  },
  'sillon-individual': {
    desc: 'Sillón individual de formas suaves, ideal para un rincón de lectura o para acompañar el sofá.',
    medidas: 'Ancho 85 cm · Fondo 82 cm · Alto 80 cm · Altura del asiento 43 cm',
    materiales: ['Estructura de madera', 'Espuma de alta densidad', 'Tapiz de lino beige', 'Patas de nogal'],
    cuidado: 'Aspirar con cepillo suave. Las manchas se limpian al momento con un paño húmedo.'
  },
  'juego-comedor': {
    desc: 'Mesa rectangular de nogal con seis sillas tapizadas. Un comedor pensado para reuniones largas y para el día a día.',
    medidas: 'Mesa: 180 × 90 cm, alto 76 cm · Sillas: ancho 46 cm, alto 90 cm',
    materiales: ['Mesa de madera de nogal', 'Barniz mate resistente al calor', 'Sillas tapizadas en tela beige', 'Patas de madera'],
    cuidado: 'Usar individuales o manteles para platos calientes. Limpiar la madera con un paño suave.'
  },
  'mesa-comedor': {
    desc: 'Mesa de comedor rectangular con patas gruesas y tablero liso. Sencilla, firme y fácil de combinar.',
    medidas: 'Largo 180 cm · Ancho 90 cm · Alto 76 cm · Capacidad para 6 personas',
    materiales: ['Tablero y patas de nogal', 'Barniz mate', 'Refuerzos de madera bajo el tablero'],
    cuidado: 'Limpiar con paño ligeramente húmedo y secar de inmediato. No usar productos abrasivos.'
  },
  'cama-madera': {
    desc: 'Cama de madera de nogal con cabecera alta, de líneas limpias. El colchón y la ropa de cama no están incluidos.',
    medidas: 'Cama de 2 plazas · Ancho 175 cm · Largo 215 cm · Alto de la cabecera 110 cm',
    materiales: ['Madera de nogal', 'Barniz mate', 'Base de listones de madera', 'Tornillería oculta'],
    cuidado: 'Limpiar con paño seco. Evitar la humedad directa sobre la madera.'
  },
  'velador': {
    desc: 'Velador de dos cajones con tiradores de cobre y patas cónicas. Acompaña bien a la cama de madera.',
    medidas: 'Ancho 50 cm · Fondo 40 cm · Alto 55 cm',
    materiales: ['Madera de nogal', 'Tiradores de cobre', 'Barniz mate'],
    cuidado: 'Limpiar con paño suave. Los tiradores se pulen con un paño seco.'
  },
  'comoda': {
    desc: 'Cómoda de cuatro cajones amplios con correderas suaves. Mucho espacio para guardar ropa y ropa de cama.',
    medidas: 'Ancho 120 cm · Fondo 45 cm · Alto 90 cm',
    materiales: ['Madera de nogal', 'Correderas metálicas de cierre suave', 'Tiradores de cobre'],
    cuidado: 'Limpiar con paño seco. No sobrecargar los cajones.'
  },
  'lampara-pie': {
    desc: 'Lámpara de pie de brazo curvo, con pantalla de lino que da una luz cálida y tranquila. Muy buena junto a un sillón.',
    medidas: 'Altura 165 cm · Base de 30 cm de diámetro · Pantalla de 40 cm de diámetro',
    materiales: ['Estructura de metal en acabado latón', 'Pantalla de lino', 'Cable de 2 m con interruptor'],
    cuidado: 'Desconectar antes de limpiar. Sacudir la pantalla con un plumero. Foco no incluido (tipo E27).'
  },
  'lampara-colgante': {
    desc: 'Lámpara colgante de vidrio ámbar acanalado con detalles en latón. Da una luz cálida sobre mesas de comedor o de centro.',
    medidas: 'Diámetro 35 cm · Alto 30 cm · Cable regulable hasta 120 cm',
    materiales: ['Vidrio ámbar acanalado', 'Detalles de latón', 'Cable textil negro'],
    cuidado: 'Limpiar el vidrio con paño suave y seco. Foco no incluido (tipo E27).'
  },
  'espejo-decorativo': {
    desc: 'Espejo redondo de marco delgado en acabado cobre. Amplía el ambiente y refleja la luz natural.',
    medidas: 'Diámetro 80 cm · Grosor del marco 2 cm',
    materiales: ['Vidrio espejo', 'Marco de acero en acabado cobre', 'Soporte para colgar en la pared'],
    cuidado: 'Limpiar el vidrio con un paño húmedo y secar. No rociar líquido directo sobre el marco.'
  },
  'jarron-ceramica': {
    desc: 'Jarrón de cerámica esmaltada con relieve de líneas verticales. Luce bien con ramas, flores secas o solo.',
    medidas: 'Alto 32 cm · Diámetro 18 cm',
    materiales: ['Cerámica esmaltada', 'Acabado crema brillante'],
    cuidado: 'Impermeable por dentro. Lavar con agua y jabón suave.'
  }
};
