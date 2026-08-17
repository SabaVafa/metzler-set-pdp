/* ============================================================
   Metzler SET configuration flow – embedded in the duplicated PDP (set.html).
   Türklingel „Stella" + Briefkasten „Siebert". One shared finish instantiates
   both; each carries its own options; one combined summary with a set discount.
   Finish rail shows the INTERSECTION as freely pairable; finishes for only one
   product are marked „bricht das Set" and route through a divergence path.
   Data from the live PDPs. Option deltas are REPRESENTATIVE (flagged in UI).
   ============================================================ */
(function () {
  'use strict';
  if (!document.getElementById('setfin')) return;   // only on the set page

  var SET_DISCOUNT = 0.10;   // 10% – MVP default

  var FINISHES = [
    { id: 'ral7016', name: 'Anthrazitgrau',      code: 'RAL 7016', img: 'assets/swatches/anthrazit-ral7016.jpg',   mat: 'anthrazit.webp',      a: true, b: true },
    { id: 'ral9016', name: 'Verkehrsweiß',       code: 'RAL 9016', img: 'assets/swatches/verkehrsweiss-ral9016.jpg', mat: 'verkehrsweiss.webp',  a: true, b: true },
    { id: 'ral9007', name: 'Graualuminium',      code: 'RAL 9007', img: 'assets/swatches/graualuminium-ral9007.jpg', mat: 'graualuminium.webp',  a: true, b: true },
    { id: 'db703',   name: 'Eisenglimmer',       code: 'DB 703',   img: 'assets/swatches/eisenglimmer-db703.jpg',   mat: 'eisenglimmer.webp',   a: true, b: true },
    { id: 'ral9005', name: 'Tiefschwarz',        code: 'RAL 9005', img: 'assets/swatches/tiefschwarz-ral9005.jpg',  mat: 'tiefschwarz.webp',    a: true, b: true },
    { id: 'edelstahl', name: 'Edelstahl gebürstet', code: '',      img: 'assets/swatches/edelstahl-gebuerstet.jpg', mat: 'edelstahl.webp',      a: true, b: true },
    { id: 'ral7012', name: 'Basaltgrau',         code: 'RAL 7012', chip: '#4c5155', a: false, b: true },
    { id: 'wunsch',  name: 'Wunschfarbe nach RAL', code: '',       img: 'assets/swatches/wunschfarbe-nach-ral.jpg', a: false, b: true }
  ];
  var byId = function (id) { for (var i = 0; i < FINISHES.length; i++) if (FINISHES[i].id === id) return FINISHES[i]; return null; };
  var SHARED = FINISHES.filter(function (f) { return f.a && f.b; });

  var PRODUCTS = {
    a: { key: 'a', name: 'Türklingel „Stella"', sub: 'mit Gravur + LED-Taster · Art. 35875', base: 24.99,
      img: 'Bundled Product/Image/Türklingeln/metzler-tuerklingel-mit-gravur-led-taster-optional-stella.webp',
      options: [
        { id: 'size', label: 'Größe', type: 'radio', variant: 'size', required: true, def: '8', choices: [
          { v: '6', label: '6 × 6 cm', sub: 'Kompakt', d: 0 }, { v: '8', label: '8 × 8 cm', sub: 'Standard', d: 6 },
          { v: '10', label: '10 × 10 cm', sub: 'Groß', d: 12 }, { v: '11', label: '11 × 11 cm', sub: 'XL', d: 18 } ] },
        { id: 'led', label: 'LED-Taster', type: 'radio', variant: 'taster', def: 'no', choices: [
          { v: 'no',     label: 'Ohne Beleuchtung', sub: 'Gebürsteter Edelstahl', d: 0,  img: 'assets/taster/taster-none.webp',   glow: null },
          { v: 'white',  label: 'LED Weiß',          sub: 'Neutralweißer Ring',   d: 14, img: 'assets/taster/taster-white.webp',  glow: '#dfe4ea' },
          { v: 'blue',   label: 'LED Blau',          sub: 'Kühles Blau',          d: 14, img: 'assets/taster/taster-blue.webp',   glow: '#2f6bff' },
          { v: 'red',    label: 'LED Rot',           sub: 'Signalrot',            d: 14, img: 'assets/taster/taster-red.webp',    glow: '#e5322d' },
          { v: 'green',  label: 'LED Grün',          sub: 'Frisches Grün',        d: 14, img: 'assets/taster/taster-green.webp',  glow: '#3fbf4f' },
          { v: 'yellow', label: 'LED Gelb',          sub: 'Warmes Gelb',          d: 14, img: 'assets/taster/taster-yellow.webp', glow: '#f5c518' } ] },
        { id: 'gravur', label: 'Gravur (Name)', type: 'text', placeholder: 'z. B. Familie Voßberg', hint: 'inklusive', d: 0 } ] },
    b: { key: 'b', name: 'Briefkasten „Siebert"', sub: 'hochwertiger Stahl · 37 × 37 × 10,5 cm · Art. 36621', base: 76.49,
      img: 'Bundled Product/Image/Breifkasten/metzler-briefkasten-aus-hochwertigem-stahl-siebert.webp',
      options: [
        { id: 'mount', label: 'Montage', type: 'radio', variant: 'photo', def: 'wall', choices: [
          { v: 'wall',     label: 'Wandmontage',      sub: 'An der Wand',        d: 0,  img: 'assets/mount/mount-ral7016.webp' },
          { v: 'complete', label: 'Standbriefkasten', sub: 'Komplett mit Rahmen', d: 89, img: 'assets/mount/mount-edelstahl.webp' },
          { v: 'ral7016',  label: 'Universal-Rahmen', sub: 'Anthrazit RAL 7016', d: 59, img: 'assets/mount/mount-ral7016.webp' },
          { v: '2er',      label: '2er-Rahmen',       sub: 'Edelstahl gebürstet', d: 69, img: 'assets/mount/mount-2er.webp' },
          { v: 'v2a',      label: 'V2A-Rahmen',       sub: 'Edelstahl rostfrei',  d: 79, img: 'assets/mount/mount-v2a.webp' },
          { v: 'pole',     label: 'Einbeton-Pfosten', sub: 'Zum Einbetonieren',   d: 49, img: 'assets/mount/mount-pole.webp' } ] },
        { id: 'gravur', label: 'Namensgravur', type: 'text', placeholder: 'z. B. Voßberg', hint: 'inklusive', d: 0 } ] }
  };

  var state = { finishA: null, finishB: null, diverged: false, qty: 1, a: {}, b: {} };
  ['a', 'b'].forEach(function (k) { PRODUCTS[k].options.forEach(function (o) { state[k][o.id] = o.type === 'radio' ? o.def : ''; }); });

  var clamp = function (n, lo, hi) { return Math.max(lo, Math.min(hi, n)); };
  var eur = function (n) { return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var swatchStyle = function (f) { return f.img ? "background-image:url('" + f.img + "')" : 'background:' + (f.chip || '#ccc'); };
  function optDelta(k, o) { if (o.type === 'radio') { var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0]; return c ? c.d : 0; } return o.d || 0; }
  function productTotal(k) { var t = PRODUCTS[k].base; PRODUCTS[k].options.forEach(function (o) { t += optDelta(k, o); }); return t; }
  function finishFor(k) { return byId(k === 'a' ? state.finishA : state.finishB); }
  function bothChosen() { return !!state.finishA && !!state.finishB; }

  /* primary buy row = qty stepper + "Set in den Warenkorb" CTA, laid out with the
     single-product PDP .cfgb-buyrow (stepper hidden until a set colour is chosen). */
  function buyRow(id, label) {
    var ready = bothChosen();
    return '<div class="cfgb-buyrow setbuy__row' + (ready ? '' : ' is-precolor') + '">' +
      '<span class="cfg-opt__qty cfgb-buyrow__qty" aria-label="Menge Set">' +
        '<button type="button" data-qd="-1" aria-label="Menge verringern"' + (state.qty <= 1 ? ' disabled' : '') + '>−</button>' +
        '<span class="setbuy__qtyval">' + state.qty + '</span>' +
        '<button type="button" data-qd="1" aria-label="Menge erhöhen">+</button>' +
      '</span>' +
      '<button type="button" class="setsum__cta setwiz__cta is-ready"' + (id ? ' id="' + id + '"' : '') + ' data-addcart>' + (label || '') + '</button>' +
    '</div>';
  }
  function applyQty(d) { var q = clamp(state.qty + d, 1, 20); if (q !== state.qty) { state.qty = q; refresh(); } }

  /* ---- finish rail ----
     Mirrors the single-product PDP colour section (flow-b) exactly: the same
     .bx-color header ("Farbe: · <name>"), the .bx-swatches image-tile grid with
     the travelling ".bx-swline" magic-line indicator (hover-driven on desktop),
     the "Alle Farben mit Bezeichnung ansehen" link that opens the labelled side
     window (#colorwin), and the explanatory note. Selection is shared across both
     set products. */
  var syncColorwin = function () {};
  function finishLabel(f) { return f.name + (f.code ? ' ' + f.code : ''); }
  function swatchInner(f) {
    return f.img ? '<img src="' + f.img + '" alt="' + esc(f.name) + '">'
                 : '<span class="pdp-swatch__fill" style="' + swatchStyle(f) + '"></span>';
  }
  function railTile(f, attr, solo) {
    var label = finishLabel(f);
    var mat = f.mat ? " style=\"background-image:url('assets/materials/" + f.mat + "')\"" : '';
    var inner = f.mat ? '' : swatchInner(f);   /* v4: material texture as the tile background, no photo */
    return '<button type="button" class="pdp-swatch' + (f.mat ? ' pdp-swatch--mat' : '') + (solo ? ' pdp-swatch--solo' : '') + '" ' + attr + '="' + f.id + '"' + mat +
      ' aria-pressed="false" aria-label="' + esc(label) + (solo ? ' – nur für den Briefkasten, bricht das Set' : '') + '" title="' + esc(label) + '">' +
      inner +
      '<span class="pdp-swatch__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>' +
      (solo ? '<span class="pdp-swatch__break">bricht das Set</span>' : '') + '</button>';
  }
  function renderRail() {
    var el = document.getElementById('setfin');
    var swatches = SHARED.map(function (f) { return railTile(f, 'data-fin', false); }).join('');
    el.innerHTML =
      '<div class="setfin__head"><span class="setfin__cap">Ausführung · Set-Farbe</span>' +
      '<h2 class="setfin__title">Ein Farbton für beide Produkte</h2>' +
      '<p class="setfin__sub">Diese <b>' + SHARED.length + ' Töne</b> sind für Türklingel und Briefkasten abgestimmt.</p></div>' +
      '<div class="bx-color">' +
        '<div class="bx-color__head"><span class="bx-color__label">Farbe: <span class="bx-color__dot" id="setfinDot" hidden></span><b id="setfinName">Bitte Farbe wählen</b></span></div>' +
        '<div class="pdp-swatches bx-swatches" id="setfinSwatches" role="group" aria-label="Set-Farbe wählen – ein Farbton für beide Produkte">' +
          '<span class="bx-swline" aria-hidden="true"></span>' + swatches +
        '</div>' +
        '<button type="button" class="bx-listfield" id="setfinListLink" aria-haspopup="dialog" aria-expanded="false" aria-controls="colorwin">' +
          '<svg class="bx-listfield__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>' +
          '<span class="bx-listfield__text">Alle Farben mit Bezeichnung ansehen</span>' +
          '<span class="bx-listfield__thumb" id="setfinListThumb" aria-hidden="true"></span>' +
          '<svg class="bx-listfield__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>' +
        '</button>' +
        '<p class="bx-color__note">Der gewählte Farbton gilt für <b>beide Produkte</b> des Sets – Türklingel und Briefkasten werden im selben Ton gefertigt.</p>' +
      '</div>';
    el.addEventListener('click', onRailClick);
    // hover preview – name + magic-line follow the pointer, like the single-product PDP
    var grid = document.getElementById('setfinSwatches');
    grid.addEventListener('mouseover', function (e) { var b = e.target.closest('.pdp-swatch[data-fin]'); if (b) { previewName(byId(b.getAttribute('data-fin'))); moveSwline(b); } });
    grid.addEventListener('mouseleave', restoreName);
    grid.addEventListener('focusin', function (e) { var b = e.target.closest('.pdp-swatch[data-fin]'); if (b) { previewName(byId(b.getAttribute('data-fin'))); moveSwline(b); } });
    grid.addEventListener('focusout', restoreName);
    setupColorwin();
  }
  function selectFinish(id) {
    var f = byId(id); if (!f) return;
    state.finishA = state.finishB = f.id; state.diverged = false; refresh();
  }
  function onRailClick(e) {
    var b = e.target.closest('.pdp-swatch[data-fin]'); if (!b) return;
    selectFinish(b.getAttribute('data-fin'));
  }
  function setName(txt) { var n = document.getElementById('setfinName'); if (n) n.textContent = txt; }
  function previewName(f) { if (f) setName(finishLabel(f)); }
  function restoreName() { var f = byId(state.finishA); setName(f ? finishLabel(f) : 'Bitte Farbe wählen'); restoreSwline(); }
  function moveSwline(swatch) {
    var grid = document.getElementById('setfinSwatches'); if (!grid) return;
    var line = grid.querySelector('.bx-swline'); if (!line) return;
    if (!swatch) { line.classList.remove('is-on'); return; }
    line.style.transform = 'translate(' + Math.round(swatch.offsetLeft) + 'px,' + Math.round(swatch.offsetTop) + 'px)';
    line.classList.add('is-on');
  }
  function restoreSwline() {
    var sel = document.querySelector('#setfinSwatches .pdp-swatch[aria-pressed="true"]');
    moveSwline(sel || null);
  }

  /* labelled side window (#colorwin) – rebuilt from the shared set finishes */
  function setupColorwin() {
    var win = document.getElementById('colorwin'), link = document.getElementById('setfinListLink');
    if (!win || !link) return;
    var list = win.querySelector('.colorwin__list');
    if (list) list.innerHTML = SHARED.map(function (f) {
      return '<button type="button" class="colorwin__row" role="option" aria-selected="false" data-fin="' + f.id + '">' +
        '<span class="colorwin__sw"><img src="' + (f.mat ? 'assets/materials/' + f.mat : f.img) + '" alt=""></span>' +
        '<span class="colorwin__text"><span class="colorwin__name">' + esc(f.name) + '</span>' + (f.code ? '<span class="colorwin__code">' + f.code + '</span>' : '') + '</span>' +
        '<span class="colorwin__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span></button>';
    }).join('');
    var lastFocus = null;
    function isOpen() { return win.classList.contains('is-open'); }
    function open() {
      win.classList.add('is-open'); win.setAttribute('aria-hidden', 'false'); link.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden'; lastFocus = link; syncColorwin();
      var t = win.querySelector('.colorwin__row.is-selected') || win.querySelector('.colorwin__row'); if (t) t.focus({ preventScroll: true });
    }
    function close() {
      win.classList.remove('is-open'); win.setAttribute('aria-hidden', 'true'); link.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = ''; if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    link.addEventListener('click', function () { isOpen() ? close() : open(); });
    win.addEventListener('click', function (e) {
      if (e.target.closest('[data-cw-close]')) { close(); return; }
      var row = e.target.closest('.colorwin__row'); if (row) { selectFinish(row.getAttribute('data-fin')); close(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) close(); });
    syncColorwin = function () {
      [].slice.call(win.querySelectorAll('.colorwin__row')).forEach(function (r) {
        var on = !state.diverged && r.getAttribute('data-fin') === state.finishA;
        r.classList.toggle('is-selected', on); r.setAttribute('aria-selected', on ? 'true' : 'false');
      });
    };
  }

  function refreshRail() {
    document.querySelectorAll('#setfin .pdp-swatch[data-fin]').forEach(function (b) {
      var id = b.getAttribute('data-fin');
      var on = (id === state.finishA && id === state.finishB) || (state.diverged && id === state.finishB);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    restoreName();
    var thumb = document.getElementById('setfinListThumb');
    if (thumb) { var f = !state.diverged && byId(state.finishA); thumb.innerHTML = (f && f.mat) ? '<img src="assets/materials/' + f.mat + '" alt="">' : ''; }
    syncColorwin();
  }

  /* ---- product panels · premium .stepr accordion (single-product configurator) ---- */
  function optPickText(k, o) {
    if (o.type === 'radio') { var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0];
      return c ? (c.label + (c.d ? ' · +' + eur(c.d) : ' · inklusive')) : (o.required ? 'Bitte wählen' : 'Keine Auswahl'); }
    return state[k][o.id] ? '„' + state[k][o.id] + '"' : 'Ohne Gravur';
  }
  function optRow(k, o, c) {
    var price = c.d ? '<span class="cfg-opt__price">+' + eur(c.d) + '</span>' : '<span class="cfg-opt__price is-incl">inklusive</span>';
    var dot = c.dot ? '<span class="cfg-opt__dot" style="background:' + c.dot + '"></span>' : '';
    return '<button type="button" class="cfg-opt" role="radio" aria-checked="false" data-opt="' + o.id + '" data-val="' + c.v + '">' +
      '<span class="cfg-opt__mark"></span><span class="cfg-opt__body"><span class="cfg-opt__name">' + esc(c.label) + '</span></span>' + dot + price + '</button>';
  }
  /* ---- premium visual option cards — one shared system (.cfg-tstr card chrome:
     border, hover lift, teal selected state, check badge). Each variant swaps only
     the "stage" (the visual): a product photo (taster/photo) or a CSS render (size). ---- */
  var OPT_CHECK = '<span class="cfg-tstr__check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span>';
  var MOUNT_ICON = {
    wall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18"/><rect x="7" y="5" width="10" height="11" rx="1.2"/><path d="M9 16v4M15 16v4M9.5 9h5M9.5 12h5"/></svg>',
    stand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="3.5" width="12" height="9" rx="1.2"/><path d="M8.5 8h7"/><path d="M12 12.5V21M9 21h6"/></svg>'
  };
  function cardMeta(c, chip) {
    var price = c.d ? '<span class="cfg-tstr__price">+' + eur(c.d) + '</span>' : '<span class="cfg-tstr__price is-incl">inklusive</span>';
    var sub = !c.sub ? '' : chip
      ? '<span class="cfg-tstr__key"><span class="cfg-tstr__chip"></span><span class="cfg-tstr__sub">' + esc(c.sub) + '</span></span>'
      : '<span class="cfg-tstr__sub">' + esc(c.sub) + '</span>';
    return '<span class="cfg-tstr__meta"><span class="cfg-tstr__name">' + esc(c.label) + '</span>' + sub + price + '</span>';
  }
  function cardOpen(k, o, c, cls, style) {
    return '<button type="button" class="cfg-opt cfg-tstr ' + cls + '" role="radio" aria-checked="false" aria-label="' + esc(c.label) +
      '" data-opt="' + o.id + '" data-val="' + c.v + '"' + (style || '') + '>' + OPT_CHECK;
  }
  function tasterCard(k, o, c) {
    return cardOpen(k, o, c, 'cfg-photo', c.glow ? ' style="--tstr-glow:' + c.glow + '"' : '') +
      '<span class="cfg-tstr__stage"><img src="' + c.img + '" alt="Metzler Taster – ' + esc(c.label) + '" loading="lazy"></span>' +
      cardMeta(c, true) + '</button>';
  }
  function photoCard(k, o, c) {
    var stage = c.img
      ? '<span class="cfg-tstr__stage"><img src="' + c.img + '" alt="' + esc(c.label) + '" loading="lazy"></span>'
      : '<span class="cfg-tstr__stage cfg-tstr__stage--icon">' + (MOUNT_ICON[c.icon] || '') + '</span>';
    return cardOpen(k, o, c, 'cfg-photo') + stage + cardMeta(c) + '</button>';
  }
  var SIZE_IMG = 'assets/size/stella-plate.webp';
  function sizeCard(k, o, c) {
    var sz = (parseInt(c.v, 10) - 6) / 5;   /* 6→0 … 11→1, drives the real-photo scale */
    return cardOpen(k, o, c, 'cfg-size') +
      '<span class="cfg-size__stage"><img class="cfg-size__img" src="' + SIZE_IMG + '" alt="Metzler Türklingel „Stella" – ' + esc(c.label) + '" loading="lazy" style="--sz:' + sz.toFixed(3) + '"></span>' +
      cardMeta(c) + '</button>';
  }
  /* text option → premium field (engraving-pen icon inside the input) */
  function textField(k, o) {
    var name = k + '-' + o.id, val = state[k][o.id] || '';
    return '<div class="cfgb-field is-shown setgrv">' +
      '<div class="setgrv__field">' +
        '<svg class="setgrv__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>' +
        '<input type="text" class="cfg-input setgrv__input" name="' + name + '" placeholder="' + esc(o.placeholder || '') + '" value="' + esc(val) + '" maxlength="24" autocomplete="off">' +
      '</div>' +
    '</div>';
  }
  function optGrid(cls, label, o, render) {
    return '<div class="cfg-tstr-grid ' + cls + '" role="radiogroup" aria-label="' + esc(label) + '">' + o.choices.map(render).join('') + '</div>';
  }
  function optBody(k, o) {
    if (o.type === 'text') return textField(k, o);
    if (o.variant === 'taster') return optGrid('cfg-tstr-grid--3', o.label, o, function (c) { return tasterCard(k, o, c); });
    if (o.variant === 'size')   return optGrid('cfg-size-grid',   o.label, o, function (c) { return sizeCard(k, o, c); });
    if (o.variant === 'photo')  return optGrid('cfg-photo-grid',  o.label, o, function (c) { return photoCard(k, o, c); });
    return '<div class="cfg-opts" role="radiogroup" aria-label="' + esc(o.label) + '">' + o.choices.map(function (c) { return optRow(k, o, c); }).join('') + '</div>';
  }
  function collapseSteps(el) {
    el.querySelectorAll('.stepr__item').forEach(function (it) { it.classList.remove('is-active'); it.classList.add('is-done');
      var h = it.querySelector('.stepr__head'); if (h) h.setAttribute('aria-expanded', 'false'); });
  }
  function openStep(item) { if (!item) return; item.classList.add('is-active'); item.classList.remove('is-done');
    var h = item.querySelector('.stepr__head'); if (h) h.setAttribute('aria-expanded', 'true'); }
  function toggleStep(el, item) { var was = item.classList.contains('is-active'), prev = el.querySelector('.stepr__item.is-active');
    collapseSteps(el); if (!was) { openStep(item); scrollStepIntoView(prev, item); } }
  function advanceStep(el, item) { collapseSteps(el); var nx = item && item.nextElementSibling;
    if (nx && nx.classList.contains('stepr__item')) { openStep(nx); scrollStepIntoView(item, nx); } }
  /* after auto-advance, land precisely on the new step: wait for the accordion
     collapse/expand to settle (its grid-rows transition), then bring the step head
     just below the sticky site-header + progress dock. */
  function scrollStepIntoView(prevItem, nextItem) {
    var head = nextItem.querySelector('.stepr__head') || nextItem, done = false;
    var run = function () {
      if (done) return; done = true;
      var header = document.querySelector('.header'), dock = document.getElementById('setSteps');
      var off = (header ? header.getBoundingClientRect().height : 0) + (dock ? dock.getBoundingClientRect().height : 0) + 14;
      window.scrollTo({ top: Math.max(0, head.getBoundingClientRect().top + window.scrollY - off), behavior: 'smooth' });
    };
    var body = prevItem && prevItem.querySelector('.stepr__body');
    if (body) { var onEnd = function (ev) { if (ev.propertyName === 'grid-template-rows') { body.removeEventListener('transitionend', onEnd); run(); } };
      body.addEventListener('transitionend', onEnd); }
    setTimeout(run, 520);   /* fallback + reduced-motion (transition may not fire) */
  }

  function renderPanel(k) {
    var p = PRODUCTS[k], el = document.getElementById('prod' + k.toUpperCase());
    var steps = p.options.map(function (o, i) {
      var incl = (o.type === 'text' && o.hint) ? ' <span class="setopt__incl">' + esc(o.hint) + '</span>' : '';
      return '<li class="stepr__item' + (i === 0 ? ' is-active' : ' is-done') + '" data-optstep="' + o.id + '">' +
        '<button class="stepr__head" type="button" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
          '<span class="stepr__node"><span class="stepr__num">' + (i + 1) + '</span><svg class="stepr__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg></span>' +
          '<span class="stepr__titles"><span class="stepr__title">' + esc(o.label) + incl + '</span><span class="stepr__pick" id="pick-' + k + '-' + o.id + '"></span></span>' +
          '<span class="stepr__edit">Ändern</span>' +
          '<svg class="stepr__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
        '</button>' +
        '<div class="stepr__body"><div class="stepr__inner"><div class="stepr__pad">' + optBody(k, o) + '</div></div></div>' +
      '</li>';
    }).join('');
    var sep = k === 'a' ?
      '<div class="setprod__sep" id="sepA" hidden><span class="setprod__seplbl">Türklingel-Farbe separat wählen</span><div class="setprod__sepgrid">' +
        SHARED.map(function (f) { return railTile(f, 'data-fina', false); }).join('') +
      '</div><button type="button" class="setprod__relink" id="relinkA">Set wieder abstimmen</button></div>' : '';
    var nav = '<div class="setwiz__nav">' +
      (k === 'b'
        ? '<button type="button" class="setwiz__back" data-wizprev><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>Türklingel</button>'
        : '<span class="setwiz__spacer"></span>') +
      '<button type="button" class="setwiz__next" data-wiznext>' + (k === 'a' ? 'Weiter zum Briefkasten' : 'Weiter zur Übersicht') + '</button>' +
      '</div>' +
      '<div class="setwiz__details is-open" id="setdt-' + k + '"><div class="setwiz__detailsinner" id="setdtbody-' + k + '"></div></div>' +
      '<div class="setwiz__buy">' + buyRow('stepcta-' + k, '') + '</div>';
    el.innerHTML =
      '<div class="setprod__inner"><div class="setprod__head"><img class="setprod__img" src="' + p.img + '" alt="' + esc(p.name) + '">' +
      '<div class="setprod__id"><span class="setprod__cap">' + (k === 'a' ? 'Produkt 1' : 'Produkt 2') + '</span>' +
      '<h3 class="setprod__name">' + esc(p.name) + '</h3><p class="setprod__sub">' + esc(p.sub) + '</p></div>' +
      '<div class="setprod__price" id="price' + k + '"></div></div>' + sep +
      '<ol class="stepr setprod__steps">' + steps + '</ol>' + nav + '</div>';
    el.addEventListener('change', function (e) { var t = e.target; if (!t.name || t.name.indexOf(k + '-') !== 0) return; state[k][t.name.slice(2)] = t.value; refresh(); });
    el.addEventListener('input', function (e) { var t = e.target; if (t.type !== 'text' || !t.name || t.name.indexOf(k + '-') !== 0) return;
      state[k][t.name.slice(2)] = t.value;
      refreshSummary(); refreshPick(k); });
    el.addEventListener('click', function (e) {
      var head = e.target.closest('.stepr__head'); if (head) { toggleStep(el, head.closest('.stepr__item')); return; }
      var opt = e.target.closest('.cfg-opt[data-opt]');
      if (opt) {
        var oid = opt.getAttribute('data-opt'), val = opt.getAttribute('data-val');
        var odef = PRODUCTS[k].options.filter(function (x) { return x.id === oid; })[0];
        /* optional options toggle off when their selected card is pressed again;
           required options (Größe, Anschluss) always keep a selection. */
        if (odef && !odef.required && state[k][oid] === val) { state[k][oid] = ''; refresh(); return; }
        state[k][oid] = val; refresh(); advanceStep(el, opt.closest('.stepr__item')); return;
      }
      if (k === 'a') { var s = e.target.closest('[data-fina]'); if (s) { state.finishA = s.getAttribute('data-fina'); refresh(); return; }
        if (e.target.id === 'relinkA') { state.diverged = false; state.finishA = state.finishB = (byId(state.finishB) && byId(state.finishB).a ? state.finishB : SHARED[0].id); refresh(); } }
    });
  }
  function refreshPick(k) {
    PRODUCTS[k].options.forEach(function (o) { var pk = document.getElementById('pick-' + k + '-' + o.id); if (pk) pk.textContent = optPickText(k, o); });
  }
  function refreshPanel(k) {
    var el = document.getElementById('prod' + k.toUpperCase()), f = finishFor(k);
    el.classList.toggle('is-set', !!f);
    var pr = document.getElementById('price' + k); if (pr) pr.innerHTML = '<span class="setprod__pricecap">Konfiguriert</span><b>' + eur(productTotal(k)) + '</b>';
    el.querySelectorAll('.cfg-opt[data-opt]').forEach(function (b) {
      var on = state[k][b.getAttribute('data-opt')] === b.getAttribute('data-val');
      b.classList.toggle('is-selected', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    refreshPick(k);
    if (k === 'a') { var sep = document.getElementById('sepA'); if (sep) sep.hidden = !state.diverged;
      el.querySelectorAll('[data-fina]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-fina') === state.finishA ? 'true' : 'false'); }); }
  }

  /* ---- itemised price breakdown (disclosure on the config steps) ----
     Lists each product's base price and every surcharge option that was added
     (radio deltas > 0) plus any inklusive personalisation, then the set discount
     and quantity-aware total. Shared by both product-step "Preisdetails" panels. */
  function priceBreakdown() {
    var q = state.qty, ready = bothChosen();
    var sub = (productTotal('a') + productTotal('b')) * q, disc = ready ? sub * SET_DISCOUNT : 0, total = sub - disc;
    /* configured-items card — product line + its chosen options (single-product live layout) */
    var items = ['a', 'b'].map(function (k) {
      var p = PRODUCTS[k];
      var opts = p.options.map(function (o) {
        if (o.type === 'radio') {
          var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0]; if (!c) return '';
          var val = c.d > 0 ? '<span class="setdt__oval">+ ' + eur(c.d) + '</span>' : '<span class="setdt__oval is-incl">inklusive</span>';
          return '<div class="setdt__opt"><span class="setdt__oname">' + esc(o.label) + ' · ' + esc(c.label) + '</span>' + val + '</div>';
        }
        var t = (state[k][o.id] || '').trim(); if (!t) return '';
        return '<div class="setdt__opt"><span class="setdt__oname">' + esc(o.label) + ' · „' + esc(t) + '"</span><span class="setdt__oval is-incl">inklusive</span></div>';
      }).join('');
      return '<div class="setdt__item"><span class="setdt__iname">' + esc(p.name) + '</span>' +
        '<span class="setdt__iprice">' + eur(productTotal(k)) + '</span></div>' + opts;
    }).join('');
    /* price summary — mirrors the live "Preis wie konfiguriert" block */
    return '<div class="setdt">' +
      '<div class="setdt__items">' + items + '</div>' +
      '<div class="setdt__sum">' +
        '<span class="setdt__eyebrow">Preis wie konfiguriert</span>' +
        '<div class="setdt__price">' + (ready ? '<s class="setdt__was">' + eur(sub) + '</s>' : '') +
          '<b>' + eur(total) + '</b>' + (q > 1 ? '<span class="setdt__mult">' + q + '&nbsp;×</span>' : '') + '</div>' +
        (ready ? '<p class="setdt__save">Set-Rabatt −10&nbsp;% · <b>−' + eur(disc) + '</b></p>' : '') +
        '<p class="setdt__meta">inkl. 19% USt. · <a href="#">zzgl. Versand</a></p>' +
        '<p class="setdt__avail">Sofort verfügbar</p>' +
      '</div>' +
    '</div>';
  }

  /* ---- combined summary ---- */
  function lineItems() {
    return ['a', 'b'].map(function (k) {
      var p = PRODUCTS[k], f = finishFor(k);
      var opts = p.options.filter(function (o) { return o.type === 'radio' && optDelta(k, o) > 0; }).map(function (o) {
        var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0];
        return '<span class="setsum__iopt">' + esc(o.label) + ': ' + esc(c.label) + ' <em>+' + eur(optDelta(k, o)) + '</em></span>';
      }).join('');
      var meta = f
        ? '<span class="setsum__imeta">' + esc(f.name) + (f.code ? ' · ' + f.code : '') + '</span>'
        : '';
      return '<div class="setsum__item">' +
        '<span class="setsum__ithumb"><img src="' + p.img + '" alt="" loading="lazy"></span>' +
        '<div class="setsum__imain"><span class="setsum__iname">' + esc(p.name) + '</span>' +
          meta +
          (opts ? '<span class="setsum__iopts">' + opts + '</span>' : '') +
        '</div>' +
        '<span class="setsum__iprice">' + (state.qty > 1 ? '<span class="setsum__iqty">' + state.qty + '×&nbsp;</span>' : '') + eur(productTotal(k) * state.qty) + '</span></div>';
    }).join('');
  }
  /* lead price panel at the top of the buy column (single-product PDP position) */
  function refreshLead() {
    var el = document.getElementById('setLead'); if (!el) return;
    var sub = (productTotal('a') + productTotal('b')) * state.qty, ready = bothChosen(), disc = ready ? sub * SET_DISCOUNT : 0, total = sub - disc;
    el.innerHTML = '<div class="pdp-price pdp-price--lead">' +
      (ready ? '<span class="pdp-offer"><b class="pdp-offer__pct">−10&nbsp;%</b><span class="pdp-offer__dur">Set-Vorteil</span></span>' : '') +
      (ready ? '<span class="cfgb-price__label">Preis wie konfiguriert</span>' : '') +
      '<div class="pdp-price__row">' +
        (ready ? '' : '<span class="pdp-price__from">ab</span>') +
        '<b class="pdp-price__amount" aria-live="polite">' + eur(total) + '</b>' +
        (ready ? '<s class="pdp-price__was" aria-label="Regulärer Preis">' + eur(sub) + '</s>' : '') +
      '</div>' +
      '<p class="pdp-price__meta">inkl. 19% USt. · <a href="#">Versandkostenfreie Lieferung</a></p>' +
      '<div class="pdp-avail"><span class="pdp-avail__status">Sofort verfügbar</span></div>' +
    '</div>';
  }
  function refreshSummary() {
    var el = document.getElementById('setsum');
    var q = state.qty, ready = bothChosen();
    var sub = (productTotal('a') + productTotal('b')) * q, disc = ready ? sub * SET_DISCOUNT : 0, total = sub - disc;
    el.innerHTML = '<button type="button" class="setwiz__back setsum__back" data-wizprev><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>Zurück zum Briefkasten</button>' +
      '<div class="setsum__card">' +
      '<h2 class="setsum__title">Ihr Set</h2>' +
      '<div class="setsum__items">' + lineItems() + '</div>' +
      '<div class="setsum__rows">' +
        '<div class="setsum__row"><span>Zwischensumme</span><span>' + eur(sub) + '</span></div>' +
        (ready ? '<div class="setsum__row setsum__row--disc"><span>Set-Rabatt <em>−10&nbsp;%</em></span><span>−' + eur(disc) + '</span></div>' : '') +
      '</div>' +
      '<div class="setsum__total"><div class="setsum__totl"><span class="setsum__totcap">Gesamt</span><span class="setsum__totvat">inkl. MwSt.</span></div>' +
        '<div class="setsum__totr">' + (ready ? '<span class="setsum__totwas">' + eur(sub) + '</span>' : '') + '<b id="setTotal" class="setsum__totnow">' + eur(total) + '</b></div></div>' +
      buyRow('', ready ? 'Set in den Warenkorb' : 'Bitte Set-Farbe wählen') +
      '</div>' +
      '<div class="bx-delivery setsum__delivery" aria-label="Versand und Lieferung">' +
        '<div class="bx-delivery__row"><span class="bx-delivery__key"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>Versanddatum</span><span class="bx-delivery__val"><b class="ph">TT.MM. – TT.MM.</b></span></div>' +
        '<div class="bx-delivery__row"><span class="bx-delivery__key"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>Lieferung</span><span class="bx-delivery__val"><b class="bx-delivery__free">Gratis Versand</b> · ab 99 € <a href="#" class="bx-delivery__details">Details</a></span></div>' +
      '</div>';
  }

  /* ---- horizontal wizard: one step visible at a time; the single-product PDP
     progress component (.cfgb-dock chevron ribbon) plus "Weiter"/tabs navigate.
     Steps: Türklingel → Briefkasten → Übersicht. ---- */
  var STEPS = [
    { id: 'prodA', label: 'Türklingel', flag: 'anpassbar', opt: true },
    { id: 'prodB', label: 'Briefkasten', flag: 'anpassbar', opt: true },
    { id: 'setsum', label: 'Übersicht', flag: 'Zusammenfassung', opt: true }
  ];
  var currentStepId = 'prodA';
  var maxReached = 0;                        /* furthest step reached (single-product model) */
  function stepIndex(id) { for (var i = 0; i < STEPS.length; i++) if (STEPS[i].id === id) return i; return 0; }
  function paintSteps() {
    var cur = stepIndex(currentStepId);
    /* on the last step, once the set is complete it reads as done (not "current") */
    var lastDone = cur === STEPS.length - 1 && bothChosen();
    STEPS.forEach(function (s, i) {
      var b = document.querySelector('#setSteps .cfgb-bar__step[data-step="' + s.id + '"]'); if (!b) return;
      b.classList.toggle('is-filled', i <= maxReached);        /* every reached step stays done, incl. current */
      b.classList.toggle('is-current', i === cur && !lastDone);/* is-current overrides is-filled in the CSS */
      if (i === cur) b.setAttribute('aria-current', 'step'); else b.setAttribute('aria-current', 'false');
    });
    var s = STEPS[cur];
    var n = document.getElementById('setStepN'); if (n) n.textContent = 'Schritt ' + (cur + 1) + ' von ' + STEPS.length;
    var nm = document.getElementById('setStepName'); if (nm) nm.textContent = s.label;
    var fl = document.getElementById('setStepFlag'); if (fl) { fl.textContent = s.flag; fl.classList.toggle('is-opt', !!s.opt); }
  }
  function showStep(id, scroll) {
    if (stepIndex(id) < 0) id = 'prodA';
    currentStepId = id;
    maxReached = Math.max(maxReached, stepIndex(id));
    ['prodA', 'prodB', 'setsum'].forEach(function (sid) { var n = document.getElementById(sid); if (n) n.hidden = (sid !== id); });
    paintSteps();
    if (scroll) {
      var wiz = document.querySelector('.setwiz'), header = document.querySelector('.header');
      if (wiz) {
        var offset = (header ? Math.round(header.getBoundingClientRect().height) : 65) + 10;
        window.scrollTo({ top: Math.max(0, wiz.getBoundingClientRect().top + window.scrollY - offset), behavior: 'smooth' });
      }
    }
  }
  function renderSteps() {
    var el = document.getElementById('setSteps'); if (!el) return;
    el.className = 'cfgb-dock';
    el.innerHTML =
      '<div class="cfgb-bar__track" role="tablist" aria-label="Konfigurationsschritte">' +
        STEPS.map(function (s, i) {
          return '<button type="button" class="cfgb-bar__step" data-step="' + s.id + '" aria-label="Schritt ' + (i + 1) + ': ' + esc(s.label) + '">' +
            '<span class="cfgb-bar__num">' + (i + 1) + '</span><span class="cfgb-bar__label">' + esc(s.label) + '</span></button>';
        }).join('') +
      '</div>' +
      '<div class="cfgb-dock__title" role="status" aria-live="polite">' +
        '<span class="cfgb-dock__titletext"><span class="cfgb-dock__n" id="setStepN"></span>' +
        '<span class="cfgb-dock__name"><span id="setStepName"></span></span></span>' +
        '<span class="cfgb-dock__flag" id="setStepFlag"></span>' +
      '</div>';
  }
  function refreshWizTotals() {
    var ready = bothChosen();
    var breakdown = priceBreakdown();
    ['a', 'b'].forEach(function (k) {
      var dt = document.getElementById('setdtbody-' + k); if (dt) dt.innerHTML = breakdown;
      var cta = document.getElementById('stepcta-' + k); if (cta) cta.textContent = ready ? 'Set in den Warenkorb' : 'Bitte Set-Farbe wählen';
      var row = document.querySelector('#prod' + k.toUpperCase() + ' .setbuy__row');
      if (row) {
        row.classList.toggle('is-precolor', !ready);
        var val = row.querySelector('.setbuy__qtyval'); if (val) val.textContent = state.qty;
        var minus = row.querySelector('button[data-qd="-1"]'); if (minus) minus.disabled = state.qty <= 1;
      }
    });
  }
  function refreshSteps() { paintSteps(); refreshWizTotals(); }

  /* wizard navigation: progress-bar tabs + Weiter/Zurück (delegated on the config column) */
  var cfgRoot = document.querySelector('.setcfg');
  if (cfgRoot) cfgRoot.addEventListener('click', function (e) {
    var tab = e.target.closest('#setSteps .cfgb-bar__step');
    if (tab) { showStep(tab.getAttribute('data-step'), true); return; }
    if (e.target.closest('[data-wiznext]')) { showStep(STEPS[Math.min(stepIndex(currentStepId) + 1, STEPS.length - 1)].id, true); return; }
    if (e.target.closest('[data-wizprev]')) { showStep(STEPS[Math.max(stepIndex(currentStepId) - 1, 0)].id, true); return; }
    var qd = e.target.closest('button[data-qd]');
    if (qd) { applyQty(parseInt(qd.getAttribute('data-qd'), 10)); return; }
    if (e.target.closest('[data-addcart]')) { addSetToCart(); return; }
  });

  /* ---- bottom sticky price bar (from the single-product PDP): reveals once the
     configurator has scrolled out of view; mirrors the set finish + running total. ---- */
  function syncSticky() {
    var fin = document.getElementById('pdpStickyFinish');
    if (fin) { var f = !state.diverged && byId(state.finishA); fin.textContent = f ? finishLabel(f) : 'Farbe wählen'; }
    var sub = (productTotal('a') + productTotal('b')) * state.qty, ready = bothChosen(), total = ready ? sub * (1 - SET_DISCOUNT) : sub;
    var pr = document.getElementById('bStickyPrice'); if (pr) pr.innerHTML = (ready ? 'Set · ' : 'ab ') + '<b>' + eur(total) + '</b>';
    var lbl = document.getElementById('pdpStickyLabel'); if (lbl) lbl.textContent = ready ? 'In den Warenkorb' : 'Bitte Set-Farbe wählen';
    var cta = document.getElementById('pdpStickyCta'); if (cta) cta.setAttribute('data-mode', ready ? 'cart' : 'color');
  }
  /* CTA: always live, validate on click (single-product PDP logic) – missing colour
     surfaces at the swatches; otherwise the set is added to the cart. */
  function addSetToCart() {
    if (!bothChosen()) {
      var sw = document.getElementById('setfinSwatches');
      if (sw) { sw.classList.remove('is-invalid'); void sw.offsetWidth; sw.classList.add('is-invalid'); }
      var s = document.getElementById('setfin');
      if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'center' });
        s.classList.remove('setfin--hl'); void s.offsetWidth; s.classList.add('setfin--hl'); setTimeout(function () { s.classList.remove('setfin--hl'); }, 1600); }
      return;
    }
    var badge = document.querySelector('.header .icon-btn[aria-label="Warenkorb"] .badge') || document.querySelector('.header .badge');
    if (badge) badge.textContent = (parseInt(badge.textContent, 10) || 0) + 1;
  }
  function setupSticky() {
    var bar = document.getElementById('pdpStickyBar'); if (!bar) return;
    /* reveal as soon as the primary CTA of the active step leaves the viewport (the
       single-product PDP anchors its sticky bar to the buy CTA, not the whole card). */
    var reveal = function () {
      var ctas = document.querySelectorAll('.setwiz__stage [data-addcart]'), cta = null;
      for (var i = 0; i < ctas.length; i++) { if (ctas[i].offsetParent) { cta = ctas[i]; break; } }
      var show = !!cta && cta.getBoundingClientRect().bottom <= 8;
      bar.classList.toggle('is-visible', show); bar.setAttribute('aria-hidden', show ? 'false' : 'true');
    };
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal, { passive: true });
    reveal();
    var cta = document.getElementById('pdpStickyCta'); if (cta) cta.addEventListener('click', addSetToCart);
    var det = document.getElementById('bStickyDetails'); if (det) det.addEventListener('click', function () { showStep('setsum', true); });
  }
  /* sticky progress bar: keep the dock pinned flush under the (variable-height) site
     header while the configurator card is in view; flag pinned for the elevation. */
  function setupStickyDock() {
    var dock = document.getElementById('setSteps'), header = document.querySelector('.header'), wiz = document.querySelector('.setwiz');
    if (!dock || !wiz) return;
    var update = function () {
      var h = header ? Math.round(header.getBoundingClientRect().height) : 88;
      document.documentElement.style.setProperty('--set-dock-top', h + 'px');
      var top = dock.getBoundingClientRect().top;
      dock.classList.toggle('is-pinned', Math.abs(top - h) <= 1.5 && wiz.getBoundingClientRect().bottom > h + dock.offsetHeight);
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function refresh() { refreshLead(); refreshRail(); refreshPanel('a'); refreshPanel('b'); refreshSummary(); refreshSteps(); syncSticky(); }
  renderRail(); renderPanel('a'); renderPanel('b'); renderSteps(); refresh(); showStep('prodA', false); setupSticky(); setupStickyDock();
})();
