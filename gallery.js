/* ============================================================
   Set-page media gallery: main-image swap + full-screen lightbox.
   Mirrors the single-product PDP media (same markup/classes), but the driving
   engine (pdp-b.js) is intentionally omitted on the set page, so this small
   self-contained module restores the behaviour: thumbnail selection, click-to-
   zoom, and the #pdpLightbox modal with prev/next/strip/keyboard/close.
   ============================================================ */
(function () {
  'use strict';
  var main = document.getElementById('pdpMainImg');
  var thumbs = document.getElementById('pdpThumbs');
  var lb = document.getElementById('pdpLightbox');
  if (!main || !thumbs) return;

  var thumbBtns = [].slice.call(thumbs.querySelectorAll('li button'));
  var items = thumbBtns.map(function (b) { var im = b.querySelector('img'); return { src: im.getAttribute('src'), alt: im.getAttribute('alt') || '' }; });
  if (!items.length) return;
  var current = 0;

  /* ---- lightbox wiring (optional – degrades to plain swap if markup absent) ---- */
  var lbImg = lb && document.getElementById('pdpLbImg');
  var lbCur = lb && document.getElementById('pdpLbCur');
  var lbTot = lb && document.getElementById('pdpLbTotal');
  var strip = lb && document.getElementById('pdpLbStrip');
  var stripBtns = [];
  var lastFocus = null;

  if (lbTot) lbTot.textContent = items.length;
  if (strip) {
    strip.innerHTML = items.map(function (it, i) {
      return '<button type="button" class="pdp-lightbox__thumb" data-i="' + i + '" aria-current="false" aria-label="Bild ' + (i + 1) + '"><img src="' + it.src + '" alt=""></button>';
    }).join('');
    stripBtns = [].slice.call(strip.querySelectorAll('.pdp-lightbox__thumb'));
  }

  function syncLb() {
    if (lbImg) { lbImg.src = items[current].src; lbImg.alt = items[current].alt; }
    if (lbCur) lbCur.textContent = current + 1;
    stripBtns.forEach(function (b, bi) { b.setAttribute('aria-current', bi === current ? 'true' : 'false'); });
    var act = stripBtns[current]; if (act && act.scrollIntoView) act.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function select(i) {
    i = (i + items.length) % items.length;
    current = i;
    main.src = items[i].src; main.alt = items[i].alt;
    thumbBtns.forEach(function (b, bi) { b.setAttribute('aria-current', bi === i ? 'true' : 'false'); });
    syncLb();
  }

  thumbs.addEventListener('click', function (e) {
    var b = e.target.closest('li button'); if (!b) return;
    select(thumbBtns.indexOf(b));
  });

  if (lb) {
    var isOpen = function () { return lb.getAttribute('aria-hidden') === 'false'; };
    var openLb = function (i) {
      if (typeof i === 'number') select(i);
      lastFocus = document.activeElement;
      lb.setAttribute('aria-hidden', 'false');
      document.documentElement.style.overflow = 'hidden';
      syncLb();
      var c = lb.querySelector('.pdp-lightbox__close'); if (c) c.focus();
    };
    var closeLb = function () {
      lb.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    var allBtn = document.getElementById('pdpThumbsAll');
    if (allBtn) allBtn.addEventListener('click', function () { openLb(current); });
    main.addEventListener('click', function () { openLb(current); });
    main.style.cursor = 'zoom-in';

    var prev = document.getElementById('pdpLbPrev'), next = document.getElementById('pdpLbNext');
    if (prev) prev.addEventListener('click', function () { select(current - 1); });
    if (next) next.addEventListener('click', function () { select(current + 1); });
    if (strip) strip.addEventListener('click', function (e) { var b = e.target.closest('.pdp-lightbox__thumb'); if (b) select(parseInt(b.getAttribute('data-i'), 10) || 0); });
    [].slice.call(lb.querySelectorAll('[data-lb-close]')).forEach(function (el) { el.addEventListener('click', closeLb); });
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') select(current - 1);
      else if (e.key === 'ArrowRight') select(current + 1);
    });
  }

  select(0);
})();
