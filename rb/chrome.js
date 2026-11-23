/*
  ryanbow230.com shared chrome for project sites (pairs with /rb/theme.css).
  Load it synchronously just before </head> so the theme is set before the page paints.

  - applies the visitor's theme and accent from the main site (localStorage, same origin)
  - keeps the page's own data-theme in step, so its dark-mode styles follow too
  - adds the black ryanbow230.com bar at the top and a footer band at the bottom
  - hides the old per-site theme switches and swaps the purple favicon for the RB mark
*/
(function () {
  'use strict';
  var d = document.documentElement;
  var ACCENTS = ['green', 'violet', 'pink', 'orange', 'blue'];
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var theme = store.get('rb-theme') === 'dark' ? 'dark' : 'light';
  var accent = ACCENTS.indexOf(store.get('rb-accent')) > -1 ? store.get('rb-accent') : 'green';

  function apply() {
    d.classList.add('rb');
    d.setAttribute('data-rb-theme', theme);
    d.setAttribute('data-rb-accent', accent);
    if (d.getAttribute('data-theme') !== theme) d.setAttribute('data-theme', theme);
  }
  apply();

  // some sites re-set data-theme from their own saved choice or ?scoutTheme; keep it matching ours
  new MutationObserver(function () {
    if (d.getAttribute('data-theme') !== theme) d.setAttribute('data-theme', theme);
  }).observe(d, { attributes: true, attributeFilter: ['data-theme'] });

  // the repo is the first path segment: ryanbow230.com/<repo>/...
  var repo = (location.pathname.split('/').filter(Boolean)[0] || '').replace(/[^\w.-]/g, '');
  var ARROW = '<svg width="12" height="12" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="2"/></svg>';

  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }

  function inject() {
    if (document.querySelector('.rb-bar')) return;

    var bar = el(
      '<nav class="rb-bar" aria-label="ryanbow230.com">' +
        '<a class="rb-home" href="/" title="Back to ryanbow230.com">' +
          '<span class="rb-logo">RB<i></i></span>' +
          '<span class="rb-crumb">ryanbow230.com <b>/</b> ' + (repo ? '<em>' + repo + '</em><b>/</b>' : '') + '</span>' +
        '</a>' +
        '<span class="rb-sp"></span>' +
        '<span class="rb-nav"><a href="/#work">Work</a><a href="/#agents">Agents</a><a href="/#index">Index</a><a href="/#about">About</a></span>' +
        '<button type="button" class="rb-tool" data-rb="accent" aria-label="Change accent colour" title="Change accent colour"><i class="rb-swatch"></i></button>' +
        '<button type="button" class="rb-tool" data-rb="theme" aria-label="Switch between light and dark"></button>' +
        (repo ? '<a class="rb-cta" href="https://github.com/RyanBowie/' + repo + '" target="_blank" rel="noopener"><span>Repo</span>' + ARROW + '</a>' : '') +
      '</nav>'
    );
    document.body.insertBefore(bar, document.body.firstChild);

    var themeBtn = bar.querySelector('[data-rb="theme"]');
    var label = function () { themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark'; };
    label();
    themeBtn.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      store.set('rb-theme', theme); apply(); label();
    });
    bar.querySelector('[data-rb="accent"]').addEventListener('click', function () {
      accent = ACCENTS[(ACCENTS.indexOf(accent) + 1) % ACCENTS.length];
      store.set('rb-accent', accent); apply();
    });

    var year = new Date().getFullYear();
    var foot = el(
      '<footer class="rb-foot">' +
        '<span class="rb-foot-mark">RB<i></i></span>' +
        '<a href="/">ryanbow230.com</a>' +
        '<a href="/#index">All projects</a>' +
        '<span class="rb-foot-sp"></span>' +
        '<span>© ' + year + ' Ryan Bowen</span>' +
      '</footer>'
    );
    document.body.appendChild(foot);

    // retire the old theme switches: one switch, in the shared bar
    var candidates = document.querySelectorAll('#theme-toggle, .theme-toggle, [data-theme-toggle], button, a[href*="scoutTheme"]');
    Array.prototype.forEach.call(candidates, function (b) {
      if (b.closest('.rb-bar')) return;
      var text = ((b.getAttribute('aria-label') || '') + ' ' + (b.getAttribute('title') || '') + ' ' + (b.textContent || '')).toLowerCase();
      var isToggle = b.matches('#theme-toggle, .theme-toggle, [data-theme-toggle], a[href*="scoutTheme"]') ||
        /\b(switch|toggle|change)\b[^.]{0,20}\btheme\b|\b(dark|light) (mode|theme)\b/.test(text);
      if (isToggle) b.classList.add('rb-hidden-toggle');
    });

    // one favicon across the domain
    var icon = document.querySelector('link[rel~="icon"]') || document.head.appendChild(document.createElement('link'));
    icon.rel = 'icon';
    icon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230a0c0b'/%3E%3Crect x='18' y='6' width='8' height='8' fill='%235fed83'/%3E%3C/svg%3E";
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
