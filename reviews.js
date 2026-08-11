/* ============================================================
   Featured-review carousel hydration for the set page.
   The single-product engine (pdp-b.js) is intentionally omitted here, and it
   used to build the featured "Kundenfoto" testimonial from the hidden #rvTrack
   data source. Without it, #rvFeatureImg stayed empty (broken photo). This small
   self-contained module restores that behaviour: it reads the .rv__card entries,
   builds the thumbnail nav, and wires prev/next + thumbnail selection.
   ============================================================ */
(function () {
  'use strict';
  var track = document.getElementById('rvTrack');
  var img = document.getElementById('rvFeatureImg');
  var nav = document.getElementById('rvThumbsNav');
  if (!track || !img || !nav) return;

  var card = document.getElementById('rvFeatureCard');
  var starsEl = document.getElementById('rvFeatureStars');
  var titleEl = document.getElementById('rvFeatureTitle');
  var textEl = document.getElementById('rvFeatureText');
  var authorEl = document.getElementById('rvFeatureAuthor');
  var dateEl = document.getElementById('rvFeatureDate');

  var text = function (el, sel) { var n = el.querySelector(sel); return n ? n.textContent.trim() : ''; };
  var reviews = [].slice.call(track.querySelectorAll('.rv__card')).map(function (c) {
    var im = c.querySelector('.rv__card-img img');
    var st = c.querySelector('.rv__card-stars');
    return {
      src: im ? im.getAttribute('src') : '',
      alt: im ? im.getAttribute('alt') : '',
      starsHTML: st ? st.innerHTML : '',
      starsLabel: st ? (st.getAttribute('aria-label') || '') : '',
      title: text(c, '.rv__card-title'),
      body: text(c, '.rv__card-text'),
      author: text(c, '.rv__card-author'),
      date: text(c, '.rv__card-date')
    };
  });
  if (!reviews.length) return;

  var current = -1;

  /* thumbnail nav – one button per review */
  nav.innerHTML = reviews.map(function (r, i) {
    return '<button type="button" class="rv__thumbnav-btn" data-i="' + i + '" aria-current="false"' +
      ' aria-label="Bewertung ' + (i + 1) + ' von ' + reviews.length + '"><img src="' + r.src + '" alt="" loading="lazy"></button>';
  }).join('');
  var buttons = [].slice.call(nav.querySelectorAll('.rv__thumbnav-btn'));

  function show(i) {
    i = (i + reviews.length) % reviews.length;
    if (i === current) return;
    var r = reviews[i];
    /* Write content synchronously so the feature renders even when the tab isn't
       compositing (rAF-based swaps would never fire there); the .is-swapping class
       just carries an optional CSS fade for interactive changes. */
    if (card && current !== -1) card.classList.add('is-swapping');
    img.src = r.src; img.alt = r.alt;
    if (starsEl) { starsEl.innerHTML = r.starsHTML; starsEl.setAttribute('aria-label', r.starsLabel); }
    if (titleEl) titleEl.textContent = r.title;
    if (textEl) textEl.textContent = r.body;
    if (authorEl) authorEl.textContent = r.author;
    if (dateEl) dateEl.textContent = r.date;
    buttons.forEach(function (b, bi) { b.setAttribute('aria-current', bi === i ? 'true' : 'false'); });
    current = i;
    if (card) window.setTimeout(function () { card.classList.remove('is-swapping'); }, 180);
  }

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('.rv__thumbnav-btn'); if (!b) return;
    show(parseInt(b.getAttribute('data-i'), 10) || 0);
  });
  var prev = card && card.querySelector('.rv__feature-arrow--prev');
  var next = card && card.querySelector('.rv__feature-arrow--next');
  if (prev) prev.addEventListener('click', function () { show(current - 1); });
  if (next) next.addEventListener('click', function () { show(current + 1); });

  show(0);
})();
