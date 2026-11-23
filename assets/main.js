(() => {
  'use strict';

  const D = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = (n, w = 4) => String(Math.max(0, Math.round(n))).padStart(w, '0');
  const fmtDate = iso => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const repoUrl = r => `${D.owner.github}/${r.name}`;
  const ARROW = '<svg class="arr" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  const ARROW_DOWN = '<svg class="arr" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M8 2.5v10.5M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>';
  const PALETTE = ['#583af7', '#ae85ff', '#f73678', '#c05200', '#bba00a', '#5fed83', '#180e27'];
  // project sites live on this domain at /<repo>/; when previewing elsewhere (localhost) load them from the live domain
  const SITE_BASE = /(^|\.)ryanbow230\.com$/.test(location.hostname) ? '' : 'https://ryanbow230.com';
  const siteHref = path => SITE_BASE + path;
  // a link that opens a project inside the page (the explorer panel under Work) instead of a new tab
  const exploreLink = (path, label, cls, inner) =>
    `<a class="${cls}" href="${siteHref(path)}" data-explore="${esc(path)}" data-label="${esc(label)}">${inner}</a>`;

  // the harnesses a repo's agent runs on (unknown keys are ignored), defined once in data.js
  const harnessOf = r => (r.agent ? r.agent.harness : []).filter(k => D.harnesses[k]);

  /* ─────────────── theme + accent ─────────────── */
  function initTheme() {
    const accents = ['green', 'violet', 'pink', 'orange', 'blue'];
    const lab = $('#theme-lab');
    const sync = () => { lab.textContent = root.dataset.theme === 'dark' ? 'Light' : 'Dark'; };
    sync();
    $('#theme-btn').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('rb-theme', root.dataset.theme);
      sync();
      document.dispatchEvent(new Event('themechange'));
    });
    const cycle = () => {
      const i = accents.indexOf(root.dataset.accent || 'green');
      root.dataset.accent = accents[(i + 1) % accents.length];
      store.set('rb-accent', root.dataset.accent);
      document.dispatchEvent(new Event('themechange'));
    };
    $('#accent-btn').addEventListener('click', cycle);
    document.addEventListener('click', e => { if (e.target.closest('.wm .sq')) cycle(); });
  }

  /* ─────────────── ticker ─────────────── */
  function initTicker() {
    const latest = [...D.repos].sort((a, b) => b.pushed.localeCompare(a.pushed))[0];
    const msg = $('#ticker-msg');
    msg.textContent = `latest push: ${latest.name}, ${fmtDate(latest.pushed)} ↗`;
    if (latest.site) {
      msg.href = siteHref(latest.site);
      msg.dataset.explore = latest.site;
      msg.dataset.label = latest.title;
      msg.removeAttribute('target');
    } else {
      msg.href = repoUrl(latest);
    }
  }

  /* ─────────────── nav ─────────────── */
  function initNav() {
    const nav = $('#nav'), btn = $('#menu-btn');
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open);
    });
    $('#nav-links').addEventListener('click', e => {
      if (e.target.closest('a')) { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
    });

    const links = $$('.nav__link');
    const targets = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const bar = $('#progress');
    let queued = false;
    const onScroll = () => {
      queued = false;
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max) : 0);
      const mid = innerHeight * 0.4;
      let active = null;
      targets.forEach(t => { if (t.getBoundingClientRect().top <= mid) active = t; });
      links.forEach(a => a.classList.toggle('is-active', !!active && a.getAttribute('href') === '#' + active.id));
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }

  /* ─────────────── wordmark ─────────────── */
  function initWordmarks() {
    $$('.wm').forEach(wm => {
      const words = wm.textContent.trim().split(/\s+/);
      let i = 0;
      wm.innerHTML = words.map((w, wi) =>
        '<span class="word" aria-hidden="true">' +
        [...w].map(ch => `<span class="ch" style="--i:${i++}">${esc(ch)}</span>`).join('') +
        (wi === words.length - 1 ? '<button class="sq" type="button" tabindex="-1" title="Change accent colour"></button>' : '') +
        '</span>').join('');
    });
    const fit = () => $$('[data-fit]').forEach(box => {
      const wm = $('.wm', box);
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      wm.style.fontSize = '100px';
      const w = wm.getBoundingClientRect().width;
      if (w > 0) wm.style.fontSize = (100 * avail / w).toFixed(2) + 'px';
    });
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    addEventListener('load', fit);
    let t;
    addEventListener('resize', () => { clearTimeout(t); t = setTimeout(fit, 60); });
  }

  /* ─────────────── text effects ─────────────── */
  const GLYPHS = '!<>-_\\/[]{}=+*^?#%&()@$';
  function scramble(el) {
    const text = el.dataset.text || (el.dataset.text = el.textContent);
    if (reduce) { el.textContent = text; return; }
    cancelAnimationFrame(el._raf);
    const t0 = performance.now(), dur = Math.min(1200, 300 + text.length * 30);
    let last = 0;
    const frame = t => {
      const p = Math.min(1, (t - t0) / dur);
      if (t - last > 40 || p === 1) {
        last = t;
        const k = Math.floor(p * text.length);
        let out = text.slice(0, k);
        for (let i = k; i < text.length; i++) out += text[i] === ' ' ? ' ' : GLYPHS[Math.random() * GLYPHS.length | 0];
        el.textContent = out;
      }
      if (p < 1) el._raf = requestAnimationFrame(frame);
    };
    el._raf = requestAnimationFrame(frame);
  }

  function prepSlug(el) {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.style.minHeight = el.offsetHeight + 'px';
    el.innerHTML = [...text].map(ch => `<span class="tc" aria-hidden="true">${ch === '/' ? '<b class="sl">/</b>' : esc(ch)}</span>`).join('') +
      '<span class="caret" aria-hidden="true"></span>';
  }
  function typeSlug(el) {
    const chars = $$('.tc', el), caret = $('.caret', el);
    if (reduce) { chars.forEach(c => c.classList.add('on')); caret.remove(); return; }
    let i = 0;
    const step = () => {
      if (i < chars.length) { chars[i++].classList.add('on'); setTimeout(step, 26 + Math.random() * 34); }
      else if (el.dataset.caret !== 'keep') setTimeout(() => caret.remove(), 2400);
    };
    step();
  }

  function countUp(el) {
    const target = +el.dataset.count;
    const show = v => { el.textContent = Math.round(v).toLocaleString('en-GB'); };
    if (reduce) { show(target); return; }
    const t0 = performance.now(), dur = 1500;
    const frame = t => {
      const p = Math.min(1, (t - t0) / dur);
      show(target * (1 - Math.pow(2, -10 * p)) / (1 - Math.pow(2, -10)));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function initReveals() {
    $$('[data-type]').forEach(prepSlug);
    $$('[data-scramble]').forEach(el => {
      el.dataset.text = el.textContent;
      el.addEventListener('pointerenter', () => scramble(el));
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        if (el.hasAttribute('data-type')) typeSlug(el);
        if (el.hasAttribute('data-scramble')) scramble(el);
        if (el.hasAttribute('data-count')) countUp(el);
        if (el.classList.contains('rv')) el.classList.add('in');
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });
    $$('[data-type], [data-scramble], [data-count], .rv').forEach(el => io.observe(el));
  }

  /* ─────────────── bubbles band + gauge ─────────────── */
  function initBand() {
    const band = $('#band'), layer = $('#tiles');
    let tiles = [], visible = false;

    const rnd = not => {
      let c;
      do { c = PALETTE[Math.random() * PALETTE.length | 0]; } while (not.includes(c));
      return c;
    };

    /* a brick-laid mosaic of chat bubbles: tail on the right = sent, on the left = received */
    const build = () => {
      const W = band.clientWidth, H = band.clientHeight;
      const rows = Math.max(3, Math.round(H / Math.max(60, Math.min(92, W / 13))));
      const s = H / rows;
      const maxCols = Math.ceil((W * 0.8) / s);
      const grid = [];
      const frag = document.createDocumentFragment();
      tiles = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        const cols = maxCols - [0, 2, 1, 3, 1, 2][r % 6];
        for (let c = -1; c < cols; c++) {
          const up = r > 0 ? [grid[r - 1][c], grid[r - 1][c + (r % 2 ? 1 : -1)]] : [];
          const bg = rnd([grid[r][c - 1], ...up]);
          grid[r][c] = bg;
          const t = document.createElement('i');
          t.className = 'tile' + (Math.random() < 0.5 ? ' tile--in' : '');
          const x = c * s + (r % 2 ? s / 2 : 0), y = r * s;
          t._bg = bg;
          t._c = rnd([bg]);
          t.style.cssText = `--s:${(s + 0.6).toFixed(2)}px;translate:${x.toFixed(2)}px ${y.toFixed(2)}px;background-color:${bg};--c:${t._c};--d:${(c + 1) * 26 + r * 60}ms`;
          t.appendChild(document.createElement('b'));
          frag.appendChild(t);
          tiles.push(t);
        }
      }
      layer.textContent = '';
      layer.appendChild(frag);
    };

    const recolor = (t, pop) => {
      t._c = rnd([t._c, t._bg]);
      t.style.setProperty('--c', t._c);
      if (pop) {
        t.classList.toggle('tile--in');
        t.classList.add('pop');
        clearTimeout(t._t);
        t._t = setTimeout(() => t.classList.remove('pop'), 120);
      }
    };

    build();
    let lastW = band.clientWidth, rt;
    addEventListener('resize', () => {
      clearTimeout(rt);
      rt = setTimeout(() => { if (Math.abs(band.clientWidth - lastW) > 24) { lastW = band.clientWidth; build(); } }, 150);
    });
    layer.addEventListener('pointerover', e => { const t = e.target.closest('.tile'); if (t && !t.contains(e.relatedTarget)) recolor(t, true); });
    if (!reduce) setInterval(() => { if (visible && tiles.length) recolor(tiles[Math.random() * tiles.length | 0], false); }, 240);

    /* gauge: needle follows how fast the pointer (or the page) is moving */
    const NS = 'http://www.w3.org/2000/svg';
    const pol = (a, r) => { const rad = a * Math.PI / 180; return [150 + r * Math.sin(rad), 150 - r * Math.cos(rad)]; };
    const arc = (a0, a1, r, color) => {
      const [x0, y0] = pol(a0, r), [x1, y1] = pol(a1, r);
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('class', 'g-arc');
      p.setAttribute('stroke', color);
      p.setAttribute('d', `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`);
      return p;
    };
    const arcs = $('#g-arcs'), ticks = $('#g-ticks');
    arcs.append(arc(-125, 20, 132, '#5fed83'), arc(22, 80, 132, '#bba00a'), arc(82, 125, 132, '#f73678'));
    for (let i = 0; i <= 24; i++) {
      const a = -125 + i * (250 / 24), major = i % 4 === 0;
      const [x0, y0] = pol(a, major ? 108 : 114), [x1, y1] = pol(a, 122);
      const l = document.createElementNS(NS, 'line');
      l.setAttribute('class', 'g-tick' + (major ? '' : ' g-tick--minor'));
      l.setAttribute('x1', x0.toFixed(2)); l.setAttribute('y1', y0.toFixed(2));
      l.setAttribute('x2', x1.toFixed(2)); l.setAttribute('y2', y1.toFixed(2));
      ticks.appendChild(l);
    }

    const needle = $('#g-needle'), read = $('#g-read'), spdEl = $('#spd'), peakEl = $('#peak');
    let acc = 0, lx = null, ly = null, speed = 0, peak = 0, lastT = 0, lastY = scrollY, lastText = 0;
    addEventListener('pointermove', e => {
      if (lx !== null) acc += Math.hypot(e.clientX - lx, e.clientY - ly);
      lx = e.clientX; ly = e.clientY;
    }, { passive: true });
    addEventListener('scroll', () => { acc += Math.abs(scrollY - lastY); lastY = scrollY; }, { passive: true });

    const frame = t => {
      if (!visible) return;
      const dt = Math.max(8, t - lastT) / 1000;
      lastT = t;
      const inst = Math.min(9999, acc / dt);
      acc = 0;
      speed += (inst - speed) * (inst > speed ? 0.22 : 0.07);
      if (speed > peak) peak = speed;
      const a = -125 + 250 * Math.min(1, Math.sqrt(speed / 6000)) + Math.sin(t / 260) * 0.7;
      needle.setAttribute('transform', `rotate(${a.toFixed(2)} 150 150)`);
      if (t - lastText > 90) {
        lastText = t;
        read.textContent = spdEl.textContent = pad(speed);
        peakEl.textContent = pad(peak);
      }
      requestAnimationFrame(frame);
    };
    needle.setAttribute('transform', 'rotate(-125 150 150)');
    new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was && !reduce) { lastT = performance.now(); acc = 0; requestAnimationFrame(frame); }
    }).observe(band);
  }

  /* ─────────────── poster artwork (drawn from each project's own data) ─────────────── */
  const ART = {
    // refusal rate by load band from the load test: flat, then a hard knee at 175 a minute
    knee() {
      const v = [0, 0, 0, 20, 0.8, 3.3, 1.4, 8.8, 5, 39, 54, 64, 83];
      const bw = 22, gp = 9.5;
      const bars = v.map((n, i) => {
        const h = Math.max(6, n / 83 * 340);
        return `<rect x="${(i * (bw + gp)).toFixed(1)}" y="${(400 - h).toFixed(1)}" width="${bw}" height="${h.toFixed(1)}" fill="${i < 6 ? 'var(--alt)' : 'currentColor'}"/>`;
      }).join('');
      const kx = 6 * (bw + gp) - gp / 2;
      return `<svg viewBox="0 0 400 400">${bars}<path d="M${kx} 26V400" stroke="currentColor" stroke-width="2" stroke-dasharray="5 6" fill="none"/><text class="art-t" x="${kx - 10}" y="40" font-size="17" text-anchor="end" fill="currentColor">175/MIN</text><text class="art-t" x="400" y="40" font-size="17" text-anchor="end" fill="currentColor">83% REFUSED</text></svg>`;
    },
    // the thirteen cat scores, out of ten: nothing gets near the right-hand edge
    scores() {
      const v = [5.9, 5.8, 5.7, 5.5, 5.4, 5.3, 5.2, 5.0, 3.9, 3.5, 2.5, 2.2, 1.8];
      const bh = 22, gp = 9.5;
      return `<svg viewBox="0 0 400 400">${v.map((n, i) => {
        const y = (i * (bh + gp)).toFixed(1);
        return `<rect x="0" y="${y}" width="400" height="${bh}" fill="currentColor" opacity=".14"/><rect x="0" y="${y}" width="${n * 40}" height="${bh}" fill="${i === 0 ? 'var(--alt)' : 'currentColor'}"/>`;
      }).join('')}</svg>`;
    },
    // a twin-spired cathedral silhouette (used only if the cathedral screenshot can't load)
    towers() {
      return `<svg viewBox="0 0 400 400"><path d="M70 150L110 18L150 150Z M250 150L290 18L330 150Z" fill="currentColor"/><rect x="70" y="150" width="80" height="210" fill="currentColor"/><rect x="250" y="150" width="80" height="210" fill="currentColor"/><rect x="150" y="250" width="100" height="110" fill="currentColor"/><path d="M0 362H400" stroke="currentColor" stroke-width="4"/><rect x="100" y="190" width="20" height="60" fill="var(--alt)"/><rect x="280" y="190" width="20" height="60" fill="var(--alt)"/><path d="M180 360v-54a20 20 0 0 1 40 0v54z" fill="var(--alt)"/></svg>`;
    },
    // the five historical reference manuals in the engineering-evidence corpus, by page count (the 392-page one is fully scanned)
    pages() {
      const v = [476, 449, 448, 392, 205];
      const bh = 52, gp = 22;
      return `<svg viewBox="0 0 400 400"><text class="art-t" x="400" y="26" font-size="17" text-anchor="end" fill="currentColor">PAGES PER MANUAL</text>${v.map((n, i) => {
        const y = 44 + i * (bh + gp), w = (n / 476 * 400).toFixed(1), scan = n === 392;
        return `<rect x="0" y="${y}" width="${w}" height="${bh}" fill="${scan ? 'var(--alt)' : 'currentColor'}"/>` +
          (scan ? `<text class="art-t" x="14" y="${y + 33}" font-size="17" fill="var(--fg)">SCANNED (OCR)</text>` : '');
      }).join('')}</svg>`;
    },
    // 49 builds, grouped the way the benchmark batches them: 20 + 9 + 3 + 2 + 5 + 3 + 5 + 2
    grid() {
      const groups = [[20, 'currentColor', 1], [9, 'var(--alt)', 1], [3, 'currentColor', .45], [2, 'var(--alt)', .55], [5, 'currentColor', 1], [3, 'var(--alt)', 1], [5, 'currentColor', .45], [2, 'var(--alt)', .55]];
      const cells = [];
      groups.forEach(([n, f, o]) => { for (let i = 0; i < n; i++) cells.push([f, o]); });
      return `<svg viewBox="0 0 400 400">${cells.map(([f, o], i) => `<rect x="${(i % 7) * 59}" y="${Math.floor(i / 7) * 59}" width="46" height="46" fill="${f}" opacity="${o}"/>`).join('')}</svg>`;
    },
    frames() {
      return `<svg viewBox="0 0 400 400"><rect x="118" y="36" width="280" height="176" fill="var(--bg)" stroke="currentColor" stroke-width="3"/><rect x="60" y="92" width="280" height="176" fill="var(--bg)" stroke="currentColor" stroke-width="3"/><rect x="2" y="148" width="280" height="176" fill="currentColor"/><path d="M118 198v76l66-38z" fill="var(--bg)"/><path d="M0 372h400" stroke="currentColor" stroke-width="3"/>${[0, 50, 100, 150, 200, 250, 300, 350, 400].map(x => `<path d="M${x} 362v20" stroke="currentColor" stroke-width="3"/>`).join('')}<rect x="118" y="358" width="28" height="28" fill="var(--alt)"/></svg>`;
    },
    code() {
      const lines = [['EVALUATE', 'var(--alt)'], ['SUMMARIZECOLUMNS(', 'currentColor'], ["  'Date'[Year],", 'currentColor'], ['  "Sales",', 'currentColor'], ['  [Total Sales]', 'currentColor'], [')', 'currentColor']];
      return `<svg viewBox="0 0 400 400">${lines.map(([t, f], i) => `<text class="art-t" x="0" y="${86 + i * 50}" font-size="29" fill="${f}" xml:space="preserve">${esc(t)}</text>`).join('')}<rect x="26" y="312" width="18" height="30" fill="var(--alt)"/><path d="M0 34h400" stroke="currentColor" stroke-width="3"/><path d="M0 372h400" stroke="currentColor" stroke-width="3"/></svg>`;
    },
    hub() {
      let out = '';
      for (let i = 0; i < 8; i++) {
        const a = i * Math.PI / 4 + Math.PI / 8, x = 200 + 156 * Math.cos(a), y = 200 + 156 * Math.sin(a);
        out += `<path d="M200 200L${x.toFixed(1)} ${y.toFixed(1)}" stroke="currentColor" stroke-width="3"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="27" fill="${i % 2 ? 'var(--alt)' : 'currentColor'}"/>`;
      }
      return `<svg viewBox="0 0 400 400">${out}<circle cx="200" cy="200" r="58" fill="var(--alt)" stroke="currentColor" stroke-width="3"/><rect x="186" y="186" width="28" height="28" fill="currentColor"/></svg>`;
    },
    lanes() {
      const names = ['STUDIO', 'BUILDER', 'SHAREPOINT', 'FOUNDRY'];
      return `<svg viewBox="0 0 400 400">${names.map((n, i) => {
        const y = 22 + i * 96;
        return `<rect x="1.5" y="${y}" width="176" height="60" fill="none" stroke="currentColor" stroke-width="3"/><text class="art-t" x="16" y="${y + 37}" font-size="18" fill="currentColor">${n}</text><path d="M178 ${y + 30}C240 ${y + 30} 226 200 288 200" fill="none" stroke="currentColor" stroke-width="3"/>`;
      }).join('')}<rect x="288" y="144" width="112" height="112" fill="var(--alt)"/><text class="art-t" x="344" y="207" font-size="18" text-anchor="middle" fill="var(--bg)">REPORT</text></svg>`;
    }
  };

  /* ─────────────── project viewer ─────────────── */
  function initViewer() {
    const feats = D.repos.filter(r => r.feature).sort((a, b) => a.feature.order - b.feature.order);
    const viewer = $('#viewer'), list = $('#vlist'), poster = $('#poster'), wrap = $('#poster-wrap');
    const n = feats.length;
    let cur = -1;

    $('#work-count').textContent = `${pad(n, 2)} featured of ${D.repos.length} public`;

    // a project can show a real clip of its output instead of drawn artwork
    const clip = m =>
      `<a class="clip" href="${siteHref(m.live)}" data-explore="${esc(m.live)}" data-label="${esc(m.label)}" aria-label="Explore the ${esc(m.label)} result here">
        <span class="clip__bar"><span>${esc(m.label)}</span><span>${esc(m.tag)}</span></span>
        ${m.video
          ? `<video class="clip__video" src="${m.video}" poster="${m.still}" muted loop playsinline preload="metadata"${reduce ? '' : ' autoplay'}></video>`
          : `<img class="clip__video" src="${m.still}" alt="">`}
        <span class="clip__bar clip__bar--foot"><span>${esc((m.foot || [])[0] || 'unedited model output')}</span><span>${esc((m.foot || [])[1] || 'play with it')} ${ARROW}</span></span>
      </a>`;

    list.innerHTML = feats.map((r, i) => {
      const f = r.feature;
      return `<button class="vitem" type="button" role="tab" id="vtab-${i}" aria-selected="false" aria-controls="stage" tabindex="-1" data-i="${i}" style="--c:${f.bg};--bg:${f.bg};--fg:${f.fg};--alt:${f.alt}">
        <span class="vitem__bar"><i></i></span>
        <span class="vitem__thumb${f.media ? ' vitem__thumb--img' : ''}" aria-hidden="true">${f.media ? `<img src="${f.media.still}" alt="" data-art="${f.art}">` : ART[f.art]()}</span>
        <span class="vitem__name">${esc(r.name)}${r.ext}</span>
      </button>`;
    }).join('');
    const items = $$('.vitem', list);
    $$('.vitem__thumb img', list).forEach(img => img.addEventListener('error', () => {
      img.parentNode.classList.remove('vitem__thumb--img');
      img.parentNode.innerHTML = ART[img.dataset.art]();
    }));
    const playClip = on => {
      const v = $('video', poster);
      if (!v) return;
      if (on && !reduce) v.play().catch(() => {}); else v.pause();
    };

    const select = (i, focus) => {
      i = (i + n) % n;
      const r = feats[i], f = r.feature;
      if (i === cur) return;
      if (cur >= 0) wrap.style.setProperty('--prev', feats[cur].feature.bg);
      cur = i;

      items.forEach((el, k) => {
        const on = k === i;
        el.classList.toggle('is-active', on);
        el.setAttribute('aria-selected', on);
        el.tabIndex = on ? 0 : -1;
      });
      if (focus) items[i].focus();
      if (list.scrollWidth > list.clientWidth) list.scrollTo({ left: items[i].offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });

      const len = f.stat.length;
      const fs = len <= 2 ? 27 : len === 3 ? 20 : len <= 6 ? 15 : 11.5;
      poster.style.cssText = `--bg:${f.bg};--fg:${f.fg};--alt:${f.alt};--fs:${fs}cqw`;
      poster.innerHTML =
        `<div class="poster__strip"><span>${esc(f.kicker)}</span><span>${esc(r.lang || 'Docs')}</span><span>${pad(i + 1, 2)} / ${pad(n, 2)}</span></div>` +
        (f.media ? `<div class="poster__art poster__art--clip">${clip(f.media)}</div>` : `<div class="poster__art">${ART[f.art]()}</div>`) +
        `<div class="poster__text"><div class="poster__stat">${esc(f.stat)}</div><div class="poster__cap">${esc(f.cap)}</div></div>`;
      poster.classList.toggle('poster--clip', !!f.media);
      if (f.media) {
        const art = $('.poster__art', poster);
        $('video, img', art).addEventListener('error', () => { art.className = 'poster__art'; art.innerHTML = ART[f.art](); });
        playClip(!viewer.classList.contains('is-off'));
      }
      poster.classList.remove('wipe');
      void poster.offsetWidth;
      poster.classList.add('wipe');

      $('#stage').setAttribute('aria-labelledby', 'vtab-' + i);
      $('#st-title').textContent = r.title;
      $('#st-desc').textContent = f.blurb;
      const hchips = harnessOf(r).map(k => { const h = D.harnesses[k]; return `<li class="fact-h" style="--c:${h.color};--on:${h.on}">${esc(h.label)}</li>`; }).join('');
      $('#st-facts').innerHTML = hchips + f.facts.map(t => `<li>${esc(t)}</li>`).join('');
      $('#st-cta').innerHTML =
        (r.site ? exploreLink(r.site, r.title, 'btn btn--accent', `<span>More details</span>${ARROW_DOWN}`) : '') +
        `<a class="btn btn--ghost" href="${repoUrl(r)}" target="_blank" rel="noopener"><span>View the repository</span>${ARROW}</a>`;
    };

    list.addEventListener('click', e => { const b = e.target.closest('.vitem'); if (b) select(+b.dataset.i); });
    list.addEventListener('keydown', e => {
      const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (d) { e.preventDefault(); select(cur + d, true); }
    });
    list.addEventListener('animationend', e => { if (e.animationName === 'bar-fill') select(cur + 1); });
    $('#st-prev').addEventListener('click', () => select(cur - 1));
    $('#st-next').addEventListener('click', () => select(cur + 1));
    // watch the poster, not the whole panel: the panel is taller than a short window, so a ratio of it may never be visible
    new IntersectionObserver(([e]) => { viewer.classList.toggle('is-off', !e.isIntersecting); playClip(e.isIntersecting); }, { threshold: 0.4 }).observe(wrap);

    select(0);
  }

  /* ─────────────── Copilot Studio agents, grouped and coloured by harness ─────────────── */
  function initAgents() {
    const list = D.repos.filter(r => harnessOf(r).length);
    const keys = Object.keys(D.harnesses);
    const key = $('#hkey'), grid = $('#agrid');
    $('#agents-count').textContent = `${pad(list.length, 2)} repos, ${pad(keys.length, 2)} harnesses`;

    grid.innerHTML = list.map(r => {
      const hs = harnessOf(r);
      const cols = hs.map(k => D.harnesses[k].color);
      // one colour for one harness, an even split when a repo covers several
      const bar = cols.length === 1 ? cols[0]
        : `linear-gradient(90deg, ${cols.map((c, i) => `${c} ${(i / cols.length * 100).toFixed(1)}% ${((i + 1) / cols.length * 100).toFixed(1)}%`).join(', ')})`;
      const badges = hs.map(k => { const h = D.harnesses[k]; return `<span class="hb" style="--c:${h.color};--on:${h.on}">${esc(h.label)}</span>`; }).join('');
      return `<article class="acard rv" data-h="${hs.join(' ')}" style="--bar:${bar}">
        <i class="acard__bar"></i>
        <div class="acard__body">
          <span class="mono acard__repo">${esc(r.name)}${r.ext}</span>
          <h3>${esc(r.title)}</h3>
          <p class="acard__desc">${esc(r.desc)}</p>
          ${r.agent.note ? `<p class="acard__note mono">${esc(r.agent.note)}</p>` : ''}
        </div>
        <div class="acard__foot">
          <span class="acard__tags">${badges}</span>
          <span class="acard__links">${r.site ? exploreLink(r.site, r.title, 'mini', 'details ↓') : ''}<a class="mini" href="${repoUrl(r)}" target="_blank" rel="noopener">repo ↗</a></span>
        </div>
      </article>`;
    }).join('');

    const count = k => list.filter(r => harnessOf(r).includes(k)).length;
    const items = [{ k: 'all', label: 'All agent projects', blurb: 'Every Copilot Studio agent repo, whichever harness it runs on.', n: list.length, color: 'var(--ink)', on: 'var(--paper)' }]
      .concat(keys.map(k => ({ k, label: D.harnesses[k].label, blurb: D.harnesses[k].blurb, n: count(k), color: D.harnesses[k].color, on: D.harnesses[k].on })));
    key.innerHTML = items.map((it, i) =>
      `<button class="hk" type="button" data-h="${it.k}" aria-pressed="${i === 0}" style="--c:${it.color};--on:${it.on}">
        <span class="mono hk__n"><i></i>${pad(it.n, 2)} ${it.n === 1 ? 'repo' : 'repos'}</span>
        <span class="hk__name">${esc(it.label)}</span>
        <span class="hk__blurb">${esc(it.blurb)}</span>
      </button>`).join('');

    key.addEventListener('click', e => {
      const b = e.target.closest('.hk');
      if (!b) return;
      const h = b.dataset.h;
      $$('.hk', key).forEach(x => x.setAttribute('aria-pressed', x === b));
      $$('.acard', grid).forEach(c => { c.hidden = h !== 'all' && !c.dataset.h.split(' ').includes(h); c.classList.add('in'); });
    });
  }

  /* ─────────────── marquee ─────────────── */
  function initMarquee() {
    const html = D.topics.map(t => `<span>${esc(t)}/</span>`).join('');
    $('#marquee').innerHTML = html + html;
  }

  /* ─────────────── repository index ─────────────── */
  function initIndex() {
    const box = $('#idx'), filters = $('#filters');
    const rows = [...D.repos].sort((a, b) => b.pushed.localeCompare(a.pushed) || a.name.localeCompare(b.name));
    $('#index-count').textContent = `${rows.length} public, snapshot ${fmtDate(D.snapshot)}`;

    box.innerHTML = rows.map((r, i) => {
      const c = D.categories[r.cat];
      return `<div class="irow rv" data-cat="${r.cat}" data-agent="${harnessOf(r).length ? 1 : 0}" style="--c:${c.color}">
        <span class="irow__n mono">${pad(i + 1, 2)}</span>
        ${r.site
          ? exploreLink(r.site, r.title, 'irow__name', `${esc(r.name)}<span class="ext">${r.ext}</span>`)
          : `<a class="irow__name" href="${repoUrl(r)}" target="_blank" rel="noopener">${esc(r.name)}<span class="ext">${r.ext}</span></a>`}
        <span class="irow__desc">${esc(r.desc)}</span>
        <span class="irow__cat mono">${c.label}${harnessOf(r).length ? `<span class="irow__hs">${harnessOf(r).map(k => `<span class="irow__h"><i style="background:${D.harnesses[k].color}"></i>${esc(D.harnesses[k].short)}</span>`).join('')}</span>` : ''}</span>
        <span class="irow__date mono">${fmtDate(r.pushed)}</span>
        <span class="irow__links">${r.site ? exploreLink(r.site, r.title, 'mini', 'details ↓') : ''}<a class="mini" href="${repoUrl(r)}" target="_blank" rel="noopener">repo ↗</a></span>
      </div>`;
    }).join('');

    const chips = [['all', 'all', rows.length]].concat(Object.entries(D.categories).map(([k, c]) => [k, c.label, rows.filter(r => r.cat === k).length]), [['agent', 'studio agents', rows.filter(r => harnessOf(r).length).length]]);
    filters.innerHTML = chips.map(([k, label, count], i) => `<button class="chip" type="button" data-cat="${k}" aria-pressed="${i === 0}">${label}<b>${pad(count, 2)}</b></button>`).join('');
    filters.addEventListener('click', e => {
      const b = e.target.closest('.chip');
      if (!b) return;
      $$('.chip', filters).forEach(c => c.setAttribute('aria-pressed', c === b));
      const f = b.dataset.cat;
      $$('.irow', box).forEach(row => { row.hidden = f !== 'all' && (f === 'agent' ? row.dataset.agent !== '1' : row.dataset.cat !== f); row.classList.add('in'); });
    });
  }

  /* ─────────────── about ─────────────── */
  function initAbout() {
    const img = $('#avatar');
    img.addEventListener('error', () => $('#portrait').remove());
    img.src = D.owner.avatar;
    const specs = [
      ['role', 'Solution Architect'],
      ['experience', '9 years'],
      ['focus', 'AI models, harnesses, agents'],
      ['on github since', D.owner.since],
      ['public repositories', D.repos.length]
    ];
    $('#specs').innerHTML = specs.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('');
  }

  /* ─────────────── project explorer: opens a project site inside the page, just under Work ─────────────── */
  function initExplore() {
    const panel = $('#explore'), frame = $('#explore-frame'), name = $('#explore-name');
    const full = $('#explore-full'), repoLink = $('#explore-repo'), closeBtn = $('#explore-close');
    let opener = null;
    const repoOf = path => path.split('/').filter(Boolean)[0] || '';

    const open = (path, label, from) => {
      const url = siteHref(path);
      opener = from || null;
      name.textContent = path.replace(/^\/|\/$/g, '');
      panel.setAttribute('aria-label', 'Exploring ' + label);
      frame.title = label;
      full.href = url;
      repoLink.href = 'https://github.com/' + D.owner.handle + '/' + repoOf(path);
      if (frame.getAttribute('src') !== url) { panel.classList.add('is-loading'); frame.src = url; }
      panel.hidden = false;
      panel.classList.remove('is-open'); void panel.offsetWidth; panel.classList.add('is-open');
      try { history.replaceState(null, '', '#explore' + path.replace(/\/$/, '')); } catch (e) {}
      panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    const shut = () => {
      panel.hidden = true;
      frame.removeAttribute('src');                 // stops any video or 3D scene inside
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      if (opener && document.contains(opener)) opener.focus();
    };

    frame.addEventListener('load', () => panel.classList.remove('is-loading'));
    closeBtn.addEventListener('click', shut);
    addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) shut(); });
    document.addEventListener('click', e => {
      const a = e.target.closest('a[data-explore]');
      // ctrl/cmd/shift/middle clicks still open a real tab
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      open(a.dataset.explore, a.dataset.label || a.textContent.trim(), a);
    });

    // deep link: ryanbow230.com/#explore/cat-benchmarks opens that project here
    const m = location.hash.match(/^#explore(\/[\w.\-\/]+)$/);
    if (m) open(m[1] + '/', m[1].slice(1));
  }

  /* ─────────────── boot ─────────────── */
  const boot = [initTheme, initTicker, initWordmarks, initViewer, initMarquee, initAgents, initIndex, initAbout, initReveals, initBand, initNav, initExplore];
  boot.forEach(fn => { try { fn(); } catch (err) { console.error('[site] ' + fn.name + ' failed:', err); } });
})();
