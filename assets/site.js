/* John Paul Guisijan — shared site behaviour (all pages). */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle (initial theme is set inline in <head>) ---------- */
  var setTheme = function (t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t === 'light' ? '#F5F3EE' : '#050506');
  };
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      btn.classList.add('spin');
      setTimeout(function () { btn.classList.remove('spin'); }, 500);
      if (document.startViewTransition && !reduce) document.startViewTransition(function () { setTheme(next); });
      else setTheme(next);
    });
  });

  /* ---------- Nav: stuck state, progress bar, mobile drawer ---------- */
  var nav = document.getElementById('nav');
  var prog = document.getElementById('prog');
  var onScroll = function () {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('is-stuck', y > 24);
    if (prog) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var closeDrawer = function () {
    if (!drawer) return;
    drawer.classList.remove('is-open'); nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
  };
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = !drawer.classList.contains('is-open');
      drawer.classList.toggle('is-open', open); nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  }

  /* ---------- Reveal on scroll + stat counters ---------- */
  var rvs = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduce) {
    rvs.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  }
  var counters = document.querySelectorAll('.counter');
  var count = function (el) {
    var to = +el.dataset.to, t0 = null, dur = 1400;
    if (reduce) { el.textContent = to; return; }
    var tick = function (t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  var stats = document.getElementById('stats');
  if (stats && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        counters.forEach(count);
        stats.querySelectorAll('.stat').forEach(function (s) { s.classList.add('in'); });
        so.disconnect();
      });
    }, { threshold: 0.4 });
    so.observe(stats);
  } else counters.forEach(function (el) { el.textContent = el.dataset.to; });

  /* ---------- Marquee: duplicate items for a seamless loop ---------- */
  var mt = document.getElementById('marqueeTrack');
  if (mt) mt.innerHTML += mt.innerHTML;

  /* ---------- Service card spotlight follows the cursor ---------- */
  document.querySelectorAll('.svc').forEach(function (c) {
    c.addEventListener('pointermove', function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- Work grid: stagger the middle column, and filters ---------- */
  var grid = document.querySelector('[data-wgrid]');
  var stagger = function () {
    if (!grid) return;
    var vis = [].filter.call(grid.children, function (c) { return !c.hidden; });
    vis.forEach(function (c, i) {
      c.classList.toggle('is-mid', i % 3 === 1);
      c.classList.toggle('is-mid2', i % 2 === 1);
    });
  };
  stagger();
  var filters = document.querySelectorAll('[data-filter]');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      var cat = f.dataset.filter;
      var apply = function () {
        filters.forEach(function (x) { x.classList.toggle('is-on', x === f); x.setAttribute('aria-pressed', String(x === f)); });
        [].forEach.call(grid.children, function (c) {
          c.hidden = !(cat === 'all' || (c.dataset.cat || '').split(' ').indexOf(cat) > -1);
        });
        stagger();
        grid.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
      };
      if (document.startViewTransition && !reduce) document.startViewTransition(apply); else apply();
    });
  });

  /* ---------- Contact: live local time in Manila ---------- */
  var clock = document.getElementById('clock');
  if (clock) {
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Manila' });
    var tickClock = function () { clock.textContent = fmt.format(new Date()); };
    tickClock(); setInterval(tickClock, 15000);
  }

  /* ---------- Video previews: play on hover (desktop) or while on screen (touch) ---------- */
  var touch = window.matchMedia('(hover: none)').matches;
  var play = function (frame) {
    var v = frame._video; if (!v) return;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
    frame.classList.add('is-playing');
  };
  var stop = function (frame) {
    if (!frame._video) return;
    frame.classList.remove('is-playing'); frame._video.pause();
  };
  var attach = function (frame) {
    if (frame.dataset.ready) return;
    frame.dataset.ready = '1';
    var v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto';
    v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true'); v.tabIndex = -1;
    v.src = frame.dataset.video;
    v.addEventListener('error', function () { frame.classList.remove('is-playing'); frame._video = null; v.remove(); }, { once: true });
    v.addEventListener('loadeddata', function () {
      frame.dataset.loaded = '1';
      if (touch || frame.matches(':hover') || (frame.closest('a') && frame.closest('a').matches(':hover'))) play(frame);
    });
    frame.querySelector('.frame__stage').appendChild(v);
    frame._video = v;
  };
  if ('IntersectionObserver' in window && !reduce) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var f = e.target;
        if (e.isIntersecting) { attach(f); if (touch && f.dataset.loaded) play(f); }
        else stop(f);
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('.frame[data-video]').forEach(function (f) {
      vo.observe(f);
      if (touch) return;
      var host = f.closest('a') || f;
      host.addEventListener('pointerenter', function () { attach(f); if (f.dataset.loaded) play(f); });
      host.addEventListener('pointerleave', function () { stop(f); });
    });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
