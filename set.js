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
    { id: 'ral7016', name: 'Anthrazitgrau',      code: 'RAL 7016', img: 'assets/swatches/anthrazit-ral7016.jpg',   a: true, b: true },
    { id: 'ral9016', name: 'Verkehrsweiß',       code: 'RAL 9016', img: 'assets/swatches/verkehrsweiss-ral9016.jpg', a: true, b: true },
    { id: 'ral9007', name: 'Graualuminium',      code: 'RAL 9007', img: 'assets/swatches/graualuminium-ral9007.jpg', a: true, b: true },
    { id: 'db703',   name: 'Eisenglimmer',       code: 'DB 703',   img: 'assets/swatches/eisenglimmer-db703.jpg',   a: true, b: true },
    { id: 'ral9005', name: 'Tiefschwarz',        code: 'RAL 9005', img: 'assets/swatches/tiefschwarz-ral9005.jpg',  a: true, b: true },
    { id: 'edelstahl', name: 'Edelstahl gebürstet', code: '',      img: 'assets/swatches/edelstahl-gebuerstet.jpg', a: true, b: true },
    { id: 'ral7012', name: 'Basaltgrau',         code: 'RAL 7012', chip: '#4c5155', a: false, b: true },
    { id: 'wunsch',  name: 'Wunschfarbe nach RAL', code: '',       img: 'assets/swatches/wunschfarbe-nach-ral.jpg', a: false, b: true }
  ];
  var byId = function (id) { for (var i = 0; i < FINISHES.length; i++) if (FINISHES[i].id === id) return FINISHES[i]; return null; };
  var SHARED = FINISHES.filter(function (f) { return f.a && f.b; });

  var PRODUCTS = {
    a: { key: 'a', name: 'Türklingel „Stella"', sub: 'mit Gravur + LED-Taster · Art. 35875', base: 24.99,
      img: 'Bundled Product/Image/Türklingeln/metzler-tuerklingel-mit-gravur-led-taster-optional-stella.webp',
      options: [
        { id: 'size', label: 'Größe', type: 'radio', def: '8', choices: [
          { v: '6', label: '6 × 6 cm', d: 0 }, { v: '8', label: '8 × 8 cm', d: 6 }, { v: '10', label: '10 × 10 cm', d: 12 }, { v: '11', label: '11 × 11 cm', d: 18 } ] },
        { id: 'led', label: 'LED-Taster', type: 'radio', def: 'no', choices: [
          { v: 'no', label: 'Ohne Beleuchtung', d: 0 }, { v: 'white', label: 'LED Weiß', d: 14, dot: '#f2f4f7' }, { v: 'blue', label: 'LED Blau', d: 14, dot: '#2f6bff' } ] },
        { id: 'gravur', label: 'Gravur (Name)', type: 'text', placeholder: 'z. B. Familie Voßberg', hint: 'inklusive', d: 0 } ] },
    b: { key: 'b', name: 'Briefkasten „Siebert"', sub: 'hochwertiger Stahl · 37 × 37 × 10,5 cm · Art. 36621', base: 76.49,
      img: 'Bundled Product/Image/Breifkasten/metzler-briefkasten-aus-hochwertigem-stahl-siebert.webp',
      options: [
        { id: 'mount', label: 'Montage', type: 'radio', def: 'wall', choices: [
          { v: 'wall', label: 'Wandmontage', d: 0 }, { v: 'stand', label: 'Standbriefkasten mit Pfosten', d: 59 } ] },
        { id: 'gravur', label: 'Namensgravur', type: 'text', placeholder: 'z. B. Voßberg', hint: 'inklusive', d: 0 } ] }
  };

  var state = { finishA: null, finishB: null, diverged: false, a: {}, b: {} };
  ['a', 'b'].forEach(function (k) { PRODUCTS[k].options.forEach(function (o) { state[k][o.id] = o.type === 'radio' ? o.def : ''; }); });

  var eur = function (n) { return n.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' }); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };
  var swatchStyle = function (f) { return f.img ? "background-image:url('" + f.img + "')" : 'background:' + (f.chip || '#ccc'); };
  function optDelta(k, o) { if (o.type === 'radio') { var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0]; return c ? c.d : 0; } return o.d || 0; }
  function productTotal(k) { var t = PRODUCTS[k].base; PRODUCTS[k].options.forEach(function (o) { t += optDelta(k, o); }); return t; }
  function finishFor(k) { return byId(k === 'a' ? state.finishA : state.finishB); }
  function bothChosen() { return !!state.finishA && !!state.finishB; }

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
    return '<button type="button" class="pdp-swatch' + (solo ? ' pdp-swatch--solo' : '') + '" ' + attr + '="' + f.id + '"' +
      ' aria-pressed="false" aria-label="' + esc(label) + (solo ? ' – nur für den Briefkasten, bricht das Set' : '') + '" title="' + esc(label) + '">' +
      swatchInner(f) + (solo ? '<span class="pdp-swatch__break">bricht das Set</span>' : '') + '</button>';
  }
  function renderRail() {
    var el = document.getElementById('setfin');
    var swatches = SHARED.map(function (f) { return railTile(f, 'data-fin', false); }).join('');
    el.innerHTML =
      '<div class="setfin__head"><span class="setfin__cap">Schritt 1 · Set-Farbe</span>' +
      '<h2 class="setfin__title">Ein Farbton für beide Produkte</h2>' +
      '<p class="setfin__sub">Diese <b>' + SHARED.length + ' Töne</b> sind für Türklingel und Briefkasten abgestimmt.</p></div>' +
      '<div class="bx-color">' +
        '<div class="bx-color__head"><span class="bx-color__label">Farbe: <span class="bx-color__dot" id="setfinDot" hidden></span><b id="setfinName">Bitte Farbe wählen</b></span></div>' +
        '<div class="pdp-swatches bx-swatches" id="setfinSwatches" role="group" aria-label="Set-Farbe wählen – ein Farbton für beide Produkte">' +
          '<span class="bx-swline" aria-hidden="true"></span>' + swatches +
        '</div>' +
        '<button type="button" class="bx-color__listlink" id="setfinListLink" aria-haspopup="dialog" aria-expanded="false" aria-controls="colorwin">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>' +
          'Alle Farben mit Bezeichnung ansehen' +
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
        '<span class="colorwin__sw"><img src="' + f.img + '" alt=""></span>' +
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
    syncColorwin();
  }

  /* ---- product panels ---- */
  function renderPanel(k) {
    var p = PRODUCTS[k], el = document.getElementById('prod' + k.toUpperCase());
    var opts = p.options.map(function (o) {
      if (o.type === 'radio') {
        var rows = o.choices.map(function (c) {
          var price = c.d ? '<span class="cfg-opt__price">+' + eur(c.d) + '</span>' : '<span class="cfg-opt__price is-incl">inklusive</span>';
          var dot = c.dot ? '<span class="cfg-opt__dot" style="background:' + c.dot + '"></span>' : '';
          return '<button type="button" class="cfg-opt" role="radio" aria-checked="false" data-opt="' + o.id + '" data-val="' + c.v + '">' +
            '<span class="cfg-opt__mark"></span>' +
            '<span class="cfg-opt__body"><span class="cfg-opt__name">' + esc(c.label) + '</span></span>' +
            dot + price + '</button>';
        }).join('');
        return '<div class="setopt"><div class="setopt__lbl"><span class="setopt__name">' + esc(o.label) + '</span></div>' +
          '<div class="cfg-opts" role="radiogroup" aria-label="' + esc(o.label) + '">' + rows + '</div></div>';
      }
      var hint = o.hint ? '<span class="setopt__incl">' + esc(o.hint) + '</span>' : '';
      return '<div class="setopt"><div class="setopt__lbl"><span class="setopt__name">' + esc(o.label) + '</span>' + hint + '</div>' +
        '<div class="cfgb-field is-shown"><input type="text" class="cfg-input" name="' + k + '-' + o.id + '" placeholder="' + esc(o.placeholder || '') + '" value="' + esc(state[k][o.id]) + '" maxlength="24" autocomplete="off"></div></div>';
    }).join('');
    var sep = k === 'a' ?
      '<div class="setprod__sep" id="sepA" hidden><span class="setprod__seplbl">Türklingel-Farbe separat wählen</span><div class="setprod__sepgrid">' +
        SHARED.map(function (f) { return railTile(f, 'data-fina', false); }).join('') +
      '</div><button type="button" class="setprod__relink" id="relinkA">Set wieder abstimmen</button></div>' : '';
    el.innerHTML =
      '<div class="setprod__inner"><div class="setprod__head"><img class="setprod__img" src="' + p.img + '" alt="' + esc(p.name) + '">' +
      '<div class="setprod__id"><span class="setprod__cap">' + (k === 'a' ? 'Produkt 1' : 'Produkt 2') + '</span>' +
      '<h3 class="setprod__name">' + esc(p.name) + '</h3><p class="setprod__sub">' + esc(p.sub) + '</p>' +
      '<div class="setprod__finishslot" id="fin' + k + '"></div></div>' +
      '<div class="setprod__price" id="price' + k + '"></div></div>' + sep +
      '<button type="button" class="setprod__toggle" aria-expanded="true" aria-controls="opts' + k.toUpperCase() + '">' +
        '<span class="setprod__togglecap">Konfiguration</span>' +
        '<span class="setprod__togglesum" id="optsum' + k + '"></span>' +
        '<svg class="setprod__chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
      '</button>' +
      '<div class="setprod__optswrap" id="opts' + k.toUpperCase() + '"><div class="setprod__opts">' + opts + '</div></div></div>';
    el.addEventListener('change', function (e) { var t = e.target; if (!t.name || t.name.indexOf(k + '-') !== 0) return; state[k][t.name.slice(2)] = t.value; refresh(); });
    el.addEventListener('input', function (e) { var t = e.target; if (t.type !== 'text' || !t.name || t.name.indexOf(k + '-') !== 0) return; state[k][t.name.slice(2)] = t.value; refreshSummary(); });
    el.addEventListener('click', function (e) {
      if (e.target.closest('[data-golock]')) { var s = document.getElementById('setfin');
        if (s) { s.scrollIntoView({ behavior: 'smooth', block: 'center' }); s.classList.remove('setfin--hl'); void s.offsetWidth; s.classList.add('setfin--hl');
          setTimeout(function () { s.classList.remove('setfin--hl'); }, 1600); } return; }
      var tg = e.target.closest('.setprod__toggle');
      if (tg) { var wrap = el.querySelector('.setprod__optswrap'); var exp = tg.getAttribute('aria-expanded') === 'true';
        tg.setAttribute('aria-expanded', exp ? 'false' : 'true'); if (wrap) wrap.classList.toggle('is-collapsed', exp); return; }
      var opt = e.target.closest('.cfg-opt[data-opt]');
      if (opt) { state[k][opt.getAttribute('data-opt')] = opt.getAttribute('data-val'); refresh(); }
    });
    if (k === 'a') el.addEventListener('click', function (e) {
      var s = e.target.closest('[data-fina]'); if (s) { state.finishA = s.getAttribute('data-fina'); refresh(); return; }
      if (e.target.id === 'relinkA') { state.diverged = false; state.finishA = state.finishB = (byId(state.finishB) && byId(state.finishB).a ? state.finishB : SHARED[0].id); refresh(); }
    });
  }
  function refreshPanel(k) {
    var el = document.getElementById('prod' + k.toUpperCase()), f = finishFor(k);
    el.classList.toggle('is-set', !!f);
    var fin = document.getElementById('fin' + k);
    if (fin) fin.innerHTML = f
      ? '<span class="setprod__inherit is-set"><span class="setprod__fchip" style="' + swatchStyle(f) + '"></span><span class="setprod__inheritlbl">Set-Farbe</span><span class="setprod__inheritval">' + esc(f.name) + (f.code ? ' · ' + f.code : '') + '</span></span>'
      : '<span class="setprod__inherit"><span class="setprod__fchip setprod__fchip--wait"></span>Übernimmt die Set-Farbe</span>';
    var pr = document.getElementById('price' + k); if (pr) pr.innerHTML = '<span class="setprod__pricecap">Konfiguriert</span><b>' + eur(productTotal(k)) + '</b>';
    el.querySelectorAll('.cfg-opt[data-opt]').forEach(function (b) {
      var on = state[k][b.getAttribute('data-opt')] === b.getAttribute('data-val');
      b.classList.toggle('is-selected', on); b.setAttribute('aria-checked', on ? 'true' : 'false');
    });
    var sum = document.getElementById('optsum' + k);
    if (sum) sum.textContent = PRODUCTS[k].options.filter(function (o) { return o.type === 'radio'; }).map(function (o) {
      var c = o.choices.filter(function (x) { return x.v === state[k][o.id]; })[0]; return c ? c.label : '';
    }).filter(Boolean).join(' · ');
    if (k === 'a') { var sep = document.getElementById('sepA'); if (sep) sep.hidden = !state.diverged;
      el.querySelectorAll('[data-fina]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-fina') === state.finishA ? 'true' : 'false'); }); }
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
        '<span class="setsum__iprice">' + eur(productTotal(k)) + '</span></div>';
    }).join('');
  }
  function refreshSummary() {
    var el = document.getElementById('setsum');
    var sub = productTotal('a') + productTotal('b'), ready = bothChosen(), disc = ready ? sub * SET_DISCOUNT : 0, total = sub - disc;
    var cart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.5-1.2L21 7H6"/></svg>';
    el.innerHTML = '<div class="setsum__card">' +
      '<div class="setsum__head"><h2 class="setsum__title">Ihr Set</h2><span class="setsum__badge">−10 % Set-Vorteil</span></div>' +
      '<div class="setsum__items">' + lineItems() + '</div>' +
      '<div class="setsum__rows">' +
        '<div class="setsum__row"><span>Zwischensumme</span><span>' + eur(sub) + '</span></div>' +
        '<div class="setsum__row setsum__row--disc' + (ready ? '' : ' is-off') + '"><span>Set-Rabatt <em>−10&nbsp;%</em></span><span>' + (ready ? '−' + eur(disc) : '–') + '</span></div>' +
      '</div>' +
      '<div class="setsum__total"><div class="setsum__totl"><span class="setsum__totcap">Gesamt</span><span class="setsum__totvat">inkl. MwSt.</span></div>' +
        '<div class="setsum__totr">' + (ready ? '<span class="setsum__totwas">' + eur(sub) + '</span>' : '') + '<b id="setTotal" class="setsum__totnow">' + eur(total) + '</b></div></div>' +
      (ready ? '<p class="setsum__save"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>Sie sparen <b>' + eur(disc) + '</b> im Set</p>' : '') +
      '<button type="button" class="setsum__cta' + (ready ? ' is-ready' : '') + '"' + (ready ? '' : ' aria-disabled="true"') + '>' + (ready ? cart + 'Set in den Warenkorb' : 'Bitte Set-Farbe wählen') + '</button>' +
      '</div>' +
      '<div class="bx-delivery setsum__delivery" aria-label="Versand und Lieferung">' +
        '<div class="bx-delivery__row"><span class="bx-delivery__key"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/></svg>Versanddatum</span><span class="bx-delivery__val"><b class="ph">TT.MM. – TT.MM.</b></span></div>' +
        '<div class="bx-delivery__row"><span class="bx-delivery__key"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>Lieferung</span><span class="bx-delivery__val"><b class="bx-delivery__free">Gratis Versand</b> · ab 99 € <a href="#" class="bx-delivery__details">Details</a></span></div>' +
      '</div>';
  }

  /* ---- guided stepper: the single-product PDP progress component (.cfgb-dock
     chevron ribbon + is-filled/is-current states + "Schritt X von N" title) ---- */
  var STEPS = [
    { id: 'setfin', label: 'Set-Farbe', flag: 'erforderlich', opt: false },
    { id: 'prodA', label: 'Türklingel', flag: 'anpassbar', opt: true },
    { id: 'prodB', label: 'Briefkasten', flag: 'anpassbar', opt: true },
    { id: 'setsum', label: 'Übersicht', flag: 'Zusammenfassung', opt: true }
  ];
  var currentStepId = 'setfin';
  function stepIndex(id) { for (var i = 0; i < STEPS.length; i++) if (STEPS[i].id === id) return i; return 0; }
  function stepDone(id) { return id === 'prodA' ? !!finishFor('a') : id === 'prodB' ? !!finishFor('b') : bothChosen(); }
  function paintSteps() {
    document.querySelectorAll('#setSteps .cfgb-bar__step').forEach(function (b) {
      var id = b.getAttribute('data-step'), cur = id === currentStepId;
      b.classList.toggle('is-current', cur);
      b.classList.toggle('is-filled', !cur && stepDone(id));
      b.setAttribute('aria-current', cur ? 'step' : 'false');
    });
    var i = stepIndex(currentStepId), s = STEPS[i];
    var n = document.getElementById('setStepN'); if (n) n.textContent = 'Schritt ' + (i + 1) + ' von ' + STEPS.length;
    var nm = document.getElementById('setStepName'); if (nm) nm.textContent = s.label;
    var fl = document.getElementById('setStepFlag'); if (fl) { fl.textContent = s.flag; fl.classList.toggle('is-opt', !!s.opt); }
  }
  function setCurrentStep(id) { currentStepId = id; paintSteps(); }
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
    el.addEventListener('click', function (e) {
      var b = e.target.closest('.cfgb-bar__step'); if (!b) return;
      var id = b.getAttribute('data-step');
      setCurrentStep(id);
      var t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    if (window.IntersectionObserver) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) setCurrentStep(en.target.id); });
      }, { rootMargin: '-25% 0px -50% 0px', threshold: 0 });
      STEPS.forEach(function (s) { var nn = document.getElementById(s.id); if (nn) obs.observe(nn); });
    }
  }
  function refreshSteps() { paintSteps(); }

  function refresh() { refreshRail(); refreshPanel('a'); refreshPanel('b'); refreshSummary(); refreshSteps(); }
  renderRail(); renderPanel('a'); renderPanel('b'); renderSteps(); refresh();
})();
