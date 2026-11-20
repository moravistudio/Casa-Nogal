/* =====================================================================
   Muebles y decoración — comportamiento del sitio (sin librerías).
   1) CONFIG: aquí se cambian marca, logo y datos de contacto (un solo lugar).
   2) Cabecera y pie: se arman desde CONFIG en todas las páginas.
   3) Fotos: si un archivo no existe se ve el color liso con su etiqueta.
   4) Inicio, tienda y contacto: cada página activa solo lo suyo.
   ===================================================================== */
(function () {
  'use strict';

  /* ===================================================================
     1) CONFIGURACIÓN — edita solo este bloque
     =================================================================== */
  var CONFIG = {
    marca: 'CASA NOGAL',
    lema: 'MUEBLES & DECORACIÓN',

    /* Logo. Si dejas src vacío se muestra la marca en texto.
       Ejemplo: src: 'img/logo.svg', srcClaro: 'img/logo-claro.svg' (versión para el pie oscuro) */
    logo: { src: '', srcClaro: '', ancho: 180, alto: 54 },

    /* Datos de contacto: aparecen en el pie y en la página Contacto */
    direccion: 'Av. Arequipa 1234',
    distrito: 'Miraflores, Lima',
    telefono: '+51 987 654 321',
    correo: 'contacto@tunegocio.com',
    horarioSemana: 'Lunes a sábado · 9:00 a. m. – 7:00 p. m.',
    horarioDomingo: 'Domingos · 10:00 a. m. – 2:00 p. m.',
    redes: '@casanogal en Instagram, Facebook y TikTok',
    anio: '2026',
    legal: 'Términos y condiciones · Política de privacidad · Libro de reclamaciones',
    fraseMarca: 'Muebles y decoración para hogares con estilo propio.',

    /* Formularios (contacto y suscripción).
       modo 'demo': validan en el navegador pero NO envían nada (se avisa en pantalla).
       Para conectarlos pon un endpoint (por ejemplo de Formspree) y cambia modo a 'real'.
       Todo el envío pasa por la función enviar() de más abajo. */
    formularios: { modo: 'demo', endpoint: '' }
  };

  var PAGINAS = [
    { id: 'inicio', href: 'index.html', texto: 'Inicio' },
    { id: 'tienda', href: 'tienda.html', texto: 'Tienda' },
    { id: 'colecciones', href: 'colecciones.html', texto: 'Colecciones' },
    { id: 'nosotros', href: 'nosotros.html', texto: 'Nosotros' },
    { id: 'contacto', href: 'contacto.html', texto: 'Contacto' }
  ];

  var FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var PAGINA = document.body.getAttribute('data-page') || '';

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function soles(n) { return 'S/ ' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function buscar(lista, id) { for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i]; return null; }
  function parametros() { try { return new URLSearchParams(window.location.search); } catch (e) { return { get: function () { return null; } }; } }

  /* ===================================================================
     2) CABECERA Y PIE
     =================================================================== */
  function logoCabecera() {
    if (CONFIG.logo.src) return '<img class="brand__img" src="' + esc(CONFIG.logo.src) + '" alt="' + esc(CONFIG.marca) + '" width="' + CONFIG.logo.ancho + '" height="' + CONFIG.logo.alto + '">';
    return '<span class="brand__nombre">' + esc(CONFIG.marca) + '</span><span class="brand__lema">' + esc(CONFIG.lema) + '</span>';
  }
  function logoPie() {
    var src = CONFIG.logo.srcClaro || CONFIG.logo.src;
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(CONFIG.marca) + '" width="' + CONFIG.logo.ancho + '" height="' + CONFIG.logo.alto + '" loading="lazy">';
    return esc(CONFIG.marca);
  }

  function construirCabecera() {
    var slot = document.getElementById('cabecera');
    if (!slot) return;
    var enlaces = PAGINAS.map(function (p) {
      return '<a href="' + p.href + '"' + (p.id === PAGINA ? ' aria-current="page"' : '') + '>' + p.texto + '</a>';
    }).join('');
    slot.className = 'site-header-slot';
    slot.innerHTML =
      '<header class="site-header"><div class="wrap site-header__in">' +
      '<a class="brand" href="index.html" aria-label="' + esc(CONFIG.marca) + ' — Inicio">' + logoCabecera() + '</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="menu-principal">Menú</button>' +
      '<div class="site-nav" id="menu-principal"><nav aria-label="Principal"><div class="site-nav__links">' + enlaces + '</div></nav>' +
      '<a class="btn btn--verde" href="tienda.html">Ir a la tienda ' + FLECHA + '</a></div>' +
      '</div></header>';

    var boton = slot.querySelector('.nav-toggle');
    var menu = slot.querySelector('.site-nav');
    function cerrar() { menu.classList.remove('is-open'); boton.setAttribute('aria-expanded', 'false'); }
    boton.addEventListener('click', function () {
      var abierto = menu.classList.toggle('is-open');
      boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) cerrar(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrar(); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 960) cerrar(); });
  }

  function construirPie() {
    var slot = document.getElementById('pie');
    if (!slot) return;
    var cats = (window.CATEGORIAS || []).map(function (c) {
      return '<a href="tienda.html?cat=' + c.id + '">' + esc(c.nombre) + '</a>';
    }).join('');
    slot.className = 'site-footer-slot';
    slot.innerHTML =
      '<footer class="pie"><div class="wrap">' +
      '<div class="pie__grid">' +
      '<div><div class="pie__marca">' + logoPie() + '</div><p class="pie__texto">' + esc(CONFIG.fraseMarca) + '</p></div>' +
      '<div class="pie__col"><h3>Tienda</h3>' + cats + '</div>' +
      '<div class="pie__col"><h3>Empresa</h3><a href="nosotros.html">Nosotros</a><a href="colecciones.html">Colecciones</a><a href="contacto.html">Contacto</a></div>' +
      '<div class="pie__col"><h3>Visítanos</h3><span>' + esc(CONFIG.direccion) + ', ' + esc(CONFIG.distrito) + '</span><span>' + esc(CONFIG.telefono) + '</span><span>' + esc(CONFIG.correo) + '</span><span>' + esc(CONFIG.horarioSemana) + '</span></div>' +
      '</div>' +
      '<div class="pie__legal"><span>© ' + esc(CONFIG.anio) + ' ' + esc(CONFIG.marca) + '. Todos los derechos reservados.</span><span>' + esc(CONFIG.legal) + '</span></div>' +
      '<p class="firma-moravi">Desarrollado por <a href="https://www.moravistudio.com/" target="_blank" rel="noopener">moravistudio.com</a></p>' +
      '</div></footer>';
  }

  /* Datos de CONFIG dentro del contenido de la página: <span data-cfg="telefono"> */
  function rellenarDatos() {
    var nodos = document.querySelectorAll('[data-cfg]');
    for (var i = 0; i < nodos.length; i++) {
      var clave = nodos[i].getAttribute('data-cfg');
      if (CONFIG[clave] != null) nodos[i].textContent = CONFIG[clave];
    }
  }

  /* ===================================================================
     3) FOTOS: color liso + etiqueta mientras el archivo no exista
     =================================================================== */
  function revisarFotos(raiz) {
    var imgs = (raiz || document).querySelectorAll('.ph > img');
    Array.prototype.forEach.call(imgs, function (img) {
      var caja = img.parentNode;
      function vacio() { caja.classList.add('is-empty'); img.hidden = true; }
      if (img.complete) { if (!img.naturalWidth) vacio(); }
      else { img.addEventListener('error', vacio, { once: true }); }
    });
  }

  /* ===================================================================
     4) ENVÍO DE FORMULARIOS — ÚNICO PUNTO PARA CONECTAR UN SERVICIO
     ===================================================================
     tipo: 'contacto' | 'suscripcion'.  datos: objeto con los campos.
     Debe devolver una promesa: si falla (reject), el formulario avisa del error.
     Ejemplos de conexión:
       - Formspree: endpoint 'https://formspree.io/f/XXXXXXXX' y modo 'real'.
       - WhatsApp: reemplaza el cuerpo por
           window.open('https://wa.me/51XXXXXXXXX?text=' + encodeURIComponent(datos.mensaje)); return Promise.resolve();
     No se conecta ningún servicio mientras endpoint esté vacío. */
  function enviar(tipo, datos) {
    if (CONFIG.formularios.modo !== 'real' || !CONFIG.formularios.endpoint) {
      if (window.console) console.info('[demo] formulario "' + tipo + '" validado (no enviado):', datos);
      return Promise.resolve({ demo: true });
    }
    return fetch(CONFIG.formularios.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.assign({ tipo: tipo }, datos))
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return { demo: false }; });
  }

  function valorCampo(form, nombre) { var c = form.elements[nombre]; return c ? String(c.value).trim() : ''; }
  function emailValido(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v); }
  function telefonoValido(v) { return v.replace(/\D/g, '').length >= 7; }

  function ponerErrores(form, errores) {
    var primero = null;
    Array.prototype.forEach.call(form.elements, function (campo) {
      if (!campo.name) return;
      var span = form.querySelector('[data-error-de="' + campo.name + '"]');
      var msg = errores[campo.name] || '';
      if (span) span.textContent = msg;
      if (msg) { campo.setAttribute('aria-invalid', 'true'); if (!primero) primero = campo; }
      else campo.removeAttribute('aria-invalid');
    });
    if (primero) primero.focus();
  }
  function mostrarEstado(form, tipo, texto) {
    var el = form.querySelector('.estado');
    if (!el) return;
    el.className = 'estado' + (tipo ? ' estado--' + tipo : '');
    el.textContent = texto || '';
  }
  function iniciarFormulario(form, tipo, validar, textoOk) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var errores = validar(form);
      ponerErrores(form, errores);
      if (Object.keys(errores).length) { mostrarEstado(form, 'error', 'Revisa los campos marcados.'); return; }
      var datos = {};
      Array.prototype.forEach.call(form.elements, function (c) { if (c.name) datos[c.name] = String(c.value).trim(); });
      var boton = form.querySelector('[type="submit"]');
      if (boton) boton.disabled = true;
      mostrarEstado(form, '', 'Enviando…');
      enviar(tipo, datos).then(function (r) {
        form.reset();
        mostrarEstado(form, 'ok', textoOk + (r && r.demo ? ' (Modo demostración: el envío todavía no está conectado.)' : ''));
      }).catch(function () {
        mostrarEstado(form, 'error', 'No pudimos enviar el formulario. Inténtalo de nuevo en unos minutos.');
      }).then(function () { if (boton) boton.disabled = false; });
    });
  }

  /* ===================================================================
     PÁGINA: INICIO
     =================================================================== */
  function llenarSelect(select, lista, valorSel) {
    lista.forEach(function (x) {
      var o = document.createElement('option');
      o.value = x.id; o.textContent = x.nombre; select.appendChild(o);
    });
    if (valorSel) select.value = valorSel;
  }

  function tarjetaProducto(p) {
    var cat = buscar(CATEGORIAS, p.categoria);
    return '<article class="producto">' +
      '<div class="ph producto__foto ' + (p.orden % 2 ? 'ph--2' : '') + '" data-ficha="' + esc(p.id) + '" data-label="Foto · ' + esc(p.nombre) + '">' +
      '<img src="img/productos/' + esc(p.id) + '.jpg" alt="' + esc(p.nombre) + '" width="800" height="600" loading="lazy"></div>' +
      '<div class="producto__cuerpo">' +
      '<span class="producto__cat">' + esc(cat ? cat.nombre : '') + '</span>' +
      '<h3 class="producto__nombre" data-ficha="' + esc(p.id) + '">' + esc(p.nombre) + '</h3>' +
      '<div class="producto__fila"><span class="producto__precio">Desde <strong>' + soles(p.precio) + '</strong></span>' +
      '<span class="estrellas" role="img" aria-label="5 de 5 estrellas">★★★★★</span></div>' +
      '<button type="button" class="btn btn--verde" data-ficha="' + esc(p.id) + '">Ver detalle</button>' +
      '</div></article>';
  }

  /* ===================================================================
     FICHA DEL PRODUCTO: ventana en el centro de la página (sin salir de ella).
     Usa los datos de productos.js (PRODUCTOS y DETALLES).
     =================================================================== */
  var fichaDialogo = null;
  function crearFicha() {
    fichaDialogo = document.createElement('dialog');
    fichaDialogo.className = 'ficha';
    fichaDialogo.setAttribute('aria-labelledby', 'ficha-titulo');
    fichaDialogo.innerHTML = '<button type="button" class="ficha__cerrar" data-cerrar>Cerrar</button><div class="ficha__contenido"></div>';
    document.body.appendChild(fichaDialogo);
    fichaDialogo.addEventListener('click', function (e) {
      if (e.target === fichaDialogo || e.target.hasAttribute('data-cerrar')) fichaDialogo.close();   /* clic fuera o en Cerrar */
    });
    fichaDialogo.addEventListener('close', function () { document.documentElement.classList.remove('ficha-abierta'); });
  }
  function abrirFicha(id) {
    var p = buscar(PRODUCTOS, id); if (!p) return;
    if (typeof HTMLDialogElement === 'undefined' || !document.createElement('dialog').showModal) { window.location.href = 'contacto.html?producto=' + encodeURIComponent(id); return; }
    if (!fichaDialogo) crearFicha();
    var d = (window.DETALLES && DETALLES[id]) || {}, cat = buscar(CATEGORIAS, p.categoria), filas = '';
    if (d.medidas) filas += '<div><dt>Medidas</dt><dd>' + esc(d.medidas) + '</dd></div>';
    if (d.materiales && d.materiales.length) filas += '<div><dt>Materiales</dt><dd><ul>' + d.materiales.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></dd></div>';
    if (d.cuidado) filas += '<div><dt>Cuidado</dt><dd>' + esc(d.cuidado) + '</dd></div>';
    fichaDialogo.querySelector('.ficha__contenido').innerHTML =
      '<div class="ficha__grid">' +
      '<div class="ph ficha__foto" data-label="Foto · ' + esc(p.nombre) + '"><img src="img/productos/' + esc(p.id) + '.jpg" alt="' + esc(p.nombre) + '" width="1000" height="750"></div>' +
      '<div class="ficha__info"><span class="producto__cat">' + esc(cat ? cat.nombre : '') + '</span>' +
      '<h2 class="ficha__titulo" id="ficha-titulo">' + esc(p.nombre) + '</h2>' +
      '<p class="producto__precio">Desde <strong>' + soles(p.precio) + '</strong> <span class="estrellas" role="img" aria-label="5 de 5 estrellas">★★★★★</span></p>' +
      (d.desc ? '<p class="ficha__desc">' + esc(d.desc) + '</p>' : '') +
      (filas ? '<dl class="ficha__datos">' + filas + '</dl>' : '') +
      '<div class="ficha__acciones"><a class="btn btn--dorado btn--grande" href="contacto.html?producto=' + encodeURIComponent(p.id) + '">Consultar este producto ' + FLECHA + '</a></div>' +
      '</div></div>';
    revisarFotos(fichaDialogo);
    fichaDialogo.scrollTop = 0;
    document.documentElement.classList.add('ficha-abierta');
    fichaDialogo.showModal();
  }
  function iniciarFichas() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('[data-ficha]'); if (!t) return;
      abrirFicha(t.getAttribute('data-ficha'));
    });
  }

  function paginaInicio() {
    var form = document.getElementById('buscador');
    if (form) {
      llenarSelect(form.elements.cat, CATEGORIAS);
      llenarSelect(form.elements.ambiente, AMBIENTES);
      llenarSelect(form.elements.precio, RANGOS_PRECIO);
    }
    var cont = document.getElementById('destacados');
    if (cont) {
      cont.innerHTML = PRODUCTOS.filter(function (p) { return p.destacado; }).slice(0, 4).map(tarjetaProducto).join('');
      revisarFotos(cont);
    }
    var susc = document.getElementById('suscripcion-form');
    if (susc) {
      iniciarFormulario(susc, 'suscripcion', function (f) {
        var e = {}, v = valorCampo(f, 'correo');
        if (!v) e.correo = 'Escribe tu correo electrónico.';
        else if (!emailValido(v)) e.correo = 'Revisa tu correo: parece incompleto.';
        return e;
      }, '¡Listo! Te avisaremos de las novedades.');
    }
  }

  /* ===================================================================
     PÁGINA: TIENDA (filtros leen y escriben la URL: ?cat=&ambiente=&precio=&orden=)
     =================================================================== */
  function paginaTienda() {
    var lista = document.getElementById('lista-productos');
    var contCats = document.getElementById('filtro-categorias');
    var selAmbiente = document.getElementById('filtro-ambiente');
    var selPrecio = document.getElementById('filtro-precio');
    var selOrden = document.getElementById('filtro-orden');
    var resumen = document.getElementById('resumen');
    if (!lista) return;

    var p = parametros();
    var estado = {
      cat: buscar(CATEGORIAS, p.get('cat')) ? p.get('cat') : '',
      ambiente: buscar(AMBIENTES, p.get('ambiente')) ? p.get('ambiente') : '',
      precio: buscar(RANGOS_PRECIO, p.get('precio')) ? p.get('precio') : '',
      orden: ['menor', 'mayor', 'novedades'].indexOf(p.get('orden')) >= 0 ? p.get('orden') : ''
    };

    llenarSelect(selAmbiente, AMBIENTES, estado.ambiente);
    llenarSelect(selPrecio, RANGOS_PRECIO, estado.precio);
    selOrden.value = estado.orden;

    function dentro(prod, ignorar) {
      if (ignorar !== 'cat' && estado.cat && prod.categoria !== estado.cat) return false;
      if (ignorar !== 'ambiente' && estado.ambiente && prod.ambientes.indexOf(estado.ambiente) < 0) return false;
      if (ignorar !== 'precio' && estado.precio) {
        var r = buscar(RANGOS_PRECIO, estado.precio);
        if (!(prod.precio > r.min && prod.precio <= r.max)) return false;
      }
      return true;
    }

    function pintarCategorias() {
      var todas = [{ id: '', nombre: 'Todos' }].concat(CATEGORIAS);
      contCats.innerHTML = todas.map(function (c) {
        var n = PRODUCTOS.filter(function (x) { return dentro(x, 'cat') && (!c.id || x.categoria === c.id); }).length;
        return '<button type="button" class="filtro-cat" data-cat="' + c.id + '" aria-pressed="' + (estado.cat === c.id ? 'true' : 'false') + '"><span>' + esc(c.nombre) + '</span><span>' + n + '</span></button>';
      }).join('');
    }

    function ordenar(arr) {
      var a = arr.slice();
      if (estado.orden === 'menor') a.sort(function (x, y) { return x.precio - y.precio; });
      else if (estado.orden === 'mayor') a.sort(function (x, y) { return y.precio - x.precio; });
      else if (estado.orden === 'novedades') a.sort(function (x, y) { return y.orden - x.orden; });
      else a.sort(function (x, y) { return (y.destacado ? 1 : 0) - (x.destacado ? 1 : 0) || y.orden - x.orden; });
      return a;
    }

    function actualizarURL() {
      var q = [];
      ['cat', 'ambiente', 'precio', 'orden'].forEach(function (k) { if (estado[k]) q.push(k + '=' + encodeURIComponent(estado[k])); });
      var url = window.location.pathname + (q.length ? '?' + q.join('&') : '');
      try { window.history.replaceState(null, '', url); } catch (e) { /* abierto como archivo: se ignora */ }
    }

    function pintar() {
      var res = ordenar(PRODUCTOS.filter(function (x) { return dentro(x); }));
      pintarCategorias();
      resumen.textContent = res.length === 1 ? 'Mostrando 1 producto' : 'Mostrando ' + res.length + ' productos';
      if (!res.length) {
        lista.innerHTML = '<div class="tienda__vacio"><h2>No encontramos productos con esos filtros</h2><p>Prueba con otro ambiente o rango de precio.</p><button type="button" class="btn btn--verde" id="limpiar-filtros">Ver todos los productos</button></div>';
        lista.classList.remove('grilla-productos');
        document.getElementById('limpiar-filtros').addEventListener('click', function () {
          estado.cat = estado.ambiente = estado.precio = estado.orden = '';
          selAmbiente.value = selPrecio.value = selOrden.value = '';
          pintar();
        });
      } else {
        lista.classList.add('grilla-productos');
        lista.innerHTML = res.map(tarjetaProducto).join('');
        revisarFotos(lista);
      }
      actualizarURL();
    }

    contCats.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]'); if (!b) return;
      estado.cat = b.getAttribute('data-cat'); pintar();
    });
    selAmbiente.addEventListener('change', function () { estado.ambiente = selAmbiente.value; pintar(); });
    selPrecio.addEventListener('change', function () { estado.precio = selPrecio.value; pintar(); });
    selOrden.addEventListener('change', function () { estado.orden = selOrden.value; pintar(); });
    pintar();
  }

  /* ===================================================================
     PÁGINA: CONTACTO (?producto=ID prellena el mensaje; ?asunto=medida|ambiente)
     =================================================================== */
  function paginaContacto() {
    var form = document.getElementById('form-contacto');
    if (!form) return;
    var p = parametros();
    var prod = buscar(PRODUCTOS, p.get('producto'));
    if (prod) {
      form.elements.interes.value = 'compra';
      form.elements.mensaje.value = 'Hola, quisiera información sobre: ' + prod.nombre + ' (desde ' + soles(prod.precio) + ').';
    } else if (['compra', 'medida', 'ambiente', 'otro'].indexOf(p.get('asunto')) >= 0) {
      form.elements.interes.value = p.get('asunto');
    }
    iniciarFormulario(form, 'contacto', function (f) {
      var e = {}, tel = valorCampo(f, 'telefono'), mail = valorCampo(f, 'correo');
      if (!valorCampo(f, 'nombre')) e.nombre = 'Escribe tu nombre.';
      if (!tel && !mail) { e.telefono = 'Déjanos un teléfono o un correo para responderte.'; }
      else {
        if (tel && !telefonoValido(tel)) e.telefono = 'Revisa el teléfono: parece incompleto.';
        if (mail && !emailValido(mail)) e.correo = 'Revisa el correo: parece incompleto.';
      }
      if (!valorCampo(f, 'mensaje')) e.mensaje = 'Cuéntanos qué necesitas.';
      return e;
    }, '¡Gracias! Recibimos tu mensaje y te responderemos pronto.');
  }

  /* ===================================================================
     ARRANQUE
     =================================================================== */
  construirCabecera();
  construirPie();
  rellenarDatos();
  revisarFotos();
  if (PAGINA === 'inicio' || PAGINA === 'tienda') iniciarFichas();
  if (PAGINA === 'inicio') paginaInicio();
  if (PAGINA === 'tienda') paginaTienda();
  if (PAGINA === 'contacto') paginaContacto();
})();
