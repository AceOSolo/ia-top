/* ==========================================================================
   IA Top — scripts du site (JavaScript simple, sans bibliothèque)
   1. En-tête qui s'opacifie au scroll
   2. Menu mobile (burger)
   3. Apparitions douces au scroll (+ bandeau défilant des paires I → A)
   4. Compteurs animés
   5. Calendrier cal.com, chargé seulement à l'approche de #rendez-vous
   6. Année du pied de page
   7. Animations au défilement (titres, témoignage, photos, chronologie, méthode)
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var hasIO = 'IntersectionObserver' in window;

  function reducedMotion() {
    return !!(motionQuery && motionQuery.matches);
  }

  /* 1. En-tête ------------------------------------------------------------ */
  var header = doc.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* 2. Menu mobile -------------------------------------------------------- */
  var toggle = doc.querySelector('.nav-toggle');
  var menu = doc.getElementById('menu');
  var main = doc.getElementById('contenu');
  var footer = doc.querySelector('.site-footer');

  if (toggle && menu) {
    var isOpen = function () {
      return toggle.getAttribute('aria-expanded') === 'true';
    };

    var setMenu = function (open, returnFocus) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.querySelector('.nav-toggle-label').textContent = open ? 'Fermer' : 'Menu';
      root.classList.toggle('menu-open', open);
      // Le reste de la page devient inaccessible au clavier tant que le menu est ouvert
      if (main) main.inert = open;
      if (footer) footer.inert = open;
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      } else if (returnFocus) {
        toggle.focus();
      }
    };

    toggle.addEventListener('click', function () {
      setMenu(!isOpen(), true);
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false, false);
    });

    doc.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') {
        setMenu(false, true);
        return;
      }
      // Garde le focus dans le menu ouvert (bouton + liens)
      if (e.key === 'Tab') {
        var items = [toggle].concat(Array.prototype.slice.call(menu.querySelectorAll('a')))
          .filter(function (el) { return el.offsetParent !== null; });
        var firstEl = items[0];
        var lastEl = items[items.length - 1];
        if (e.shiftKey && doc.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && doc.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    });

    // Retour en affichage ordinateur : on referme le menu mobile
    var desktop = window.matchMedia('(min-width: 1024px)');
    var onDesktop = function () {
      if (desktop.matches && isOpen()) setMenu(false, false);
    };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  /* 3a. Bandeau des paires I → A : le contenu est doublé pour boucler sans coupure */
  var track = doc.querySelector('.pairs-track');
  if (track && !reducedMotion()) {
    Array.prototype.slice.call(track.children).forEach(function (li) {
      var clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  /* 3. Apparitions au scroll ---------------------------------------------- */
  var reveals = doc.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!hasIO || reducedMotion()) {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
      reveals.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  /* 4. Compteurs animés --------------------------------------------------- */
  var counters = doc.querySelectorAll('.counter[data-target]');
  if (counters.length && hasIO && !reducedMotion()) {
    var animateCounter = function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var duration = 1400;
      var start = null;
      var step = function (now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) {
      el.textContent = '0';
      counterObserver.observe(el);
    });
  }

  /* 5. Calendrier cal.com ------------------------------------------------- */
  var calSection = doc.getElementById('rendez-vous');
  var calBox = doc.getElementById('cal-box');
  var calLoaded = false;

  function loadCal() {
    if (calLoaded || !calBox) return;
    calLoaded = true;

    /* Code d'intégration fourni par cal.com (namespace "15min") */
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "15min", { origin: "https://app.cal.com" });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns["15min"]("inline", {
      elementOrSelector: "#my-cal-inline-15min",
      config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "light" },
      calLink: "jbarret/15min",
    });

    /* Apparence : thème clair aux couleurs du site (Papier, Lin, Encre) */
    Cal.ns["15min"]("ui", {
      "theme": "light",
      "cssVarsPerTheme": {
        "light": {
          "cal-brand": "#16130F", "cal-brand-text": "#F3EEE5", "cal-brand-emphasis": "#E0482A",
          "cal-bg": "#F3EEE5", "cal-bg-muted": "#EDE7DC", "cal-bg-subtle": "#E7E0D3", "cal-bg-emphasis": "#DDD4C4",
          "cal-border": "#D6CDBE", "cal-border-subtle": "#E1D9CB", "cal-border-booker": "#D6CDBE", "cal-border-emphasis": "#B5AEA2",
          "cal-text": "#16130F", "cal-text-emphasis": "#16130F", "cal-text-subtle": "#5D5850", "cal-text-muted": "#5D5850"
        },
        "dark": { "cal-brand": "#E0482A", "cal-brand-text": "#16130F" }
      },
      "hideEventTypeDetails": false,
      "layout": "month_view"
    });

    /* Masque le message « Chargement… » dès que le calendrier est prêt */
    Cal.ns["15min"]("on", {
      action: "linkReady",
      callback: function () { calBox.classList.add('is-ready'); }
    });
  }

  if (calSection && calBox) {
    if (hasIO) {
      var calObserver = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          loadCal();
          calObserver.disconnect();
        }
      }, { rootMargin: '600px 0px 600px 0px' });
      calObserver.observe(calSection);
    } else {
      loadCal();
    }

    // Un clic sur n'importe quel bouton « rendez-vous » lance aussi le chargement
    doc.querySelectorAll('[data-cal-trigger]').forEach(function (link) {
      link.addEventListener('click', loadCal);
    });
  }

  /* 7. Animations liées au défilement ------------------------------------- */
  if (!reducedMotion()) {
    // 7a. Découpe un élément en mots, en conservant les balises (italique, lettres I et A…)
    var splitInto = function (root, makeGroup) {
      var tokens = [];
      (function walk(node, chain) {
        Array.prototype.slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            child.nodeValue.split(/([ \n\t]+)/).forEach(function (part) {
              if (part) tokens.push({ text: part, chain: chain, space: /^[ \n\t]+$/.test(part) });
            });
          } else if (child.nodeType === 1) {
            walk(child, chain.concat([child]));
          }
        });
      })(root, []);
      root.textContent = '';
      var group = null, index = 0;
      tokens.forEach(function (t) {
        if (t.space) {
          group = null;
          root.appendChild(doc.createTextNode(' '));
          return;
        }
        if (!group) {
          group = makeGroup(index++);
          root.appendChild(group.outer);
        }
        var node = doc.createTextNode(t.text);
        for (var k = t.chain.length - 1; k >= 0; k--) {
          var copy = t.chain[k].cloneNode(false);
          copy.appendChild(node);
          node = copy;
        }
        group.inner.appendChild(node);
      });
      return index;
    };

    // Titres : chaque mot monte depuis sa ligne
    doc.querySelectorAll('.words').forEach(function (title) {
      splitInto(title, function (i) {
        var outer = doc.createElement('span');
        var inner = doc.createElement('span');
        outer.className = 'w';
        inner.className = 'w-in';
        inner.style.setProperty('--i', i);
        outer.appendChild(inner);
        return { outer: outer, inner: inner };
      });
    });

    // Témoignage : les mots s'allument au fil de la lecture
    var quote = doc.querySelector('.quote-reveal');
    var quoteWords = [];
    if (quote) {
      var quoteText = quote.querySelector('p');
      splitInto(quoteText, function () {
        var span = doc.createElement('span');
        span.className = 'qw';
        return { outer: span, inner: span };
      });
      quoteWords = Array.prototype.slice.call(quoteText.querySelectorAll('.qw'));
      quote.classList.add('is-split');
    }

    // 7b. Méthode : la flèche se trace quand la section arrive à l'écran
    var method = doc.querySelector('.method');
    if (method && hasIO) {
      method.classList.add('draw');
      var methodObserver = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          method.classList.add('is-drawn');
          methodObserver.disconnect();
        }
      }, { threshold: 0.35 });
      methodObserver.observe(method);
    }

    // 7c. Un seul calcul par image : barre de lecture, profondeur des photos, chronologie, témoignage
    var progressBar = doc.querySelector('.progress span');
    var parallaxImages = Array.prototype.slice.call(doc.querySelectorAll('.portrait-img'));
    var timeline = doc.querySelector('.timeline');
    var ticking = false;

    var clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };

    var update = function () {
      ticking = false;
      var vh = window.innerHeight;
      var max = doc.documentElement.scrollHeight - vh;

      if (progressBar) progressBar.style.transform = 'scaleX(' + (max > 0 ? clamp(window.scrollY / max, 0, 1) : 0) + ')';

      parallaxImages.forEach(function (img) {
        var box = img.parentElement.getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        var offset = (box.top + box.height / 2 - vh / 2) / vh; // -1 … 1 environ
        img.style.setProperty('--py', (offset * -36).toFixed(1) + 'px');
      });

      if (timeline) {
        var t = timeline.getBoundingClientRect();
        timeline.style.setProperty('--tl', clamp((vh * 0.65 - t.top) / t.height, 0, 1).toFixed(3));
      }

      if (quoteWords.length) {
        var q = quote.getBoundingClientRect();
        var p = clamp((vh * 0.85 - q.top) / (q.height + vh * 0.35), 0, 1);
        var lit = Math.round(p * quoteWords.length);
        quoteWords.forEach(function (w, i) { w.classList.toggle('on', i < lit); });
      }
    };

    var requestUpdate = function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  }

  /* 6. Année en cours ----------------------------------------------------- */
  var year = String(new Date().getFullYear());
  doc.querySelectorAll('.js-year').forEach(function (el) { el.textContent = year; });
})();
